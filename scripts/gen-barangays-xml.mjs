import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsPath = path.join(__dirname, "../html/js/lipa-barangays.js");
const text = fs.readFileSync(jsPath, "utf8");
const match = text.match(/LIPA_BARANGAYS = (\[[\s\S]*?\]);/);
if (!match) throw new Error("parse LIPA_BARANGAYS failed");
const list = Function(`"use strict"; return ${match[1]}`)();

function escAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

const statuses = ["On Track", "On Track", "Monitor", "On Track", "Urgent"];
let out = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="../xsl/barangays.xsl"?>
<bago_barangays city="Lipa City"
                province="Batangas"
                last_updated="2026-04-14">
  <meta>
    <source>BAGO.PH LGU dashboard prototype</source>
    <note>All 72 barangays — sample metrics for demonstration</note>
  </meta>
`;

list.forEach((name, i) => {
  const cr = 62 + ((i * 7) % 35);
  const comp = 58 + ((i * 11) % 40);
  const rep = (i * 3) % 22;
  const eco = 3200 + ((i * 137) % 18000);
  const st = statuses[i % statuses.length];
  out += `  <barangay name="${escAttr(name)}">
    <collection_rate>${cr}%</collection_rate>
    <compliance_rate>${comp}%</compliance_rate>
    <open_reports>${rep}</open_reports>
    <eco_points>${eco}</eco_points>
    <status>${st}</status>
  </barangay>
`;
});

out += `</bago_barangays>
`;

const outPath = path.join(__dirname, "../xml/barangays.xml");
fs.writeFileSync(outPath, out, "utf8");
console.log("Wrote", list.length, "barangays to", outPath);
