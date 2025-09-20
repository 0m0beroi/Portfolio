// Simple HTML include loader for nav & footer
(function earlyApply(){
  try {
    const stored = localStorage.getItem('darkMode');
    if(stored === 'true') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme','dark');
    } else if(stored === 'false') {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme','light');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if(prefersDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme','dark');
      } else {
        document.documentElement.setAttribute('data-theme','light');
      }
    }
  } catch(e) { /* ignore */ }
})();

// Simple HTML include loader for nav & footer
(async function(){
  async function loadInclude(selector, url){
    const host = document.querySelector(selector);
    if(!host) return;
    try { const res = await fetch(url); host.innerHTML = await res.text(); }
    catch(e){ console.error('Include load failed', url, e); }
  }
  await loadInclude('#site-nav','partials/nav.html');
  await loadInclude('#site-footer','partials/footer.html');
  // Re-run script.js initializers if necessary (basic re-bind for mobile menu)
  // Attach dark mode toggle once nav is present
  (function initDarkMode(){
    const toggle = document.getElementById('darkModeToggle');
    if(!toggle) return;
    const icon = document.getElementById('darkModeIcon');
    const apply = (enabled, persist = true) => {
      document.documentElement.classList.toggle('dark', enabled);
      document.documentElement.setAttribute('data-theme', enabled ? 'dark':'light');
      if(persist){ try { localStorage.setItem('darkMode', enabled); } catch(e){} }
      if(icon){
        icon.classList.remove('fa-moon','fa-sun');
        icon.classList.add(enabled ? 'fa-sun' : 'fa-moon');
        icon.classList.add('mode-change');
        setTimeout(()=>icon.classList.remove('mode-change'),400);
      }
    };
    const stored = localStorage.getItem('darkMode');
    if(stored === 'true') apply(true,false);
    else if(stored === 'false') apply(false,false);
    else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      apply(prefersDark,false);
      if(window.matchMedia){
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener && mq.addEventListener('change', e=>{
          if(localStorage.getItem('darkMode')===null){
            apply(e.matches,false);
          }
        });
      }
    }
    toggle.addEventListener('click', () => apply(!document.documentElement.classList.contains('dark')));
  })();
  document.dispatchEvent(new Event('includes:loaded'));
})();
