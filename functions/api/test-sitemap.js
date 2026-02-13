// Cloudflare Pages Function — /api/test-sitemap
// Diagnostic tool: fetches /sitemap.xml and shows raw content + headers

export async function onRequest(context) {
    const sitemapUrl = new URL("/sitemap.xml", context.request.url).href;

    let sitemapResponse;
    try {
        sitemapResponse = await fetch(sitemapUrl);
    } catch (err) {
        return new Response(`<h1>Error fetching sitemap</h1><pre>${err.message}</pre>`, {
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }

    const body = await sitemapResponse.text();
    const headers = {};
    sitemapResponse.headers.forEach((value, key) => {
        headers[key] = value;
    });

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sitemap Diagnostic</title>
    <style>
        body { font-family: monospace; max-width: 900px; margin: 40px auto; padding: 0 20px; background: #0f172a; color: #e2e8f0; }
        h1 { color: #38bdf8; }
        h2 { color: #a78bfa; margin-top: 30px; }
        .ok { color: #4ade80; }
        .err { color: #f87171; }
        pre { background: #1e293b; padding: 16px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
        table { border-collapse: collapse; width: 100%; }
        td { padding: 6px 12px; border-bottom: 1px solid #334155; }
        td:first-child { color: #38bdf8; width: 250px; }
    </style>
</head>
<body>
    <h1>🔍 Sitemap Diagnostic</h1>
    <p>Fetched: <code>${sitemapUrl}</code></p>

    <h2>Response Headers</h2>
    <table>
        ${Object.entries(headers).map(([k, v]) => {
            const isContentType = k.toLowerCase() === 'content-type';
            const isXml = v.includes('xml');
            const cls = isContentType ? (isXml ? 'ok' : 'err') : '';
            return `<tr><td>${k}</td><td class="${cls}">${v}</td></tr>`;
        }).join('\n        ')}
    </table>

    <h2>Content-Type Check</h2>
    <p class="${headers['content-type']?.includes('xml') ? 'ok' : 'err'}">
        ${headers['content-type']?.includes('xml')
            ? '✅ Content-Type is correct (contains "xml")'
            : '❌ Content-Type is WRONG: ' + (headers['content-type'] || 'missing')}
    </p>

    <h2>XML Validity Check</h2>
    <p class="${body.trim().startsWith('<?xml') ? 'ok' : 'err'}">
        ${body.trim().startsWith('<?xml')
            ? '✅ Response starts with <?xml — valid XML declaration'
            : '❌ Response does NOT start with <?xml'}
    </p>
    <p class="${body.includes('<urlset') ? 'ok' : 'err'}">
        ${body.includes('<urlset')
            ? '✅ Contains <urlset> tag — valid sitemap structure'
            : '❌ Missing <urlset> tag'}
    </p>
    <p class="${body.includes('<loc>') ? 'ok' : 'err'}">
        ${body.includes('<loc>')
            ? '✅ Contains <loc> tag — has URL entries'
            : '❌ Missing <loc> tag'}
    </p>

    <h2>Google Compatibility</h2>
    <p class="${(headers['content-type']?.includes('xml') && body.trim().startsWith('<?xml') && body.includes('<urlset')) ? 'ok' : 'err'}">
        ${(headers['content-type']?.includes('xml') && body.trim().startsWith('<?xml') && body.includes('<urlset'))
            ? '✅ This sitemap should be readable by Google!'
            : '❌ Google may have trouble reading this sitemap. See issues above.'}
    </p>

    <h2>Raw Response Body</h2>
    <pre>${body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;

    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
