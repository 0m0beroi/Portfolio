import { NextResponse } from 'next/server';
import { z } from 'zod';

// Simple in-memory rate limiter (per IP) - resets on server restart (sufficient for demo)
const RATE_LIMIT = 5; // submissions
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ipHits: Record<string, { count: number; start: number }> = {};

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(10).max(5000)
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const now = Date.now();

  // Rate limiting logic
  const bucket = ipHits[ip];
  if (!bucket) {
    ipHits[ip] = { count: 1, start: now };
  } else {
    if (now - bucket.start > WINDOW_MS) {
      ipHits[ip] = { count: 1, start: now }; // reset window
    } else {
      bucket.count += 1;
      if (bucket.count > RATE_LIMIT) {
        return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
      }
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, message } = parsed.data;

  // Here: integrate with email service / DB / queue. For now just echo success.
  // Optionally you can write to a file or external logging service.
  console.log('Contact submission:', { name, email, message: message.slice(0, 120) });

  return NextResponse.json({ ok: true });
}

// cd next-portfolio
// npm run dev
