"use client";
import { useEffect, useState, useMemo } from 'react';

export interface MotionPreferences {
  reduced: boolean; // true if user prefers reduced motion or custom override
  duration: (base: number) => number; // scales duration
  disabled: boolean; // if animations should be skipped entirely
}

/**
 * Detects prefers-reduced-motion and allows an override via localStorage key 'motion' = 'reduced' | 'full'.
 * Provides helper to scale durations.
 */
export function useMotionPreferences(): MotionPreferences {
  const [reduced, setReduced] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('motion') : null;
      const preferReduced = media.matches || stored === 'reduced';
      setReduced(preferReduced);
      setDisabled(stored === 'none');
      document.documentElement.classList.toggle('reduce-effects', preferReduced || stored === 'none');
    };
    apply();
    media.addEventListener('change', apply);
    window.addEventListener('storage', apply);
    return () => {
      media.removeEventListener('change', apply);
      window.removeEventListener('storage', apply);
    };
  }, []);

  const duration = useMemo(() => (base: number) => reduced ? Math.min(0.35, base * 0.5) : base, [reduced]);

  return { reduced, duration, disabled };
}

export function setMotionOverride(mode: 'full' | 'reduced' | 'none') {
  localStorage.setItem('motion', mode);
  window.dispatchEvent(new Event('storage'));
}
