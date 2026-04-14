<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
            encoding="UTF-8" indent="yes"/>

<xsl:template match="/bago_barangays">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>BAGO.PH — Barangay performance (XML)</title>
      <style type="text/css">
        body{font-family: Inter, "Segoe UI", Tahoma, Arial; background:#f5f5f5; color:#212121; margin:0}
        .topnav{background:#fff;border-bottom:1px solid #E0E0E0;position:sticky;top:0;z-index:50}
        .nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 18px}
        .brand{font-weight:700;color:#2E7D32;font-size:1.1rem}
        .meta-line{font-size:0.85rem;color:#757575}

        .hero{background:linear-gradient(135deg,#E8F5E9,#F1F8E9);min-height:200px;display:flex;align-items:center}
        .hero-inner{max-width:1200px;margin:0 auto;padding:36px 18px;width:100%}
        .hero h1{font-size:1.5rem;margin:0 0 8px 0;font-weight:700;color:#1B5E20}
        .hero p{margin:0;color:#424242;font-size:1rem}

        .wrapper{max-width:1200px;margin:0 auto;padding:28px 18px 48px}
        .meta-box{background:#fff;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.08);padding:20px;margin-bottom:24px;font-size:0.95rem;color:#616161}
        .meta-box strong{color:#2E7D32}

        .table-wrap{overflow-x:auto}
        table{width:100%;border-collapse:collapse;font-size:0.95rem;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08)}
        thead th{background:#2E7D32;color:#fff;padding:14px 16px;text-align:left;font-weight:700}
        tbody td{padding:14px 16px;border-bottom:1px solid #EEEEEE}
        tbody tr:nth-child(odd){background:#FAFAFA}
        tbody tr:hover{background:#E8F5E9}

        .badge{display:inline-block;padding:6px 12px;border-radius:20px;font-weight:700;font-size:0.8rem}
        .badge-track{background:#E8F5E9;color:#2E7D32}
        .badge-monitor{background:#FFF8E1;color:#F57F17}
        .badge-urgent{background:#FFEBEE;color:#C62828}

        footer{text-align:center;padding:24px 18px;color:#757575;font-size:0.85rem;border-top:1px solid #E0E0E0;background:#fff}
      </style>
    </head>
    <body>
      <div class="topnav">
        <div class="nav-inner">
          <div class="brand">🌿 BAGO.PH</div>
          <div class="meta-line">
            Last updated: <xsl:value-of select="@last_updated"/>
          </div>
        </div>
      </div>

      <div class="hero">
        <div class="hero-inner">
          <h1>Barangay performance snapshot</h1>
          <p>
            <xsl:value-of select="@city"/>, <xsl:value-of select="@province"/>
          </p>
        </div>
      </div>

      <div class="wrapper">
        <div class="meta-box">
          <strong>Source:</strong>
          <xsl:text> </xsl:text>
          <xsl:value-of select="meta/source"/>
          <br/>
          <strong>Note:</strong>
          <xsl:text> </xsl:text>
          <xsl:value-of select="meta/note"/>
        </div>

        <div class="table-wrap">
          <table role="table" summary="Barangay collection and compliance metrics">
            <thead>
              <tr>
                <th>Barangay</th>
                <th>Collection rate</th>
                <th>Compliance rate</th>
                <th>Open reports</th>
                <th>Eco-points (total)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="barangay">
                <tr>
                  <td><strong><xsl:value-of select="@name"/></strong></td>
                  <td><xsl:value-of select="collection_rate"/></td>
                  <td><xsl:value-of select="compliance_rate"/></td>
                  <td><xsl:value-of select="open_reports"/></td>
                  <td><xsl:value-of select="eco_points"/></td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="status = 'Urgent'">
                        <span class="badge badge-urgent"><xsl:value-of select="status"/></span>
                      </xsl:when>
                      <xsl:when test="status = 'Monitor'">
                        <span class="badge badge-monitor"><xsl:value-of select="status"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge badge-track"><xsl:value-of select="status"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </div>

      <footer>
        BAGO.PH prototype data for CENRO / LGU reporting — RA 9003 alignment
      </footer>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
