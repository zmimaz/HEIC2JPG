// NOT USED — sitemap.xml.js and robots.txt.js handle their routes directly
// This file intentionally left as a pass-through

export async function onRequest(context) {
    return await context.next();
}
