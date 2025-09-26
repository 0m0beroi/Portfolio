'use client';
import { useEffect } from 'react';
import { runPerfBudgetCheck } from '../lib/perfBudget';
export default function PerfBudgetClient(){
  useEffect(()=>{ runPerfBudgetCheck(); },[]);
  return null;
}
