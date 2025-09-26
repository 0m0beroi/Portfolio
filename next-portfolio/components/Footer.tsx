import React from 'react';

export default function Footer(){
  return (
    <footer className="mt-32 border-t border-slate-200/60 dark:border-slate-700/60 py-10 text-sm text-center text-slate-500">
      <p>&copy; {new Date().getFullYear()} Om Oberoi. All rights reserved.</p>
    </footer>
  );
}
