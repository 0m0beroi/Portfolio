import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

const DATA_FILE = path.join(process.cwd(),'backend','contact-submissions.json');

function readSubmissions(){
  try { return JSON.parse(fs.readFileSync(DATA_FILE,'utf8')); } catch { return []; }
}

export async function GET(req: Request){
  const auth = req.headers.get('authorization');
  const token = process.env.ADMIN_TOKEN || 'dev-token';
  if(auth !== `Bearer ${token}`){
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const subs = readSubmissions();
  return NextResponse.json({ count: subs.length, submissions: subs });
}
