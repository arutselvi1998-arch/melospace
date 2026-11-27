import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import {userScreens,adminScreens} from '../ds6-data.js';

const base=process.env.MELO_TEST_URL||'http://localhost:3001';
const debugPort=9337;
const output=resolve('test-artifacts');
await mkdir(output,{recursive:true});
const browser=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',[
  '--headless=new',`--remote-debugging-port=${debugPort}`,`--user-data-dir=${resolve('.browser-profile')}`,
  '--no-first-run','--no-default-browser-check','--disable-extensions','--disable-background-networking','about:blank'
],{windowsHide:true,stdio:'ignore'});
let socket;
const errors=[];
const delay=n=>new Promise(r=>setTimeout(r,n));
try{
  let target;
  for(let i=0;i<100;i++){try{const pages=await(await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();target=pages.find(x=>x.type==='page');if(target)break;}catch{}await delay(200);}
  assert.ok(target,'Edge debugging target must be available');
  socket=new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((yes,no)=>{socket.addEventListener('open',yes,{once:true});socket.addEventListener('error',no,{once:true});});
  let id=0;const pending=new Map();
  socket.addEventListener('message',event=>{const msg=JSON.parse(event.data);if(msg.id){const p=pending.get(msg.id);pending.delete(msg.id);if(p){clearTimeout(p.timer);msg.error?p.no(new Error(JSON.stringify(msg.error))):p.yes(msg.result);}}else if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.exception?.description||msg.params.exceptionDetails.text);});
  function send(method,params={}){return new Promise((yes,no)=>{const key=++id;const timer=setTimeout(()=>{pending.delete(key);no(new Error(`Timed out: ${method}`));},15000);pending.set(key,{yes,no,timer});socket.send(JSON.stringify({id:key,method,params}));});}
  const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  async function waitFor(expression){for(let i=0;i<100;i++){try{if(await evaluate(expression))return;}catch{}await delay(50);}throw new Error(`Condition not met: ${expression}`);}
  async function navigate(path){await send('Page.navigate',{url:base+path});await waitFor(`location.pathname===${JSON.stringify(path.split('?')[0])} && !!document.querySelector('#main') && document.querySelector('#app')?.textContent.length>50`);}
  async function screen(n,admin=false,params=''){const code=`MEL-${admin?'A':'U'}-${String(n).padStart(3,'0')}`;await navigate(`/${admin?'admin':'customer'}/screens/${code}${params}`);await waitFor(`document.title.includes('Melo Space') && document.body.dataset.screen===${JSON.stringify(String(n))} && document.body.dataset.portal===${JSON.stringify(admin?'admin':'user')}`);}
  async function submit(action,values){await evaluate(`(()=>{const f=document.querySelector('form[data-action=${JSON.stringify(action)}]');if(!f)throw Error('Form not found');for(const [k,v] of Object.entries(${JSON.stringify(values)})){const el=f.elements.namedItem(k);if(!el)throw Error('Field '+k+' not found');if(el.type==='checkbox')el.checked=Boolean(v);else el.value=String(v);}if(f.dataset.action==='verify'&&f.querySelector('[data-otp-digit]')){const otp=f.elements.code.value;f.querySelectorAll('[data-otp-digit]').forEach((d,i)=>d.value=otp[i]||'');}f.requestSubmit();})()`);}
  async function waitScreen(n,admin=false){const code=`MEL-${admin?'A':'U'}-${String(n).padStart(3,'0')}`;await waitFor(`location.pathname.endsWith(${JSON.stringify(code)}) && !!document.querySelector('#main')`);}
  // This is the isolated test browser profile, never the user's browser storage.
  await navigate('/customer');
  await evaluate("localStorage.removeItem('melo-ds6-state')");
  await navigate('/customer');
  // Every named screen must render without an uncaught application exception.
  for(const s of userScreens)await screen(s.number);
  for(const s of adminScreens)await screen(s.number,true);
  console.log(`Rendered ${userScreens.length} user and ${adminScreens.length} admin screens.`);
  // Category create -> edit -> taxonomy -> user visibility -> hide, with persistence.
  await screen(12,true);await submit('category',{name:'Browser Test Category',description:'Created in automated browser verification',image:'',active:true});await waitScreen(11,true);
  let stored=await evaluate(`JSON.parse(localStorage.getItem('melo-ds6-state'))`);
  let cat=stored.categories.find(c=>c.name==='Browser Test Category');assert.ok(cat);
  await screen(12,true,`?category=${cat.id}`);await submit('category',{name:'Edited Browser Category',description:'Updated description',active:true});await waitScreen(11,true);
  await screen(13,true,`?category=${cat.id}`);await submit('taxonomy',{subcategories:'One, Two, One',tags:'Creative, Test'});
  stored=await evaluate(`JSON.parse(localStorage.getItem('melo-ds6-state'))`);cat=stored.categories.find(c=>c.id===cat.id);assert.deepEqual(cat.subcategories,['One','Two']);
  await screen(13);assert.ok(await evaluate(`document.querySelector('#main').textContent.includes('Edited Browser Category')`));
  await screen(14,false,`?category=${cat.id}`);assert.ok(await evaluate(`document.querySelector('#main').textContent.includes('Updated description') && document.querySelector('#main').textContent.includes('Creative')`));
  await screen(11,true);await evaluate(`document.querySelector('[data-toggle-category="${cat.id}"]').click()`);
  await screen(13);assert.equal(await evaluate(`document.querySelector('#main').textContent.includes('Edited Browser Category')`),false);
  console.log('Category create/edit, tag persistence, and cross-portal visibility passed.');
  // Simulated sign-in and OTP, then the standard booking flow.
  await screen(5);await submit('demo-login',{identifier:'browser-demo@example.com',password:'demo-pass-123'});await waitScreen(6);
  await submit('verify',{code:'000000'});assert.ok(await evaluate(`!document.querySelector('.form-error').hidden`));
  await submit('verify',{code:'123456'});await waitScreen(9);
  await screen(22,false,'?experience=art');await submit('date',{experience:'art',date:'2099-01-02',slot:'13:00'});await waitScreen(23);
  await screen(24);await submit('participants',{count:2,guests:'Demo One, Demo Two',adult:true});await waitScreen(25);
  await screen(27);await submit('checkout',{confirm:true});await waitScreen(28);
  stored=await evaluate(`JSON.parse(localStorage.getItem('melo-ds6-state'))`);let booking=stored.bookings.at(-1);assert.equal(booking.total,1300);assert.equal(booking.payment,'Not charged');
  await screen(32,false,`?booking=${booking.id}`);await submit('reschedule',{date:'2099-01-03',slot:'16:00'});await waitScreen(30);
  await screen(33,false,`?booking=${booking.id}`);await submit('cancel',{confirm:true});await waitScreen(30);
  stored=await evaluate(`JSON.parse(localStorage.getItem('melo-ds6-state'))`);assert.equal(stored.bookings.at(-1).status,'Cancelled');assert.equal(stored.bookings.at(-1).date,'2099-01-03');
  console.log('Demo sign-in/OTP, age gate, booking, reschedule, and cancellation passed.');
  // Private room selected options must survive all subsequent screens.
  await screen(38);await submit('room',{room:'lounge',count:3});await waitScreen(39);
  await submit('theme',{theme:'Starlit evening'});await waitScreen(40);
  await evaluate(`document.querySelector('input[name=decor][value=Flowers]').checked=true;document.querySelector('form[data-action=decor]').requestSubmit()`);await waitScreen(41);
  await screen(42,false,'?dress=evening');await submit('dress',{dress:'evening',size:'L'});await waitScreen(43);
  await submit('accessories',{note:'Sample setup'});await waitScreen(44);
  await submit('date',{experience:'dream',date:'2099-01-05',slot:'13:00'});await waitScreen(45);
  await screen(27);await submit('checkout',{confirm:true});await waitScreen(46);
  stored=await evaluate(`JSON.parse(localStorage.getItem('melo-ds6-state'))`);booking=stored.bookings.at(-1);assert.equal(booking.total,3150);assert.equal(booking.room,'lounge');assert.equal(booking.theme,'Starlit evening');assert.equal(booking.dress,'evening');assert.equal(booking.size,'L');
  console.log('Private-room customization and checkout passed.');
  // Small-screen layouts and focusable navigation.
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  for(const route of ['/customer','/admin/screens/MEL-A-011','/customer/screens/MEL-U-045']){await navigate(route);assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'),`No horizontal page overflow at ${route}`);}
  await screen(11,true);await evaluate(`document.querySelector('.product-footer .ds-menu').click()`);assert.equal(await evaluate(`document.querySelector('.product-footer .ds-menu').getAttribute('aria-expanded')`),'true');
  const screenshot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(resolve(output,'admin-mobile.png'),Buffer.from(screenshot.data,'base64'));
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await navigate('/customer');
  const desktop=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(resolve(output,'customer-desktop.png'),Buffer.from(desktop.data,'base64'));
  assert.deepEqual(errors,[],'No uncaught browser exceptions');
  console.log('Mobile overflow/menu checks and desktop screenshot passed. No uncaught browser errors.');
  await writeFile(resolve(output,'browser-results.txt'),'PASS: 74 screen renders; category CRUD/taxonomy/discovery; simulated OTP; booking/reschedule/cancel; private room customization; mobile overflow/menu; no uncaught exceptions.\n');
  await send('Browser.close').catch(()=>{});
}finally{socket?.close();browser.kill();}
