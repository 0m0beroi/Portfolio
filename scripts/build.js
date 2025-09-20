// Simple build script: copies assets & minifies css/js into dist
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DIST = path.join(ROOT,'dist');

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p,{recursive:true}); }
function minifyCSS(c){ return c.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').replace(/ ?([:;{},]) ?/g,'$1').trim(); }
function minifyJS(c){ return c.replace(/\/\*[\s\S]*?\*\//g,'').replace(/(^|\n)\s*\/\/.*(?=\n)/g,'').replace(/\s+/g,' ').trim(); }

function copyFile(src,dst){ ensureDir(path.dirname(dst)); fs.copyFileSync(src,dst); }

function processHTML(file){ let html = fs.readFileSync(file,'utf8'); html = html.replace(/\n\s*<!-- build:remove -->[\s\S]*?<!-- endbuild -->/g,''); const rel = path.relative(ROOT,file); const out = path.join(DIST,rel); ensureDir(path.dirname(out)); fs.writeFileSync(out,html,'utf8'); }

function walk(dir,cb){ fs.readdirSync(dir,{withFileTypes:true}).forEach(d=>{ const p=path.join(dir,d.name); if(d.isDirectory()) walk(p,cb); else cb(p); }); }

function build(){ if(fs.existsSync(DIST)) fs.rmSync(DIST,{recursive:true}); ensureDir(DIST); walk(ROOT,(file)=>{ if(file.includes('node_modules')||file.includes('dist')||file.includes('scripts')) return; if(/\.html$/.test(file)) return processHTML(file); if(/\.css$/.test(file)){ const out=path.join(DIST,path.relative(ROOT,file)); ensureDir(path.dirname(out)); fs.writeFileSync(out,minifyCSS(fs.readFileSync(file,'utf8'))); return; } if(/\.js$/.test(file)){ const out=path.join(DIST,path.relative(ROOT,file)); ensureDir(path.dirname(out)); fs.writeFileSync(out,minifyJS(fs.readFileSync(file,'utf8'))); return;} if(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/.test(file)){ copyFile(file,path.join(DIST,path.relative(ROOT,file))); }
  }); console.log('Build complete -> dist/'); }

build();
