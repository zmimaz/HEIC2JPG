// Cloudflare Pages Function
// File: functions/sitemap.xml.js → routes to /sitemap.xml
// Returns XML with correct Content-Type header

export function onRequest(context) {
    const DOMAIN = "https://zmimaz.qzz.io";
    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>${DOMAIN}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
        <xhtml:link rel="alternate" hreflang="zh-CN" href="${DOMAIN}/"/>
        <xhtml:link rel="alternate" hreflang="en"    href="${DOMAIN}/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
    </url>
</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
