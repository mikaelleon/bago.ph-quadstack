<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:param name="locale" select="'en'"/>
  <xsl:variable name="isTL" select="$locale='tl'"/>
  <xsl:output method="html" indent="yes" />
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:choose><xsl:when test="$isTL">DENR Ulat Export</xsl:when><xsl:otherwise>DENR Report Export</xsl:otherwise></xsl:choose></title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; }
          h1 { margin-bottom: 8px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <h1><xsl:choose><xsl:when test="$isTL">DENR Ulat Export</xsl:when><xsl:otherwise>DENR Report Export</xsl:otherwise></xsl:choose></h1>
        <p><xsl:choose><xsl:when test="$isTL">Nabuo mula sa na-filter na schedule XML.</xsl:when><xsl:otherwise>Generated from filtered schedule XML.</xsl:otherwise></xsl:choose></p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th><xsl:choose><xsl:when test="$isTL">Barangay</xsl:when><xsl:otherwise>Barangay</xsl:otherwise></xsl:choose></th>
              <th><xsl:choose><xsl:when test="$isTL">Uri ng Basura</xsl:when><xsl:otherwise>Waste Type</xsl:otherwise></xsl:choose></th>
              <th><xsl:choose><xsl:when test="$isTL">Petsa</xsl:when><xsl:otherwise>Date</xsl:otherwise></xsl:choose></th>
              <th><xsl:choose><xsl:when test="$isTL">Simula</xsl:when><xsl:otherwise>Time Start</xsl:otherwise></xsl:choose></th>
              <th><xsl:choose><xsl:when test="$isTL">Wakas</xsl:when><xsl:otherwise>Time End</xsl:otherwise></xsl:choose></th>
              <th><xsl:choose><xsl:when test="$isTL">Katayuan</xsl:when><xsl:otherwise>Status</xsl:otherwise></xsl:choose></th>
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
