"use strict";

const express = require("express");
const { authMiddleware, requireRole } = require("../middleware/auth");
const { getOverview } = require("../services/analytics-service");
const { listSchedules } = require("../services/schedules-service");
const { getPool } = require("../db");

const router = express.Router();
function err(res, status, code, error) {
  return res.status(status).json({ code, error });
}
router.use(authMiddleware(true));

function csvEscape(v) {
  const s = String(v == null ? "" : v);
  if (!/[,"\n]/.test(s)) return s;
  return `"${s.replace(/"/g, '""')}"`;
}

function rowsToCsv(headers, rows) {
  const out = [headers.join(",")];
  rows.forEach((row) => out.push(headers.map((h) => csvEscape(row[h])).join(",")));
  return out.join("\n");
}

router.get("/csv", requireRole("lgu_officer"), async (req, res) => {
  const type = String(req.query.type || "overview");
  try {
    if (type === "schedules") {
      let rows = [];
      try {
        rows = await listSchedules({ barangayId: req.query.barangay_id || null });
      } catch (_err) {
        rows = [];
      }
      const csv = rowsToCsv(
        ["schedule_id", "barangay_name", "waste_type", "collection_date", "time_start", "time_end", "status"],
        rows
      );
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", 'attachment; filename="schedules.csv"');
      return res.send(csv);
    }
    const overview = await getOverview({});
    const rows = [
      {
        schedules_total: overview.totals.schedules_total,
        reports_total: overview.totals.reports_total,
        reports_open: overview.totals.reports_open,
        reports_resolved: overview.totals.reports_resolved,
        residents_total: overview.totals.residents_total,
        collectors_total: overview.totals.collectors_total,
        eco_points_total: overview.totals.eco_points_total,
        compliance_avg: overview.totals.compliance_avg
      }
    ];
    const csv = rowsToCsv(Object.keys(rows[0]), rows);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="overview.csv"');
    return res.send(csv);
  } catch (e) {
    console.error(e);
    return err(res, 500, "EXPORT_CSV_FAILED", "Failed to export CSV");
  }
});

router.get("/xml", requireRole("lgu_officer"), async (req, res) => {
  const pool = getPool();
  const where = [];
  const params = [];
  const barangay = String(req.query.barangay || "").trim();
  const start = String(req.query.start || "").trim();
  const end = String(req.query.end || "").trim();
  const role = String(req.query.role || "").trim();
  const locale = String(req.query.locale || "en").toLowerCase() === "tl" ? "tl" : "en";
  if (barangay) {
    where.push("b.barangay_name = ?");
    params.push(barangay);
  }
  if (start) {
    where.push("s.collection_date >= ?");
    params.push(start);
  }
  if (end) {
    where.push("s.collection_date <= ?");
    params.push(end);
  }
  if (role) {
    where.push("? IS NOT NULL");
    params.push(role);
  }
  let sql = `
    SELECT s.schedule_id, b.barangay_name, s.waste_type, s.collection_date, s.time_start, s.time_end, s.status
    FROM collection_schedules s
    JOIN barangays b ON b.barangay_id = s.barangay_id
  `;
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY s.collection_date ASC";
  try {
    let rows = [];
    try {
      const out = await pool.query(sql, params);
      rows = out[0] || [];
    } catch (_err) {
      rows = [];
    }
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<?xml-stylesheet type="text/xsl" href="/xsl/denr-report.xsl?locale=${locale}"?>\n`;
    xml += `<denr_report locale="${locale}">\n`;
    rows.forEach((r) => {
      xml += "  <schedule>\n";
      xml += `    <schedule_id>${r.schedule_id}</schedule_id>\n`;
      xml += `    <barangay>${escapeXml(r.barangay_name)}</barangay>\n`;
      xml += `    <waste_type>${escapeXml(r.waste_type)}</waste_type>\n`;
      xml += `    <collection_date>${String(r.collection_date).slice(0, 10)}</collection_date>\n`;
      xml += `    <time_start>${String(r.time_start).slice(0, 8)}</time_start>\n`;
      xml += `    <time_end>${String(r.time_end).slice(0, 8)}</time_end>\n`;
      xml += `    <status>${escapeXml(r.status)}</status>\n`;
      xml += "  </schedule>\n";
    });
    xml += "</denr_report>\n";
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.send(xml);
  } catch (e) {
    console.error(e);
    return err(res, 500, "EXPORT_XML_FAILED", "Failed to export XML");
  }
});

router.get("/denr-html", requireRole("lgu_officer"), async (req, res) => {
  try {
    const locale = String(req.query.locale || "en").toLowerCase() === "tl" ? "tl" : "en";
    const isTL = locale === "tl";
    const overview = await getOverview({});
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>DENR Report</title></head><body>
<h1>${isTL ? "DENR Buod ng Compliance" : "DENR Compliance Summary"}</h1>
<p>${isTL ? "Nabuo" : "Generated"}: ${new Date().toISOString()}</p>
<ul>
<li>${isTL ? "Mga iskedyul" : "Schedules"}: ${overview.totals.schedules_total}</li>
<li>${isTL ? "Kabuuang report" : "Reports total"}: ${overview.totals.reports_total}</li>
<li>${isTL ? "Bukas na report" : "Open reports"}: ${overview.totals.reports_open}</li>
<li>${isTL ? "Naresolbang report" : "Resolved reports"}: ${overview.totals.reports_resolved}</li>
<li>${isTL ? "Average na compliance" : "Compliance avg"}: ${overview.totals.compliance_avg}</li>
</ul>
</body></html>`;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(html);
  } catch (e) {
    console.error(e);
    return err(res, 500, "EXPORT_DENR_HTML_FAILED", "Failed to export DENR HTML");
  }
});

router.get("/denr-pdf", requireRole("lgu_officer"), async (req, res) => {
  try {
    const locale = String(req.query.locale || "en").toLowerCase() === "tl" ? "tl" : "en";
    const content =
      (locale === "tl" ? "BAGO.PH DENR Ulat" : "BAGO.PH DENR Report") +
      "\n" +
      (locale === "tl" ? "Nabuo: " : "Generated: ") +
      new Date().toISOString() +
      "\n";
    const pdf = minimalPdf(content);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="denr-report.pdf"');
    return res.send(pdf);
  } catch (e) {
    console.error(e);
    return err(res, 500, "EXPORT_DENR_PDF_FAILED", "Failed to export DENR PDF");
  }
});

function escapeXml(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function minimalPdf(text) {
  const safe = String(text).replace(/[()]/g, "");
  const lines = safe.split("\n");
  const streamLines = ["BT", "/F1 12 Tf", "50 760 Td"];
  lines.forEach((line, i) => {
    if (i > 0) streamLines.push("0 -16 Td");
    streamLines.push(`(${line}) Tj`);
  });
  streamLines.push("ET");
  const stream = streamLines.join("\n");
  const objects = [];
  objects.push("1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj");
  objects.push("2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj");
  objects.push("3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj");
  objects.push(`4 0 obj << /Length ${Buffer.byteLength(stream, "utf8")} >> stream\n${stream}\nendstream endobj`);
  objects.push("5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj");
  let body = "";
  const offsets = [0];
  objects.forEach((obj) => {
    offsets.push(Buffer.byteLength(body, "utf8"));
    body += obj + "\n";
  });
  const xrefStart = Buffer.byteLength("%PDF-1.4\n" + body, "utf8");
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  for (let i = 1; i <= 5; i += 1) {
    const off = offsets[i] + Buffer.byteLength("%PDF-1.4\n", "utf8");
    xref += String(off).padStart(10, "0") + " 00000 n \n";
  }
  const trailer = `trailer << /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from("%PDF-1.4\n" + body + xref + trailer, "utf8");
}

module.exports = router;
