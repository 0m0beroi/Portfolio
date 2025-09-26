import React from 'react';

async function fetchSubmissions(){
  const token = process.env.ADMIN_TOKEN || 'dev-token';
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/submissions`, {
    headers: { 'Authorization': `Bearer ${token}` },
    // cache: 'no-store' // ensure fresh
  });
  if(!res.ok) return [];
  const data = await res.json();
  return data.submissions || [];
}

export const dynamic = 'force-dynamic';

export default async function AdminPage(){
  const submissions = await fetchSubmissions();
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Contact Submissions</h1>
      {submissions.length === 0 && <p className="text-sm text-muted-foreground">No submissions yet.</p>}
      <ul className="divide-y divide-slate-200 dark:divide-slate-700 rounded border border-slate-200 dark:border-slate-700">
        {submissions.map((s: any) => (
          <li key={s.id} className="p-4 space-y-1 text-sm">
            <div className="flex flex-wrap gap-2 justify-between">
              <span className="font-semibold">{s.name}</span>
              <span className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleString()}</span>
            </div>
            <div className="text-xs text-slate-500">{s.email}</div>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{s.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
