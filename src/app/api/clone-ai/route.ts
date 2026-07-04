import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildCloneRedesignPrompt } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { html, style } = body;

    if (!html) {
      return NextResponse.json({ error: 'html is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = buildCloneRedesignPrompt(html, style || 'glassmorphism');
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean markdown fences
    text = text.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();

    return NextResponse.json({ html: text });
  } catch (error) {
    console.error('Clone AI error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to redesign' },
      { status: 500 }
    );
  }
}
