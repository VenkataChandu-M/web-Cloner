import * as cheerio from 'cheerio';

export interface ScrapeResult {
  title: string;
  html: string;
  css: string;
  bodyHtml: string;
  meta: {
    description: string;
    favicon: string;
  };
  links: string[];
  images: string[];
}

/**
 * Scrapes a URL and extracts the HTML structure, inline styles, and metadata.
 * This runs server-side only.
 */
export async function scrapeUrl(url: string): Promise<ScrapeResult> {
  // Validate URL
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL provided');
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Extract title
  const title = $('title').text().trim() || 'Untitled Page';

  // Extract meta
  const description = $('meta[name="description"]').attr('content') || '';
  const favicon = $('link[rel="icon"], link[rel="shortcut icon"]').attr('href') || '';

  // Extract all CSS from style tags
  const cssBlocks: string[] = [];
  $('style').each((_, el) => {
    const css = $(el).html();
    if (css) cssBlocks.push(css);
  });

  // Extract linked CSS (external stylesheets)
  const cssLinks: string[] = [];
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const absoluteUrl = new URL(href, url).toString();
        cssLinks.push(absoluteUrl);
      } catch {
        // Skip invalid URLs
      }
    }
  });

  // Fetch external stylesheets (limit to 5 to avoid slowdowns)
  const externalCss = await Promise.allSettled(
    cssLinks.slice(0, 5).map(async (cssUrl) => {
      const res = await fetch(cssUrl, { signal: AbortSignal.timeout(5000) });
      return res.ok ? res.text() : '';
    })
  );

  externalCss.forEach((result) => {
    if (result.status === 'fulfilled' && result.value) {
      cssBlocks.push(result.value);
    }
  });

  // Remove scripts for safety
  $('script').remove();
  $('noscript').remove();

  // Convert relative URLs to absolute for images
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src) {
      try {
        $(el).attr('src', new URL(src, url).toString());
      } catch {
        // Skip invalid URLs
      }
    }
  });

  // Convert relative URLs for links
  $('a').each((_, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
      try {
        $(el).attr('href', new URL(href, url).toString());
      } catch {
        // Skip
      }
    }
  });

  // Extract images
  const images: string[] = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src) images.push(src);
  });

  // Extract links
  const links: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) links.push(href);
  });

  // Get body HTML
  const bodyHtml = $('body').html() || '';

  // Build combined CSS
  const combinedCss = cssBlocks.join('\n\n');

  return {
    title,
    html,
    css: combinedCss,
    bodyHtml,
    meta: { description, favicon },
    links,
    images,
  };
}

/**
 * Creates a complete self-contained HTML file from scraped data
 */
export function buildClonedHtml(scrapeResult: ScrapeResult): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${scrapeResult.title} (Cloned)</title>
  <meta name="description" content="${scrapeResult.meta.description}">
  <style>
${scrapeResult.css}
  </style>
</head>
<body>
${scrapeResult.bodyHtml}
</body>
</html>`;
}
