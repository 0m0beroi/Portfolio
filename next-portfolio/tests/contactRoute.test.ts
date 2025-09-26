import { describe, it, expect } from 'vitest';
import { POST } from '../app/api/contact/route';

function makeReq(body: any){
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
}

describe('POST /api/contact', () => {
  it('rejects invalid payload', async () => {
    const res = await POST(makeReq({ name: 'A', email: 'bad', message: 'short' }));
    expect(res.status).toBe(422);
  });
  it('accepts valid payload', async () => {
    const res = await POST(makeReq({ name: 'Alice', email: 'alice@example.com', message: 'Hello there this is a proper message.' }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });
});