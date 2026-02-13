// Cloudflare Pages Function — /robots.txt

const DOMAIN = "https://zmimaz.qzz.io";

export function onRequest(context) {
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
