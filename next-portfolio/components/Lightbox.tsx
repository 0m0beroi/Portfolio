'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxImage { src: string; alt?: string; caption?: string; }
interface LightboxContextValue { open: (img: LightboxImage) => void; }
const Ctx = createContext<LightboxContextValue | null>(null);
export function useLightbox(){ const ctx = useContext(Ctx); if(!ctx) throw new Error('useLightbox outside provider'); return ctx; }

export function LightboxProvider({ children }: { children: React.ReactNode }){
  const [img,setImg] = useState<LightboxImage | null>(null);
  const open = useCallback((i: LightboxImage)=> setImg(i), []);
  const close = useCallback(()=> setImg(null), []);
  useEffect(()=>{
    function onKey(e: KeyboardEvent){ if(e.key==='Escape') close(); }
    if(img) document.addEventListener('keyup', onKey); else document.removeEventListener('keyup', onKey);
    return () => document.removeEventListener('keyup', onKey);
  },[img, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
  {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {img && (
            <motion.div
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-6"
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              onClick={close}
            >
              <motion.figure
                initial={{scale:.9, opacity:0}}
                animate={{scale:1, opacity:1}}
                exit={{scale:.9, opacity:0}}
                transition={{type:'spring', stiffness:180, damping:22}}
                className="max-w-full max-h-full text-center"
                onClick={(e)=> e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt||''} className="max-h-[70vh] max-w-full rounded-md shadow-xl" />
                {img.caption && <figcaption className="mt-3 text-xs text-slate-200">{img.caption}</figcaption>}
                <button onClick={close} className="absolute top-4 right-4 text-slate-200 text-xl" aria-label="Close">✕</button>
              </motion.figure>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Ctx.Provider>
  );
}

export function LightboxImage({ src, alt, caption, className }: { src: string; alt?: string; caption?: string; className?: string }){
  const { open } = useLightbox();
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt||''} className={`cursor-zoom-in ${className||''}`} onClick={()=> open({ src, alt, caption })} />
  );
}
