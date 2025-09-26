import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMotionPreferences, setMotionOverride } from '../lib/motion';

describe('useMotionPreferences', () => {
  beforeEach(()=>{ localStorage.clear(); });
  it('returns defaults', () => {
    const { result } = renderHook(()=> useMotionPreferences());
    expect(typeof result.current.reduced).toBe('boolean');
    expect(typeof result.current.duration).toBe('function');
  });
  it('respects override reduced', () => {
    const { result } = renderHook(()=> useMotionPreferences());
    act(()=> setMotionOverride('reduced'));
    expect(result.current.reduced).toBe(true);
  });
});
