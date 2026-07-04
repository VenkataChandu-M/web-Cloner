import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { html, instruction } = body;

    if (!html || !instruction) {
      return NextResponse.json({ error: 'html and instruction are required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are a web design expert. You will be given an HTML website and a design instruction.
Apply the instruction to the HTML and return the modified HTML.

INSTRUCTION: ${instruction}

RULES:
- Return ONLY the complete modified HTML. No explanations, no markdown fences.
- Make surgical edits — only change what the instruction asks for
- Keep all existing content and structure intact
- Preserve all JavaScript functionality
- Maintain the overall design language

HTML TO MODIFY:
${html.slice(0, 20000)}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean up any markdown fences
    text = text.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();

    return NextResponse.json({ html: text });
  } catch (error) {
    console.error('Tweak error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to apply tweak' },
      { status: 500 }
    );
  }
}
