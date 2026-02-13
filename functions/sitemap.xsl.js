// Cloudflare Pages Function — /sitemap.xsl
// XSL stylesheet to make sitemap.xml display nicely in browsers

export function onRequest(context) {
    const xsl = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
    <title>XML Sitemap — zmimaz.qzz.io</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #334155; background: #f8fafc; }
        h1 { color: #1e293b; font-size: 24px; }
        p { color: #64748b; font-size: 14px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        th { background: #3b82f6; color: white; text-align: left; padding: 12px 16px; font-size: 13px; font-weight: 600; }
        td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
        tr:last-child td { border-bottom: none; }
        a { color: #3b82f6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .badge { display: inline-block; background: #dbeafe; color: #2563eb; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; margin-left: 8px; }
    </style>
</head>
<body>
    <h1>&#128506; XML Sitemap <span class="badge"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URL(s)</span></h1>
    <p>This is the XML sitemap for <strong>zmimaz.qzz.io</strong>, generated dynamically by Cloudflare Pages Functions.</p>
    <table>
        <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Priority</th>
        </tr>
        <xsl:for-each select="sitemap:urlset/sitemap:url">
        <tr>
            <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
            <td><xsl:value-of select="sitemap:lastmod"/></td>
            <td><xsl:value-of select="sitemap:priority"/></td>
        </tr>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>`;

    return new Response(xsl, {
        status: 200,
        headers: {
            "Content-Type": "application/xslt+xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
