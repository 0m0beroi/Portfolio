// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const bucket = new Map<string, { count: number; first: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = bucket.get(ip) || { count: 0, first: now };
  if (now - entry.first > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.first = now;
  }
  entry.count++;
  bucket.set(ip, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Rate limit exceeded' }, { status: 429 });
  }
  const form = await req.json().catch(() => ({}));
  const { name = '', email = '', message = '', company = '' } = form;

  const errors: Record<string,string> = {};
  if (company) errors.global = 'Spam detected';
  if (name.trim().length < 2) errors.name = 'Name too short';
  if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) errors.email = 'Invalid email';
  if (message.trim().length < 10) errors.message = 'Message too short';
  if (/https?:\\/\\//i.test(message)) errors.message = 'Links not allowed';

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: integrate email sending (Resend / SMTP / etc.)
  return NextResponse.json({ ok: true, message: 'Message received' });
}