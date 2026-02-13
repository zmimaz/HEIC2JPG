// Cloudflare Pages Function
// File: functions/robots.txt.js → routes to /robots.txt

export function onRequest(context) {
    const DOMAIN = "https://zmimaz.qzz.io";

    const body = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

    return new Response(body, {
        status: 200,
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
