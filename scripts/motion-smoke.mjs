/* Offline browser smoke test for editable portfolio motion. */
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const server=createServer(async(req,res)=>{
 let name;
 try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 if(name.endsWith('/'))name+='index.html';
 const file=path.resolve(root,'.'+name);
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 try{const content=await readFile(file);res.writeHead(200,{'Content-Type':path.extname(file)==='.css'?'text/css':path.extname(file)==='.js'?'text/javascript':'text/html; charset=utf-8'});res.end(content)}
 catch{res.writeHead(404).end()}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
let browser;
try{
 browser=await chromium.launch({headless:true});
 for(const route of ['/','/samples/']){
  for(const reducedMotion of ['reduce','no-preference']){
   for(const width of [390,1366]){
    const context=await browser.newContext({viewport:{width,height:860},reducedMotion});
    await context.route('**/*',r=>r.request().url().startsWith(origin+'/')?r.continue():r.abort());
    const page=await context.newPage();const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(origin+route,{waitUntil:'networkidle'});
    const state=await page.evaluate(()=>({
      enabled:document.body.classList.contains('motion-ready'),
      bar:!!document.querySelector('.lm-progress'),
      css:[...document.styleSheets].some(x=>x.href?.endsWith('motion.css')),
      script:performance.getEntriesByType('resource').some(x=>x.name.endsWith('motion.js')),
      scrollWidth:document.documentElement.scrollWidth,
      offenders:[...document.querySelectorAll('body *')].map(el=>({el,box:el.getBoundingClientRect()})).filter(({box})=>box.width&&(box.right>innerWidth+2||box.left<-2)).slice(0,15).map(({el,box})=>({tag:el.tagName,cls:String(el.className).slice(0,75),left:Math.round(box.left),right:Math.round(box.right)})),
      width:innerWidth,
      h1:document.querySelectorAll('h1').length
    }));
    assert.ok(state.css&&state.script&&state.h1===1,route+' assets and title');
    assert.equal(state.enabled,reducedMotion==='no-preference');
    assert.equal(state.bar,reducedMotion==='no-preference');
    assert.ok(state.scrollWidth<=state.width+2,route+' overflow at '+width+' width '+state.scrollWidth+' offenders '+JSON.stringify(state.offenders));
    assert.deepEqual(errors,[]);
    await context.close();
   }
  }
 }
 console.log('PASS portfolio motion, two pages, 390/1366 widths, both motion modes');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))}
