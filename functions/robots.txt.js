// Cloudflare Pages Function — serves robots.txt with correct Content-Type

export function onRequest(context) {
    const DOMAIN = "https://zmimaz.qzz.io";

    const robots = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;

    return new Response(robots, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
