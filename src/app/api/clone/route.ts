import { NextRequest, NextResponse } from 'next/server';
import { scrapeUrl, buildClonedHtml } from '@/lib/scraper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL. Please provide a valid HTTP/HTTPS URL.' },
        { status: 400 }
      );
    }

    const scrapeResult = await scrapeUrl(url);
    const html = buildClonedHtml(scrapeResult);

    return NextResponse.json({
      html,
      title: scrapeResult.title,
      images: scrapeResult.images.length,
      links: scrapeResult.links.length,
    });
  } catch (error) {
    console.error('Clone error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to clone website' },
      { status: 500 }
    );
  }
}
