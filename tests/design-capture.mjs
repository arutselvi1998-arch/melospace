import {spawn} from 'node:child_process';
import {writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:3001';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const child=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',['--headless=new','--remote-debugging-port=9338',`--user-data-dir=${resolve('.browser-profile-visual-'+process.pid)}`,'--no-first-run','--disable-extensions','about:blank'],{windowsHide:true,stdio:'ignore'});
let socket;
try{
 let target;for(let i=0;i<100;i++){try{target=(await(await fetch('http://127.0.0.1:9338/json/list',{signal:AbortSignal.timeout(1000)})).json()).find(p=>p.type==='page');if(target)break;}catch{}await pause(100);}
 assert.ok(target);socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}));let id=0;const calls=new Map();socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){const c=calls.get(m.id);calls.delete(m.id);m.error?c.no(new Error(JSON.stringify(m.error))):c.ok(m.result);}});
 const send=(method,params={})=>new Promise((ok,no)=>{const key=++id;calls.set(key,{ok,no});socket.send(JSON.stringify({id:key,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result.value;};
 await send('Page.enable');await send('Runtime.enable');await mkdir('test-artifacts',{recursive:true});
 for(const [name,path,width,height]of [['home-document','/customer',1440,1050],['admin-document','/admin',1440,1050],['category-document','/admin/screens/MEL-A-011',1440,1050],['editor-document','/admin/screens/MEL-A-012',1440,1050],['taxonomy-document','/admin/screens/MEL-A-013',1440,1050],['login-document','/customer/screens/MEL-U-005',1440,1050],['home-mobile-document','/customer',390,844],['splash-desktop','/customer/screens/MEL-U-001?preview=1',1440,900],['splash-mobile','/customer/screens/MEL-U-001?preview=1',390,844],['welcome-desktop','/customer/screens/MEL-U-002',1440,900],['welcome-mobile','/customer/screens/MEL-U-002',390,844]].filter(c=>!process.env.MELO_MOBILE_ONLY||c[2]<600).filter(c=>!process.env.MELO_ARTWORK_ONLY||['home-document','category-document','home-mobile-document'].includes(c[0])).filter(c=>!process.env.MELO_SPLASH_ONLY||c[0].startsWith('splash-')).filter(c=>!process.env.MELO_WELCOME_ONLY||c[0].startsWith('welcome-'))){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await send('Page.navigate',{url:base+path});
  for(let i=0;i<100;i++){if(await evaluate(`location.pathname===${JSON.stringify(path.split('?')[0])}&&!!document.querySelector('#main')`))break;await pause(50);}
  await evaluate(`(async()=>{const deadline=ms=>new Promise(r=>setTimeout(r,ms));await Promise.race([document.fonts.ready,deadline(3000)]);await Promise.race([Promise.all([...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{}))),deadline(6000)]);const hero=new Image();hero.src='/assets/melo/celebration-hero.png';await Promise.race([hero.decode(),deadline(5000)]);})()`);
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),name+' must fit viewport');
  const broken=await evaluate(`[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight&&!i.naturalWidth).map(i=>i.src)`);assert.deepEqual(broken,[],name+' visible images load');
  if(process.env.MELO_ARTWORK_ONLY){const insufficient=await evaluate(`[...document.images].filter(i=>i.src.includes('/assets/melo/')&&i.getBoundingClientRect().width>0&&i.getBoundingClientRect().top<innerHeight&&i.naturalWidth<i.getBoundingClientRect().width*2).map(i=>({src:i.src,pixels:i.naturalWidth,display:i.getBoundingClientRect().width}))`);assert.deepEqual(insufficient,[],name+' artwork has enough pixels for 2x-density cards');}
  const image=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(`test-artifacts/${name}.png`,Buffer.from(image.data,'base64'));console.log(name+' captured; visible artwork loaded; no horizontal overflow');
 }
 if(process.env.MELO_WELCOME_ONLY){
  assert.equal(await evaluate("!!document.querySelector('.auth-frame, .product-header, .product-footer')"),false,'Welcome has its own layout');
  assert.ok(await evaluate("document.querySelector('.welcome-start').href.endsWith('MEL-U-003')"),'Get Started opens onboarding');
  assert.ok(await evaluate("document.querySelector('.welcome-login').href.endsWith('MEL-U-005')"),'Login opens shared account login');
  assert.ok(await evaluate("document.querySelector('.welcome-new-account a').href.endsWith('MEL-U-007')"),'Create account opens registration');
  await evaluate("document.querySelector('.welcome-start').click()");
  let started=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-003')&&document.title.includes('Onboarding')")){started=true;break;}await pause(50);}
  assert.ok(started,'Get Started navigation succeeds');
  console.log('Welcome standalone layout, desktop/mobile artwork, signup/login destinations, and Get Started navigation passed.');
 }
 if(process.env.MELO_SPLASH_ONLY){
  assert.equal(await evaluate("!!document.querySelector('.product-header, .auth-frame, .product-footer')"),false,'Splash is a standalone screen');
  assert.ok(await evaluate("document.querySelector('.splash-skip').href.endsWith('MEL-U-002')"),'Skip opens welcome');
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-001'});
  let advanced=false;for(let i=0;i<150;i++){if(await evaluate("location.pathname.endsWith('MEL-U-002')&&!!document.querySelector('#main')")){advanced=true;break;}await pause(100);}
  assert.ok(advanced,'Normal splash advances to the welcome screen');
  console.log('Splash standalone layout, skip destination, stable preview, and automatic welcome transition passed.');
 }
 await send('Browser.close').catch(()=>{});
}finally{socket?.close();child.kill();}
