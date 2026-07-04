import { NextRequest, NextResponse } from 'next/server';
import { searchForInspiration } from '@/lib/ai/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const results = await searchForInspiration(query);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);

    if (error instanceof Error && error.message.includes('GEMINI_API_KEY')) {
      return NextResponse.json(
        { error: 'Gemini API key not configured.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Search failed' },
      { status: 500 }
    );
  }
}
