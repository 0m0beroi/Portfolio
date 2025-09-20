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
    // Guard against multiple initialization (in case of dynamic re-injection)
    if(window.__themeInitDone){ return; }
    window.__themeInitDone = true;
    const toggle = document.getElementById('darkModeToggle');
    if(!toggle) return;
    const icon = document.getElementById('darkModeIcon');
    const menu = document.getElementById('themeMenu');
    let previousFocus = null;
    let backdrop = null;
    let toastTimer = null;
    let activeToast = null;
    let toastExitTimer = null;
    let themeAnnounceDebounce = null;
    let rapidModeChanges = 0;
    // Toast utility (single-instance w/ animated exit & ARIA role)
    function showToast(message){
      let host = document.getElementById('toastHost');
      if(!host){
        host = document.createElement('div');
        host.id = 'toastHost';
        host.setAttribute('aria-live','polite');
        document.body.appendChild(host);
      }
      // Animate out existing toast instead of abrupt removal
      if(activeToast){
        activeToast.classList.add('leaving');
        clearTimeout(toastTimer);
        clearTimeout(toastExitTimer);
        const old = activeToast;
        toastExitTimer = setTimeout(()=>{ old.remove(); if(old===activeToast) activeToast=null; }, 280);
        activeToast = null;
      }
      const node = document.createElement('div');
      node.className = 'theme-toast';
      node.setAttribute('role','status');
      node.setAttribute('aria-atomic','true');
      node.textContent = message;
      host.appendChild(node);
      activeToast = node;
      requestAnimationFrame(()=> node.classList.add('show'));
      clearTimeout(toastTimer);
      toastTimer = setTimeout(()=> beginToastExit(node), 2200);
    }
    function beginToastExit(node){
      if(!node) return;
      node.classList.add('leaving');
      setTimeout(()=>{ if(node===activeToast) activeToast=null; node.remove(); }, 300);
    }
    const options = () => menu ? Array.from(menu.querySelectorAll('[data-theme-set]')) : [];
    const modes = ['light','dark','auto','dim','contrast'];
    function currentStored(){ return localStorage.getItem('themeMode') || 'auto'; }
    function computeEffective(mode){
      if(mode==='auto') return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark':'light';
      if(mode==='dim' || mode==='contrast') return 'dark';
      return mode;
    }
    function updateOptionStates(active){
      options().forEach(btn=>{
        const isActive = btn.getAttribute('data-theme-set')===active;
        btn.setAttribute('aria-checked', isActive ? 'true':'false');
      });
      const reduceBtn = menu?.querySelector('[data-reduce-effects-toggle]');
      if(reduceBtn){ reduceBtn.setAttribute('aria-checked', localStorage.getItem('reduceEffects')==='true' ? 'true':'false'); }
    }
    function removeBackdrop(){ if(backdrop){ backdrop.classList.remove('opacity-100'); setTimeout(()=>backdrop && backdrop.remove(),180); backdrop=null; } }
    function closeMenu(origin){
      if(!menu) return;
      menu.classList.add('closing');
      setTimeout(()=>{ menu.classList.add('hidden'); menu.classList.remove('closing','opening'); },130);
      toggle.setAttribute('aria-expanded','false');
      removeBackdrop();
      // Only restore focus if closed via keyboard navigation or explicit escape
      if(origin==='keyboard' && previousFocus){ previousFocus.focus(); }
    }
    function createBackdrop(){
      backdrop = document.createElement('div');
      backdrop.className = 'theme-backdrop';
      backdrop.addEventListener('click', closeMenu);
      document.body.appendChild(backdrop);
      requestAnimationFrame(()=> backdrop.classList.add('opacity-100'));
    }
  function openMenu(){ if(menu){ previousFocus = document.activeElement; menu.classList.remove('hidden'); menu.classList.add('opening'); toggle.setAttribute('aria-expanded','true'); updateOptionStates(currentStored()); createBackdrop(); options()[0]?.focus(); } }
    let lastAppliedMode = null; // track to prevent redundant work
    function apply(mode, persist=true){
      if(mode === lastAppliedMode){
        // No change: avoid re-triggering transitions, animation restarts, or focus shift
        return;
      }
      const effective = computeEffective(mode);
      document.documentElement.classList.add('theme-transition');
      clearTimeout(window.__themeTransitionTimer);
      window.__themeTransitionTimer = setTimeout(()=>document.documentElement.classList.remove('theme-transition'),450);
      document.documentElement.classList.toggle('dark', effective==='dark');
      document.documentElement.setAttribute('data-theme', mode);
      if(persist){ try { localStorage.setItem('themeMode', mode); } catch(e){} }
      if(icon){
        icon.classList.remove('fa-moon','fa-sun','fa-circle-half-stroke','fa-cloud-moon','fa-low-vision');
        const map = {light: icon.dataset.iconLight || 'fa-moon', dark: icon.dataset.iconDark || 'fa-sun', auto: icon.dataset.iconAuto || 'fa-circle-half-stroke', dim:'fa-cloud-moon', contrast:'fa-low-vision'};
        icon.classList.add(map[mode]);
        icon.classList.add('mode-change');
        setTimeout(()=>icon.classList.remove('mode-change'),400);
      }
      // If reduced-effects not explicitly enabled, ensure animations can resume
      if(localStorage.getItem('reduceEffects')!=='true'){
        document.documentElement.classList.remove('reduce-effects');
        // Force restart of any CSS animations that might have been paused
        restartAnimations('immediate');
        // Schedule additional passes to catch late layout / async content
        requestAnimationFrame(()=> restartAnimations('raf')); // next frame
        setTimeout(()=> restartAnimations('timeout-120'),120);
        setTimeout(()=> restartAnimations('timeout-300'),300);
      }
  updateOptionStates(mode);
  lastAppliedMode = mode;
      // Debounced announcement logic for rapid changes
      rapidModeChanges++;
      clearTimeout(themeAnnounceDebounce);
      const announce = () => {
        showToast(`Theme: ${mode.charAt(0).toUpperCase()+mode.slice(1)}`);
        rapidModeChanges = 0;
      };
      if(rapidModeChanges > 2){
        themeAnnounceDebounce = setTimeout(announce, 250);
      } else {
        announce();
      }
    }
    function restartAnimations(origin){
      if(document.documentElement.classList.contains('reduce-effects')) return; // respect user preference
      const t0 = performance.now();
      const candidates = Array.from(document.querySelectorAll('*'));
      const restarted = [];
      candidates.forEach(el => {
        if(!(el.offsetParent || el.getClientRects().length)) return; // skip hidden
        const cs = getComputedStyle(el);
        const names = cs.animationName.split(',').map(s=>s.trim()).filter(n=> n && n!=='none');
        if(!names.length) return;
        const playStates = cs.animationPlayState.split(',').map(s=>s.trim());
        const anyPaused = playStates.some(s=>s==='paused');
        const original = cs.animation; // snapshot full shorthand
        // Clear animation
        el.style.animation = 'none';
        // Remove utility classes temporarily (animate-*) to force full reflow path
        const animClasses = Array.from(el.classList).filter(c=> c.startsWith('animate-'));
        animClasses.forEach(c=> el.classList.remove(c));
        void el.offsetWidth; // reflow flush
        // Restore
        el.style.animation = original;
        animClasses.forEach(c=> el.classList.add(c));
        el.style.animationPlayState = 'running';
        restarted.push({el, names:names.join(','), paused:anyPaused});
      });
      // Next frame assurance pass
      requestAnimationFrame(()=>{
        restarted.forEach(r=>{
          const cs = getComputedStyle(r.el);
          if(cs.animationPlayState.includes('paused')) r.el.style.animationPlayState='running';
        });
      });
      const dt = (performance.now()-t0).toFixed(1);
      if(restarted.length===0){
        console.debug(`[restartAnimations] (${origin||'initial'}) none (${dt}ms)`);
      } else {
        console.debug(`[restartAnimations] (${origin||'initial'}) restarted ${restarted.length} element(s) in ${dt}ms`);
      }
      if(!window.debugAnimations){
        window.debugAnimations = function(){
          const stuck = [];
          document.querySelectorAll('*').forEach(el=>{
            const cs = getComputedStyle(el);
            if(cs.animationName && cs.animationName!=='none'){
              const paused = cs.animationPlayState.split(',').some(s=>s.trim()==='paused');
              if(paused) stuck.push({el, animation: cs.animationName, playState: cs.animationPlayState});
            }
          });
          console.table(stuck.map(x=>({tag: x.el.tagName.toLowerCase(), classes: x.el.className, animation: x.animation, playState: x.playState})));
          return stuck;
        }
      }
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
      if(menu?.classList.contains('hidden')) openMenu(); else closeMenu('click');
    });
  document.addEventListener('click', (e)=>{ if(menu && !menu.classList.contains('hidden')) { if(!menu.contains(e.target) && e.target!==toggle) closeMenu('outside'); }});
    document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') { closeMenu('keyboard'); toggle.focus(); }
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
  options().forEach(btn => btn.addEventListener('click', (ev)=>{ const mode=btn.getAttribute('data-theme-set'); if(mode){ apply(mode); closeMenu('selection'); toggle.focus(); } ev.stopPropagation(); }));
    const reduceBtn = menu?.querySelector('[data-reduce-effects-toggle]');
    if(reduceBtn){
      reduceBtn.addEventListener('click', (e)=>{
        const current = localStorage.getItem('reduceEffects')==='true';
        const next = !current;
        try { localStorage.setItem('reduceEffects', String(next)); } catch(_){ }
        document.documentElement.classList.toggle('reduce-effects', next);
        updateOptionStates(currentStored());
        showToast(next? 'Reduced Effects: On':'Reduced Effects: Off');
        e.stopPropagation();
      });
    }
    // Restore menu open state if previously open
    if(localStorage.getItem('themeMenuOpen')==='true') {
      setTimeout(()=>{ if(menu?.classList.contains('hidden')) toggle.click(); }, 50);
    }
    // Apply reduced effects early
    if(localStorage.getItem('reduceEffects')==='true'){ document.documentElement.classList.add('reduce-effects'); }
  })();
  // Active navigation link highlighting
  (function navActive(){
    function applyActive(){
      const hash = location.hash || '#home';
      const links = document.querySelectorAll('#main-nav-links .nav-link, .mobile-nav-link');
      links.forEach(l=>{
        const target = l.getAttribute('href');
        if(target && target.endsWith(hash)) l.classList.add('active'); else l.classList.remove('active');
      });
    }
    applyActive();
    window.addEventListener('hashchange', applyActive);
  })();
  document.dispatchEvent(new Event('includes:loaded'));
  // Register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
})();
