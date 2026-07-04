import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildGenerationPrompt } from '@/lib/prompts';

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set. Add it to .env.local');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export interface GenerateWebsiteOptions {
  description: string;
  style: string;
  sections: string[];
  colorScheme?: string;
  documentContent?: string;
  inspirationUrls?: string[];
}

export async function generateWebsite(options: GenerateWebsiteOptions): Promise<string> {
  const client = getClient();
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

  let prompt = buildGenerationPrompt(
    options.description,
    options.style,
    options.sections,
    options.colorScheme
  );

  if (options.documentContent) {
    prompt += `\n\nADDITIONAL CONTEXT FROM UPLOADED DOCUMENT:\n${options.documentContent}`;
  }

  if (options.inspirationUrls && options.inspirationUrls.length > 0) {
    prompt += `\n\nINSPIRATION WEBSITES TO REFERENCE (for style/layout ideas, not to copy):\n${options.inspirationUrls.join('\n')}`;
  }

  const result = await model.generateContent(prompt);
  const response = result.response;
  let text = response.text();

  // Clean up any markdown code fences if present
  text = text.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '');
  text = text.trim();

  return text;
}

export async function searchForInspiration(query: string): Promise<Array<{ title: string; url: string; snippet: string }>> {
  const client = getClient();
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Search your knowledge for 6 real, well-known websites that match this description and would serve as design inspiration: "${query}"

Return a JSON array with objects containing: title, url, snippet (brief description of what makes their design noteworthy).
Return ONLY valid JSON, no markdown fences or explanations.
Example format: [{"title":"Stripe","url":"https://stripe.com","snippet":"Clean gradients, smooth animations, clear CTAs"}]`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // Clean up
  text = text.replace(/^```json?\n?/i, '').replace(/\n?```$/i, '').trim();

  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export async function analyzeDocument(content: string): Promise<string> {
  const client = getClient();
  const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Analyze the following document/text and extract the key information that would be needed to build a website from it. Summarize the main content, suggested sections, and any branding information found.

Document content:
${content}

Return a concise summary focusing on: purpose, key content sections, branding elements, and suggested website structure.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
