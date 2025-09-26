"use client";
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ToastHost';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialState: FormState = { name: '', email: '', message: '' };

export default function ContactPage() {
  const { push } = useToast();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setStatus('success');
      push('Message sent! ✅','success');
      setForm(initialState);
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err: any) {
      const msg = err.message || 'Something went wrong';
      setError(msg);
      push(msg,'error');
      setStatus('error');
    }
  }, [form, status, push]);

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl font-bold mb-8">Contact</motion.h1>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={onChange}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30"
            aria-invalid={status==='error' && !form.name ? 'true' : undefined}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30"
            aria-invalid={status==='error' && !form.email ? 'true' : undefined}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={onChange}
            className="w-full resize-y rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-primary/30"
            aria-invalid={status==='error' && !form.message ? 'true' : undefined}
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">This form is rate limited. Please avoid duplicate rapid submissions.</p>
      </form>
    </div>
  );
}
