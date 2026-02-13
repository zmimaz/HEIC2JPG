// Cloudflare Pages Function — serves sitemap.xml with correct Content-Type
// This ensures Google receives "application/xml" instead of "text/plain"

export function onRequest(context) {
    const DOMAIN = "https://zmimaz.qzz.io";

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>${DOMAIN}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
        <xhtml:link rel="alternate" hreflang="zh-CN" href="${DOMAIN}/"/>
        <xhtml:link rel="alternate" hreflang="en"    href="${DOMAIN}/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/"/>
    </url>
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
            "X-Robots-Tag": "noindex",
        },
    });
}
