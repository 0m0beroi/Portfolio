'use client';
import React, { createContext, useContext, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Toast { id: number; message: string; type?: 'info' | 'success' | 'error'; }
interface ToastContextValue { push: (message: string, type?: Toast['type']) => void; }
const ToastCtx = createContext<ToastContextValue | null>(null);
export function useToast(){
  const ctx = useContext(ToastCtx); if(!ctx) throw new Error('useToast outside provider'); return ctx;
}

export default function ToastHost({ children }: { children?: React.ReactNode }){
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const push = useCallback((message: string, type: Toast['type']='info') => {
    setToasts(cur => [...cur.slice(-2), { id: Date.now(), message, type }]);
    setTimeout(()=> setToasts(cur => cur.slice(1)), 3200);
  }, []);

  React.useEffect(()=>{ (window as any).pushToast = push; }, [push]);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed top-4 inset-x-0 flex flex-col items-center gap-2 z-[999]">
        <AnimatePresence initial={false}>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{opacity:0, y:8, scale:.95}}
              animate={{opacity:1, y:0, scale:1}}
              exit={{opacity:0, y:-6, scale:.95}}
              transition={{duration:.28, ease:'easeOut'}}
              className={`theme-toast bg-slate-800 text-slate-50 px-4 py-2 rounded shadow border ${t.type==='error' ? 'border-red-500' : t.type==='success' ? 'border-green-500' : 'border-slate-600'}`}
              role="status" aria-live="polite"
            >{t.message}</motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
