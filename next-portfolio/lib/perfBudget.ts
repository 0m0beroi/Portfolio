// Dev-only performance budget checker
import budget from '../../performance-budget.json';
interface BudgetMetric { maxKB: number }
interface BudgetFile { metrics: Record<string, BudgetMetric>; }

export function runPerfBudgetCheck(){
  if (process.env.NODE_ENV !== 'development') return;
  if (typeof window === 'undefined') return;
  try {
    const conf = budget as BudgetFile;
    setTimeout(()=>{
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const totals = { html:0, css:0, js:0, images:0, total:0 };
      resources.forEach(r => {
        const kb = (r.transferSize || r.encodedBodySize || 0)/1024;
        const name = r.name.split('?')[0];
        if(/\.css$/i.test(name)) totals.css += kb;
        else if(/\.js$/i.test(name)) totals.js += kb;
        else if(/\.(png|jpe?g|gif|webp|avif|svg)$/i.test(name)) totals.images += kb;
        else if(/html$/i.test(name) || /\/$/.test(name)) totals.html += kb;
        totals.total += kb;
      });
      Object.entries(conf.metrics).forEach(([k, v]) => {
        const key = k as keyof typeof totals;
        if (key in totals && totals[key] > v.maxKB){
          // eslint-disable-next-line no-console
          console.warn(`[PerfBudget] ${key} ${totals[key].toFixed(1)}KB exceeds ${v.maxKB}KB`);
        }
      });
    }, 2500);
  } catch(e){ /* ignore */ }
}
