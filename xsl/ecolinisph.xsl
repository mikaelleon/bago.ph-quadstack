<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
            encoding="UTF-8" indent="yes"/>

<xsl:template match="/technosystem">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title><xsl:value-of select="title"/></title>
      <style type="text/css">
        /* Modern page styles matching screenshot */
        body{font-family: Inter, "Segoe UI", Tahoma, Arial; background:#f2f6f2; color:#223; margin:0}
        .topnav{background:#fff;border-bottom:1px solid #e6efe6;position:sticky;top:0;z-index:50}
        .nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:14px 18px}
        .brand{font-weight:700;color:#228B22;font-size:1.1rem}
        .nav-links{display:flex;gap:22px}
        .nav-links a{color:#444;text-decoration:none;padding:8px 12px;border-radius:6px;font-weight:600;font-size:0.95rem}
        .nav-links a:hover{background:#f0fbf0;color:#0b3}

        /* Hero */
        .hero{background:linear-gradient(135deg,#dff3e6,#e8f8f0) url('') center/cover no-repeat;min-height:240px;display:flex;align-items:center}
        .hero-inner{max-width:1200px;margin:0 auto;padding:40px 18px;color:#083;display:flex;flex-direction:column;width:100%}
        .hero h1{font-size:1.6rem;margin-bottom:8px;font-weight:700;color:#1b5d1b}
        .hero p{color:#2b5b2b;margin:0;font-size:1.05rem}

        /* Main content */
        .wrapper{max-width:1200px;margin:0 auto;padding:28px 18px}
        .container{background:#fff;border-radius:12px;box-shadow:0 6px 24px rgba(12,50,12,0.08);padding:28px;margin-bottom:24px}
        .section-title{font-size:1.5rem;margin:0 0 12px 0;font-weight:700;color:#1b5d1b}
        .section-underline{width:90px;height:5px;background:#228B22;border-radius:4px;margin-bottom:18px}

        /* Stats box */
        .stats-box{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
        .stat-card{background:linear-gradient(135deg,#dff3e6,#e8f8f0);border-left:4px solid #228B22;padding:18px;border-radius:8px}
        .stat-label{font-size:0.85rem;color:#555;font-weight:600;text-transform:uppercase;margin-bottom:6px}
        .stat-value{font-size:1.8rem;font-weight:700;color:#1b5d1b}

        /* Table */
        .table-wrap{overflow-x:auto;margin-top:16px}
        table{width:100%;border-collapse:collapse;font-size:0.95rem}
        thead th{background:#228B22;color:#fff;padding:14px 16px;text-align:left;font-weight:700;border-bottom:3px solid #1b5d1b}
        tbody td{padding:14px 16px;border-bottom:1px solid #f0f2f0}
        tbody tr:nth-child(odd){background:#fbfffb}
        tbody tr:hover{background:#eefcf0}

        /* Pills and badges */
        .rate-pill{display:inline-block;background:linear-gradient(180deg,#2fa055,#197a2b);color:#fff;padding:6px 12px;border-radius:20px;font-weight:700;font-size:0.85rem;box-shadow:0 2px 6px rgba(25,122,43,0.15)}
        .points-badge{display:inline-block;background:linear-gradient(135deg,#2fa055,#25a45f);color:#fff;padding:8px 14px;border-radius:22px;font-weight:700;font-size:0.9rem;box-shadow:0 2px 8px rgba(25,122,43,0.18);min-width:60px;text-align:center}

        /* Responsive */
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
            <a href="#barangays">Barangays</a>
            <a href="#residents">Residents</a>
            <a href="#collectors">Collectors</a>
            <a href="#officials">Officials</a>
            <a href="#statistics">Statistics</a>
          </div>
        </div>
      </div>

      <div class="hero">
        <div class="hero-inner">
          <h1>EcoLinisPH</h1>
          <p><xsl:value-of select="tagline"/></p>
        </div>
      </div>

      <div class="wrapper">
        <!-- Stats Overview -->
        <div class="stats-box">
          <div class="stat-card">
            <div class="stat-label">Active Users</div>
            <div class="stat-value"><xsl:value-of select="statistics/active_users_total"/></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Avg Segregation Rate</div>
            <div class="stat-value"><xsl:value-of select="statistics/avg_segregation_rate"/></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Reported Issues</div>
            <div class="stat-value"><xsl:value-of select="statistics/total_issues"/></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Missed Pickups</div>
            <div class="stat-value"><xsl:value-of select="statistics/total_missed_pickups"/></div>
          </div>
        </div>

        <!-- Barangay Records Section -->
        <div class="container">
          <section id="barangays">
            <h2 class="section-title">Barangay Records</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Barangay records table">
                <thead>
                  <tr>
                    <th>Barangay Name</th>
                    <th>Municipality</th>
                    <th>Province</th>
                    <th>Households</th>
                    <th>Active Users</th>
                    <th>Segregation Rate</th>
                    <th>Issues</th>
                    <th>Missed Pickups</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="barangays/barangay">
                    <tr>
                      <td><xsl:value-of select="name"/></td>
                      <td><xsl:value-of select="municipality"/></td>
                      <td><xsl:value-of select="province"/></td>
                      <td><xsl:value-of select="households"/></td>
                      <td><xsl:value-of select="active_users"/></td>
                      <td><span class="rate-pill"><xsl:value-of select="segregation_rate"/></span></td>
                      <td><xsl:value-of select="issues"/></td>
                      <td><xsl:value-of select="missed_pickups"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- Resident Users Section -->
        <div class="container">
          <section id="residents">
            <h2 class="section-title">Resident Users</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Resident users table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Barangay</th>
                    <th>Location</th>
                    <th>Points Earned</th>
                    <th>Issues Reported</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="resident_users/user">
                    <tr>
                      <td><xsl:value-of select="name"/></td>
                      <td><xsl:value-of select="age"/></td>
                      <td><xsl:value-of select="barangay"/></td>
                      <td><xsl:value-of select="location"/></td>
                      <td><span class="points-badge"><xsl:value-of select="points_earned"/></span></td>
                      <td><xsl:value-of select="issues_reported"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- Waste Collectors Section -->
        <div class="container">
          <section id="collectors">
            <h2 class="section-title">Waste Collectors &amp; Truck Drivers</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Waste collectors table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Age</th>
                    <th>Location</th>
                    <th>Routes Completed</th>
                    <th>Complaints Resolved</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="collector_users/user">
                    <tr>
                      <td><xsl:value-of select="name"/></td>
                      <td><xsl:value-of select="role"/></td>
                      <td><xsl:value-of select="age"/></td>
                      <td><xsl:value-of select="location"/></td>
                      <td><xsl:value-of select="routes_completed"/></td>
                      <td><xsl:value-of select="complaints_resolved"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- Officials &amp; Staff Section -->
        <div class="container">
          <section id="officials">
            <h2 class="section-title">Barangay Officials &amp; Staff</h2>
            <div class="section-underline"/>
            <div class="table-wrap">
              <table role="table" summary="Officials and staff table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Age</th>
                    <th>Barangay</th>
                    <th>Reports Handled</th>
                    <th>Key Insights</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="official_users/user">
                    <tr>
                      <td><xsl:value-of select="name"/></td>
                      <td><xsl:value-of select="role"/></td>
                      <td><xsl:value-of select="age"/></td>
                      <td><xsl:value-of select="barangay"/></td>
                      <td><xsl:value-of select="reports_handled"/></td>
                      <td><xsl:value-of select="key_insights"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- Statistics Section -->
        <div class="container">
          <section id="statistics">
            <h2 class="section-title">System Statistics</h2>
            <div class="section-underline"/>
            <div class="stats-box">
              <div class="stat-card">
                <div class="stat-label">Current Tonnage</div>
                <div class="stat-value"><xsl:value-of select="statistics/current_tonnage"/></div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Projected 2025</div>
                <div class="stat-value"><xsl:value-of select="statistics/projected_2025"/></div>
              </div>
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