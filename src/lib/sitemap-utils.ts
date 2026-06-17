export function generateSitemapXml(urls: { url: string; lastModified?: string; changeFrequency?: string; priority?: number }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${item.changeFrequency || 'monthly'}</changefreq>
    <priority>${item.priority || 0.5}</priority>
  </url>`
    )
    .join('')}
</urlset>`;
}

export function generateSitemapIndexXml(sitemaps: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (url) => `
  <sitemap>
    <loc>${url}</loc>
  </sitemap>`
    )
    .join('')}
</sitemapindex>`;
}
