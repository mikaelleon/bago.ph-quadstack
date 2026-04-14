<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
            encoding="UTF-8" indent="yes"/>

<xsl:template match="/ecolinisph_schedules">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title><xsl:value-of select="title"/></title>
      <style type="text/css">
        body{font-family: Inter, "Segoe UI", Tahoma, Arial; background:#f2f6f2; color:#223; margin:0}
        .topnav{background:#fff;border-bottom:1px solid #e6efe6;position:sticky;top:0;z-index:50}
        .nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 18px}
        .brand{font-weight:700;color:#228B22;font-size:1.1rem}
        .nav-links{display:flex;gap:22px}
        .nav-links a{color:#444;text-decoration:none;padding:8px 12px;border-radius:6px;font-weight:600;font-size:0.95rem}
        .nav-links a:hover{background:#f0fbf0;color:#0b3}

        .hero{background:linear-gradient(135deg,#dff3e6,#e8f8f0) url('') center/cover no-repeat;min-height:240px;display:flex;align-items:center}
        .hero-inner{max-width:1200px;margin:0 auto;padding:40px 18px;color:#083;display:flex;flex-direction:column;width:100%}
        .hero h1{font-size:1.6rem;margin-bottom:8px;font-weight:700;color:#1b5d1b}
        .hero p{color:#2b5b2b;margin:0 0 6px 0;font-size:1.05rem}
        .hero .sub{font-size:0.95rem;color:#4a6a4a;margin:0}

        .wrapper{max-width:1200px;margin:0 auto;padding:28px 18px}
        .container{background:#fff;border-radius:12px;box-shadow:0 6px 24px rgba(12,50,12,0.08);padding:28px;margin-bottom:24px}
        .section-title{font-size:1.5rem;margin:0 0 12px 0;font-weight:700;color:#1b5d1b}
        .section-underline{width:90px;height:5px;background:#228B22;border-radius:4px;margin-bottom:18px}

        .stats-box{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
        .stat-card{background:linear-gradient(135deg,#dff3e6,#e8f8f0);border-left:4px solid #228B22;padding:18px;border-radius:8px}
        .stat-label{font-size:0.85rem;color:#555;font-weight:600;text-transform:uppercase;margin-bottom:6px}
        .stat-value{font-size:1.8rem;font-weight:700;color:#1b5d1b}

        .table-wrap{overflow-x:auto;margin-top:16px}
        table{width:100%;border-collapse:collapse;font-size:0.95rem}
        thead th{background:#228B22;color:#fff;padding:14px 16px;text-align:left;font-weight:700;border-bottom:3px solid #1b5d1b}
        tbody td{padding:14px 16px;border-bottom:1px solid #f0f2f0}
        tbody tr:nth-child(odd){background:#fbfffb}
        tbody tr:hover{background:#eefcf0}

        .rate-pill{display:inline-block;background:linear-gradient(180deg,#2fa055,#197a2b);color:#fff;padding:6px 12px;border-radius:20px;font-weight:700;font-size:0.85rem;box-shadow:0 2px 6px rgba(25,122,43,0.15)}
        .status-limited{display:inline-block;background:linear-gradient(180deg,#c9a227,#a67c00);color:#fff;padding:6px 12px;border-radius:20px;font-weight:700;font-size:0.85rem}

        @media (max-width:900px){
          .nav-links{display:none}
          .hero h1{font-size:1.3rem}
          .hero-inner{padding:28px 18px}
          .container{padding:18px}
          .stats-box{grid-template-columns:1fr 1fr}
          .table-wrap{font-size:0.85rem}
          thead th, tbody td{padding:10px 12px}
        }
        @media (max-width:600px){
          .stats-box{grid-template-columns:1fr}
          table{font-size:0.8rem}
          thead th, tbody td{padding:8px 10px}
        }
      </style>
    </head>
    <body>
      <div class="topnav">
        <div class="nav-inner">
          <div class="brand">EcoLinisPH</div>
          <div class="nav-links">
            <a href="#overview">Overview</a>
            <a href="#weekly">Weekly routes</a>
            <a href="#barangays">By barangay</a>
            <a href="#special">Special dates</a>
            <a href="#shifts">Collector shifts</a>
          </div>
        </div>
      </div>

      <div class="hero">
        <div class="hero-inner">
          <h1>Collection schedules</h1>
          <p><xsl:value-of select="tagline"/></p>
          <p class="sub"><xsl:value-of select="coverage_area"/></p>
        </div>
      </div>

      <div class="wrapper">
        <div class="stats-box" id="overview">
          <div class="stat-card">
            <div class="stat-label">Weekly routes planned</div>
            <div class="stat-value"><xsl:value-of select="statistics/weekly_routes_planned"/></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">On-time completion</div>
            <div class="stat-value"><xsl:value-of select="statistics/on_time_completion"/></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Barangays on schedule</div>
            <div class="stat-value"><xsl:value-of select="statistics/barangays_on_schedule"/></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Exceptions this month</div>
            <div class="stat-value"><xsl:value-of select="statistics/exceptions_this_month"/></div>
          </div>
        </div>

        <div class="container">
          <section id="weekly">
            <h2 class="section-title">Weekly route calendar</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Weekly waste collection routes by day">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Route</th>
                    <th>Areas</th>
                    <th>Window</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="weekly_route_calendar/route">
                    <tr>
                      <td><xsl:value-of select="weekday"/></td>
                      <td><xsl:value-of select="route_code"/></td>
                      <td><xsl:value-of select="areas"/></td>
                      <td><xsl:value-of select="window_start"/> – <xsl:value-of select="window_end"/></td>
                      <td>
                        <xsl:choose>
                          <xsl:when test="status = 'limited'">
                            <span class="status-limited"><xsl:value-of select="status"/></span>
                          </xsl:when>
                          <xsl:otherwise>
                            <span class="rate-pill"><xsl:value-of select="status"/></span>
                          </xsl:otherwise>
                        </xsl:choose>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="container">
          <section id="barangays">
            <h2 class="section-title">Pickup by barangay</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Primary collection day and time per barangay">
                <thead>
                  <tr>
                    <th>Barangay</th>
                    <th>Primary day</th>
                    <th>Time window</th>
                    <th>Frequency</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="barangay_schedules/barangay">
                    <tr>
                      <td><xsl:value-of select="name"/></td>
                      <td><xsl:value-of select="primary_day"/></td>
                      <td><xsl:value-of select="time_window"/></td>
                      <td><xsl:value-of select="frequency"/></td>
                      <td><xsl:value-of select="notes"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="container">
          <section id="special">
            <h2 class="section-title">Special dates &amp; adjustments</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Holidays and schedule exceptions">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>What to expect</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="special_dates/entry">
                    <tr>
                      <td><xsl:value-of select="date"/></td>
                      <td><xsl:value-of select="description"/></td>
                      <td><xsl:value-of select="action"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div class="container">
          <section id="shifts">
            <h2 class="section-title">Collector shift schedules</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Waste collection team shifts">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Lead</th>
                    <th>Assigned days</th>
                    <th>Shift</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="collector_shifts/shift">
                    <tr>
                      <td><xsl:value-of select="team"/></td>
                      <td><xsl:value-of select="lead"/></td>
                      <td><xsl:value-of select="assigned_days"/></td>
                      <td><xsl:value-of select="start_time"/> – <xsl:value-of select="end_time"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <footer style="text-align:center;padding:28px 18px;color:#fff;background:#1b5d1b;margin-top:32px;font-weight:600">
        <div style="max-width:1200px;margin:0 auto">&#169; <xsl:value-of select="proponent"/> — Smart Waste Management Platform</div>
      </footer>
    </body>
  </html>
</xsl:template>

</xsl:stylesheet>
