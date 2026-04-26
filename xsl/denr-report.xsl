<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" />
  <xsl:template match="/">
    <html>
      <head>
        <title>DENR Report Export</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; }
          h1 { margin-bottom: 8px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <h1>DENR Report Export</h1>
        <p>Generated from filtered schedule XML.</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Barangay</th>
              <th>Waste Type</th>
              <th>Date</th>
              <th>Time Start</th>
              <th>Time End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="denr_report/schedule">
              <tr>
                <td><xsl:value-of select="schedule_id" /></td>
                <td><xsl:value-of select="barangay" /></td>
                <td><xsl:value-of select="waste_type" /></td>
                <td><xsl:value-of select="collection_date" /></td>
                <td><xsl:value-of select="time_start" /></td>
                <td><xsl:value-of select="time_end" /></td>
                <td><xsl:value-of select="status" /></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
