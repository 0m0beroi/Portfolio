#!/usr/bin/env node
/**
 * Simple performance budget checker.
 * Scans top-level asset folders and compares aggregate sizes to performance-budget.json.
 */
const fs = require('fs');
const path = require('path');
const budgetPath = path.join(process.cwd(), 'performance-budget.json');

if(!fs.existsSync(budgetPath)){
  console.error('performance-budget.json not found');
  process.exit(1);
}

const budget = JSON.parse(fs.readFileSync(budgetPath,'utf8'));
const metrics = budget.metrics || {};

function dirSize(dir, exts){
  let total = 0;
  if(!fs.existsSync(dir)) return 0;
  const walk = d => {
    for(const f of fs.readdirSync(d)){
      const p = path.join(d,f);
      const stat = fs.statSync(p);
      if(stat.isDirectory()) walk(p); else {
        if(!exts || exts.includes(path.extname(p).toLowerCase())) total += stat.size;
      }
    }
  };
  walk(dir);
  return total;
}

// Collect sizes (bytes)
const htmlSize = dirSize(process.cwd(), ['.html']);
const cssSize = dirSize(path.join(process.cwd(),'css'), ['.css']);
const jsSize = dirSize(path.join(process.cwd(),'js'), ['.js']);
const imgSize = dirSize(path.join(process.cwd(),'assets','images'));
const totalSize = htmlSize + cssSize + jsSize + imgSize;

function kb(bytes){return (bytes/1024).toFixed(2);} 

const report = {
  htmlKB: kb(htmlSize),
  cssKB: kb(cssSize),
  jsKB: kb(jsSize),
  imagesKB: kb(imgSize),
  totalKB: kb(totalSize)
};

let passed = true;
function check(label, valueKB, max){
  if(!max) return;
  if(valueKB > max){
    passed = false;
    console.log(`FAIL  ${label} ${valueKB.toFixed(2)}KB > ${max}KB`);
  } else {
    console.log(`PASS  ${label} ${valueKB.toFixed(2)}KB <= ${max}KB`);
  }
}

console.log('Performance Budget Report');
console.log(report);
check('HTML', parseFloat(report.htmlKB), metrics.html?.maxKB);
check('CSS', parseFloat(report.cssKB), metrics.css?.maxKB);
check('JS', parseFloat(report.jsKB), metrics.js?.maxKB);
check('Images', parseFloat(report.imagesKB), metrics.images?.maxKB);
check('Total', parseFloat(report.totalKB), metrics.total?.maxKB);

if(process.argv.includes('--print')){
  console.log('\nRaw JSON:', JSON.stringify(report,null,2));
}

if(!passed){
  console.error('\nPerformance budget check failed');
  process.exit(2);
} else {
  console.log('\nAll performance budgets passed');
}
