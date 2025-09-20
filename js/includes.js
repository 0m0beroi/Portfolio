// Simple HTML include loader for nav & footer
(function earlyApply(){
  // Always apply glass theme class early
  document.documentElement.classList.add('glass-theme-root');
  document.body && document.body.classList.add('glass-theme');
  try {
    const stored = localStorage.getItem('themeMode'); // values: 'light'|'dark'|'auto'
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective = stored === 'auto' || !stored ? (prefersDark ? 'dark':'light') : stored;
    document.documentElement.classList.toggle('dark', effective === 'dark');
    document.documentElement.setAttribute('data-theme', effective);
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
    const menu = document.getElementById('themeMenu');
    const options = () => menu ? Array.from(menu.querySelectorAll('[data-theme-set]')) : [];
    const modes = ['light','dark','auto'];
    function currentStored(){ return localStorage.getItem('themeMode') || 'auto'; }
    function computeEffective(mode){
      if(mode==='auto'){ return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark':'light'; }
      return mode;
    }
    function updateOptionStates(active){
      options().forEach(btn=>{
        const isActive = btn.getAttribute('data-theme-set')===active;
        btn.setAttribute('aria-checked', isActive ? 'true':'false');
      });
    }
    function closeMenu(){ if(menu){ menu.classList.add('hidden'); toggle.setAttribute('aria-expanded','false'); } }
    function openMenu(){ if(menu){ menu.classList.remove('hidden'); toggle.setAttribute('aria-expanded','true'); updateOptionStates(currentStored()); options()[0]?.focus(); } }
    function apply(mode, persist=true){
      const effective = computeEffective(mode);
      document.documentElement.classList.toggle('dark', effective==='dark');
      document.documentElement.setAttribute('data-theme', mode);
      if(persist){ try { localStorage.setItem('themeMode', mode); } catch(e){} }
      if(icon){
        icon.classList.remove('fa-moon','fa-sun','fa-circle-half-stroke');
        const map = {light: icon.dataset.iconLight || 'fa-moon', dark: icon.dataset.iconDark || 'fa-sun', auto: icon.dataset.iconAuto || 'fa-circle-half-stroke'};
        icon.classList.add(map[mode]);
        icon.classList.add('mode-change');
        setTimeout(()=>icon.classList.remove('mode-change'),400);
      }
      updateOptionStates(mode);
    }
    // Initial
    apply(currentStored(), false);
    // Respond to system changes when in auto
    if(window.matchMedia){
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener && mq.addEventListener('change', ()=>{ if(currentStored()==='auto') apply('auto', false); });
    }
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if(menu?.classList.contains('hidden')) openMenu(); else closeMenu();
    });
    document.addEventListener('click', (e)=>{ if(menu && !menu.classList.contains('hidden')) { if(!menu.contains(e.target) && e.target!==toggle) closeMenu(); }});
    document.addEventListener('keydown', (e)=>{
      if(e.key==='Escape') { closeMenu(); toggle.focus(); }
      if(menu && !menu.classList.contains('hidden')){
        const list = options();
        const idx = list.indexOf(document.activeElement);
        if(e.key==='ArrowDown'){ e.preventDefault(); list[(idx+1)%list.length]?.focus(); }
        if(e.key==='ArrowUp'){ e.preventDefault(); list[(idx-1+list.length)%list.length]?.focus(); }
        if(e.key==='Home'){ e.preventDefault(); list[0]?.focus(); }
        if(e.key==='End'){ e.preventDefault(); list[list.length-1]?.focus(); }
        if(e.key==='Enter' || e.key===' '){ if(document.activeElement?.dataset.themeSet){ const mode=document.activeElement.dataset.themeSet; apply(mode); closeMenu(); toggle.focus(); } }
      }
    });
    options().forEach(btn => btn.addEventListener('click', (ev)=>{ const mode=btn.getAttribute('data-theme-set'); apply(mode); closeMenu(); toggle.focus(); ev.stopPropagation(); }));
  })();
  document.dispatchEvent(new Event('includes:loaded'));
})();
