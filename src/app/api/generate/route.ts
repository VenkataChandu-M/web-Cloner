import { NextRequest, NextResponse } from 'next/server';
import { generateWebsite } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, style, sections, colorScheme, documentContent, inspirationUrls } = body;

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const html = await generateWebsite({
      description,
      style: style || '3d',
      sections: sections || ['hero', 'features', 'footer'],
      colorScheme,
      documentContent,
      inspirationUrls,
    });

    return NextResponse.json({ html });
  } catch (error) {
    console.error('Generation error:', error);

    if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate website' },
      { status: 500 }
    );
  }
}
