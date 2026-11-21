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
 for(const [name,path,width,height]of [['home-document','/customer',1440,1050],['admin-document','/admin',1440,1050],['category-document','/admin/screens/MEL-A-011',1440,1050],['editor-document','/admin/screens/MEL-A-012',1440,1050],['taxonomy-document','/admin/screens/MEL-A-013',1440,1050],['login-document','/customer/screens/MEL-U-005',1440,1050],['home-mobile-document','/customer',390,844],['splash-desktop','/customer/screens/MEL-U-001?preview=1',1440,900],['splash-mobile','/customer/screens/MEL-U-001?preview=1',390,844],['welcome-desktop','/customer/screens/MEL-U-002',1440,900],['welcome-mobile','/customer/screens/MEL-U-002',390,844],['onboarding-desktop','/customer/screens/MEL-U-003',1440,900],['onboarding-mobile','/customer/screens/MEL-U-003',390,844],['role-desktop','/customer/screens/MEL-U-004',1440,900],['role-mobile','/customer/screens/MEL-U-004',390,844],['login-mobile','/customer/screens/MEL-U-005',390,844],['otp-desktop','/customer/screens/MEL-U-006',1440,900],['otp-mobile','/customer/screens/MEL-U-006',390,844],['register-desktop','/customer/screens/MEL-U-007',1440,900],['register-mobile','/customer/screens/MEL-U-007',390,844]].filter(c=>!process.env.MELO_MOBILE_ONLY||c[2]<600).filter(c=>!process.env.MELO_ARTWORK_ONLY||['home-document','category-document','home-mobile-document'].includes(c[0])).filter(c=>!process.env.MELO_SPLASH_ONLY||c[0].startsWith('splash-')).filter(c=>!process.env.MELO_WELCOME_ONLY||c[0].startsWith('welcome-')).filter(c=>!process.env.MELO_ONBOARD_ONLY||c[0].startsWith('onboarding-')).filter(c=>!process.env.MELO_ROLE_ONLY||c[0].startsWith('role-')).filter(c=>!process.env.MELO_LOGIN_ONLY||c[0].startsWith('login-')).filter(c=>!process.env.MELO_OTP_ONLY||c[0].startsWith('otp-')).filter(c=>!process.env.MELO_REGISTER_ONLY||c[0].startsWith('register-'))){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<600});await send('Page.navigate',{url:base+path});
  for(let i=0;i<100;i++){if(await evaluate(`location.pathname===${JSON.stringify(path.split('?')[0])}&&!!document.querySelector('#main')`))break;await pause(50);}
  await evaluate(`(async()=>{const deadline=ms=>new Promise(r=>setTimeout(r,ms));await Promise.race([document.fonts.ready,deadline(3000)]);await Promise.race([Promise.all([...document.images].filter(i=>i.getBoundingClientRect().width>0&&i.getBoundingClientRect().top<innerHeight).map(i=>i.decode().catch(()=>{}))),deadline(6000)]);const hero=new Image();hero.src='/assets/melo/celebration-hero.png';await Promise.race([hero.decode(),deadline(5000)]);})()`);
  assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),name+' must fit viewport');
  const broken=await evaluate(`[...document.images].filter(i=>i.getBoundingClientRect().width>0&&i.getBoundingClientRect().top<innerHeight&&!i.naturalWidth).map(i=>i.src)`);assert.deepEqual(broken,[],name+' visible images load');
  if(process.env.MELO_ONBOARD_ONLY)assert.equal(await evaluate("[...document.querySelectorAll('[data-onboard-card]')].filter(c=>!c.hidden).length"),width<641?1:3,'Correct visible card count');
  if(process.env.MELO_ARTWORK_ONLY){const insufficient=await evaluate(`[...document.images].filter(i=>i.src.includes('/assets/melo/')&&i.getBoundingClientRect().width>0&&i.getBoundingClientRect().top<innerHeight&&i.naturalWidth<i.getBoundingClientRect().width*2).map(i=>({src:i.src,pixels:i.naturalWidth,display:i.getBoundingClientRect().width}))`);assert.deepEqual(insufficient,[],name+' artwork has enough pixels for 2x-density cards');}
  const image=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(`test-artifacts/${name}.png`,Buffer.from(image.data,'base64'));console.log(name+' captured; visible artwork loaded; no horizontal overflow');
 }
 if(process.env.MELO_REGISTER_ONLY){
  const fillRegister=async(values,submit=false)=>evaluate(`(()=>{const f=document.querySelector('.register-form');for(const [key,value] of Object.entries(${JSON.stringify(values)})){const el=f.elements.namedItem(key);if(el.type==='checkbox')el.checked=value;else el.value=String(value);}if(${submit})f.requestSubmit();})()`);
  assert.equal(await evaluate("!!document.querySelector('.auth-frame, .product-header, .product-footer')"),false,'Registration has its own reference layout');
  assert.equal(await evaluate("document.querySelectorAll('.register-fields input').length"),6);
  assert.ok(await evaluate("document.querySelector('.register-login-link a').href.endsWith('MEL-U-005')"),'Login destination');
  assert.ok(await evaluate("document.querySelector('.register-terms a').href.includes('MEL-U-065')&&document.querySelector('.register-terms a').target==='_blank'"),'Policy links preserve the form in another tab');
  await evaluate("document.querySelector('.register-form').requestSubmit()");
  assert.equal(await evaluate("document.querySelector('.form-error').hidden"),false,'Empty registration is rejected');
  const sample={name:'Registration Demo',email:'registration-demo@example.com',mobile:'+12025550147',birthDate:'1995-06-15',password:'SampleSecret987!',confirmPassword:'DifferentSecret987!',terms:false};
  await fillRegister(sample,true);
  assert.ok(await evaluate("document.querySelector('.form-error').textContent.includes('do not match')&&document.querySelector('.form-error').textContent.includes('Accept')"),'Password mismatch and terms are validated');
  await evaluate("document.querySelector('[data-register-password=password]').click();document.querySelector('[data-register-password=confirmPassword]').click()");
  assert.equal(await evaluate("document.querySelector('input[name=password]').type"),'text');
  assert.equal(await evaluate("document.querySelector('input[name=confirmPassword]').type"),'text');
  await evaluate("document.querySelector('[data-register-password=password]').click();document.querySelector('[data-register-password=confirmPassword]').click()");
  assert.equal(await evaluate("document.querySelector('input[name=password]').type"),'password');
  await fillRegister({confirmPassword:sample.password,terms:true});
  await evaluate("(()=>{const f=document.querySelector('.register-form');const day=new Date(f.elements.birthDate.max+'T00:00:00Z');day.setUTCDate(day.getUTCDate()+1);f.elements.birthDate.value=day.toISOString().slice(0,10);f.requestSubmit();})()");
  assert.ok(await evaluate("document.querySelector('.form-error').textContent.includes('18')"),'Under-18 date is rejected');
  await evaluate("document.querySelector('[data-register-provider=Google]').click()");
  assert.ok(await evaluate("document.querySelector('[data-register-feedback]').textContent.includes('not connected')"),'Social signup feedback is honest');
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-004'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('[data-role-selection]')"))break;await pause(50);}
  await evaluate("document.querySelector('[data-role-card=host]').click();document.querySelector('.role-form').requestSubmit()");
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('.login-access-tabs')"))break;await pause(50);}
  await evaluate("document.querySelector('.login-access-tabs a:last-child').click()");
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('.register-form')"))break;await pause(50);}
  assert.equal(await evaluate("document.querySelector('input[name=role]').value"),'host','Signup retains the chosen Host role');
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-007?returnTo=27'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('.register-form')"))break;await pause(50);}
  assert.ok(await evaluate("document.querySelector('.register-login-link a').href.includes('returnTo=27')"),'Login retains booking context');
  await fillRegister({...sample,confirmPassword:sample.password,terms:true},true);
  let created=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-008')&&!!document.querySelector('#main')")){created=true;break;}await pause(50);}
  assert.ok(created,'Valid demo registration opens eligibility');
  assert.equal(await evaluate("new URLSearchParams(location.search).get('returnTo')"),'27');
  const saved=await evaluate("JSON.parse(localStorage.getItem('melo-ds6-state'))");
  assert.equal(saved.profile.name,'Registration Demo');assert.equal(saved.role,'host');assert.equal(saved.profile.adult,false);assert.equal(saved.demoSession,false);
  const serialized=JSON.stringify(saved);for(const sensitive of [sample.email,sample.mobile,sample.birthDate,sample.password])assert.equal(serialized.includes(sensitive),false,'Registration does not persist '+sensitive);
  console.log('Registration responsive layout, required fields, 18+ validation, confirmation, terms, visibility controls, provider feedback, Host signup flow, eligibility navigation, booking context and privacy passed.');
 }
 if(process.env.MELO_OTP_ONLY){
  assert.equal(await evaluate("!!document.querySelector('.auth-frame, .product-header, .product-footer')"),false,'OTP has its own reference layout');
  assert.equal(await evaluate("document.querySelectorAll('[data-otp-digit]').length"),6);
  assert.ok(await evaluate("document.querySelector('.otp-change-number').href.endsWith('MEL-U-005')"),'Change Number opens login');
  await evaluate("document.querySelector('.otp-form').requestSubmit()");
  assert.equal(await evaluate("document.querySelector('.form-error').hidden"),false,'Incomplete code is rejected');
  await evaluate("document.querySelector('[data-otp-digit=\"0\"]').focus()");
  await send('Input.insertText',{text:'1'});
  assert.equal(await evaluate("document.activeElement.id"),'otp-digit-2','Typing advances focus');
  await send('Input.insertText',{text:'2'});
  assert.equal(await evaluate("document.activeElement.id"),'otp-digit-3');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Backspace',code:'Backspace',windowsVirtualKeyCode:8});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Backspace',code:'Backspace',windowsVirtualKeyCode:8});
  assert.equal(await evaluate("document.activeElement.id"),'otp-digit-2','Backspace returns to prior digit');
  assert.equal(await evaluate("document.querySelector('#otp-digit-2').value"),'');
  await evaluate("(()=>{const dt=new DataTransfer();dt.setData('text','000000');document.querySelector('#otp-digit-1').dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));document.querySelector('.otp-form').requestSubmit();})()");
  assert.ok(await evaluate("document.querySelector('.form-error').textContent.includes('123456')"),'Wrong code is rejected');
  assert.equal(await evaluate("document.querySelector('[data-otp-resend]').disabled"),true,'Resend cooldown starts disabled');
  await evaluate("window.__otpOriginalNow=Date.now;Date.now=()=>window.__otpOriginalNow()+31000");
  await pause(1150);
  assert.equal(await evaluate("document.querySelector('[data-otp-resend]').disabled"),false,'Resend enables when cooldown elapses');
  await evaluate("document.querySelector('[data-otp-resend]').click()");
  assert.equal(await evaluate("document.querySelector('input[name=code]').value"),'','Resend clears code');
  assert.equal(await evaluate("document.querySelector('[data-otp-resend]').disabled"),true,'Resend restarts cooldown');
  assert.ok(await evaluate("document.querySelector('[data-otp-feedback]').textContent.includes('No message was sent')"),'Resend is explicitly simulated');
  await evaluate("(()=>{const dt=new DataTransfer();dt.setData('text','123456');document.querySelector('#otp-digit-1').dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,bubbles:true,cancelable:true}));})()");
  assert.equal(await evaluate("document.querySelector('input[name=code]').value"),'123456','Paste fills all boxes');
  await evaluate("document.querySelector('.otp-form').requestSubmit()");
  let complete=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-008')&&!!document.querySelector('#main')")){complete=true;break;}await pause(50);}
  assert.ok(complete,'Correct demo code opens eligibility');
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('melo-ds6-state')).demoSession"),true);
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-006?returnTo=27'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('[data-otp-screen]')"))break;await pause(50);}
  assert.ok(await evaluate("document.querySelector('.otp-change-number').href.includes('returnTo=27')"),'Change Number retains booking context');
  await evaluate("(()=>{document.querySelectorAll('[data-otp-digit]').forEach((d,i)=>d.value=String(i+1));document.querySelector('.otp-form').requestSubmit();})()");
  let returned=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-027')&&!!document.querySelector('#main')")){returned=true;break;}await pause(50);}
  assert.ok(returned,'Verification returns to booking checkout');
  console.log('OTP responsive layout, incomplete/wrong codes, auto-focus, Backspace, paste, resend cooldown/reset, demo verification, and booking return context passed.');
 }
 if(process.env.MELO_LOGIN_ONLY){
  assert.equal(await evaluate("!!document.querySelector('.auth-frame, .product-header, .product-footer')"),false,'Login has its own reference layout');
  assert.ok(await evaluate("document.querySelector('.login-access-tabs a:last-child').href.endsWith('MEL-U-007')"),'Sign Up opens create account');
  assert.ok(await evaluate("document.querySelector('.login-create-account a').href.endsWith('MEL-U-007')"),'Create account destination');
  await evaluate("document.querySelector('input[name=password]').value='sample-pass-123';document.querySelector('[data-password-toggle]').click()");
  assert.equal(await evaluate("document.querySelector('input[name=password]').type"),'text');
  assert.equal(await evaluate("document.querySelector('[data-password-toggle]').getAttribute('aria-label')"),'Hide password');
  await evaluate("document.querySelector('[data-password-toggle]').click()");
  assert.equal(await evaluate("document.querySelector('input[name=password]').type"),'password');
  await evaluate("document.querySelector('[data-open-recovery]').click()");
  assert.equal(await evaluate("document.querySelector('.login-recovery').open"),true);
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape'});
  assert.equal(await evaluate("document.querySelector('.login-recovery').open"),false,'Recovery dialog supports Escape');
  assert.ok(await evaluate("document.activeElement.matches('[data-open-recovery]')"),'Recovery restores focus');
  await evaluate("document.querySelector('[data-provider=Google]').click()");
  assert.ok(await evaluate("document.querySelector('[data-provider-feedback]').textContent.includes('not connected')"),'Social provider has honest local feedback');
  await evaluate("document.querySelector('input[name=identifier]').value='invalid';document.querySelector('.login-form').requestSubmit()");
  assert.equal(await evaluate("document.querySelector('.form-error').hidden"),false,'Invalid identifier is rejected');
  assert.ok(await evaluate("location.pathname.endsWith('MEL-U-005')"));
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-005?returnTo=27'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('.login-form')"))break;await pause(50);}
  assert.ok(await evaluate("document.querySelector('.login-access-tabs a.is-current').href.includes('returnTo=27')"),'Current login link retains booking destination');
  await evaluate("(()=>{const f=document.querySelector('.login-form');f.elements.identifier.value='privacy-check@example.com';f.elements.password.value='SecretSample987!';f.elements.role.value='host';f.elements.remember.checked=true;f.requestSubmit();})()");
  let verified=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-006')&&!!document.querySelector('#main')")){verified=true;break;}await pause(50);}
  assert.ok(verified,'Demo login opens verification');
  assert.equal(await evaluate("new URLSearchParams(location.search).get('returnTo')"),'27','Booking return context retained');
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('melo-ds6-state')).role"),'host');
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('melo-ds6-state')).preferences.rememberDemoLogin"),true);
  assert.equal(await evaluate("localStorage.getItem('melo-ds6-state').includes('privacy-check@example.com')||localStorage.getItem('melo-ds6-state').includes('SecretSample987!')"),false,'Credentials are not stored');
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-005'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('.login-form')"))break;await pause(50);}
  assert.equal(await evaluate("document.querySelector('input[name=remember]').checked"),true,'Demo remember preference persists');
  assert.equal(await evaluate("document.querySelector('input[name=password]').value"),'','Password is not repopulated');
  assert.equal(await evaluate("document.querySelector('input[name=identifier]').value"),'','Identifier is not repopulated');
  console.log('Login responsive layout, password toggle, recovery/focus, provider feedback, validation, OTP transition, booking context, role, remember preference, and credential privacy passed.');
 }
 if(process.env.MELO_ROLE_ONLY){
  assert.equal(await evaluate("!!document.querySelector('.auth-frame, .product-header, .product-footer')"),false,'Role selection is standalone');
  assert.ok(await evaluate("document.querySelector('.role-back').href.endsWith('MEL-U-003')"),'Back opens onboarding');
  await evaluate("document.querySelector('input[name=role][value=user]').focus()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight'});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowRight',code:'ArrowRight'});
  assert.equal(await evaluate("document.querySelector('input[name=role]:checked').value"),'host','Keyboard selects Host');
  assert.ok(await evaluate("document.querySelector('[data-role-card=host]').classList.contains('is-selected')"),'Host selected styling updates');
  await evaluate("document.querySelector('.role-form').requestSubmit()");
  let opened=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-005')&&!!document.querySelector('form[data-action=demo-login]')")){opened=true;break;}await pause(50);}
  assert.ok(opened,'Host continues to shared login');
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('melo-ds6-state')).role"),'host');
  assert.equal(await evaluate("document.querySelector('input[name=role]').value"),'host','Login retains Host role');
  await send('Page.navigate',{url:base+'/customer/screens/MEL-U-004'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('[data-role-selection]')"))break;await pause(50);}
  assert.equal(await evaluate("document.querySelector('input[name=role]:checked').value"),'host','Selection persists on return');
  await evaluate("document.querySelector('[data-role-card=user]').click()");
  assert.equal(await evaluate("document.querySelectorAll('input[name=role]:checked').length"),1,'Only one role selected');
  assert.ok(await evaluate("document.querySelector('[data-role-card=user]').classList.contains('is-selected')"),'Whole card is clickable');
  await evaluate("document.querySelector('.role-form').requestSubmit()");
  let userOpened=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-005')&&!!document.querySelector('form[data-action=demo-login]')")){userOpened=true;break;}await pause(50);}
  assert.ok(userOpened,'User continues to shared login');
  assert.equal(await evaluate("JSON.parse(localStorage.getItem('melo-ds6-state')).role"),'user');
  assert.equal(await evaluate("document.querySelector('input[name=role]').value"),'user');
  console.log('Role-selection desktop/mobile layout, keyboard, whole-card selection, single choice, persistence, and both shared-login flows passed.');
 }
 if(process.env.MELO_ONBOARD_ONLY){
  assert.equal(await evaluate("!!document.querySelector('.auth-frame, .product-header, .product-footer')"),false,'Onboarding is standalone');
  assert.ok(await evaluate("document.querySelector('.onboard-skip').href.endsWith('MEL-U-004')"),'Skip opens role selection');
  await evaluate("document.querySelector('[data-onboard-next]').click()");
  assert.equal(await evaluate("document.querySelector('[data-onboarding]').dataset.step"),'1');
  assert.ok(await evaluate("document.querySelector('[data-onboard-dot=\"1\"]').getAttribute('aria-pressed')==='true'"));
  await evaluate("document.querySelector('[data-onboard-next]').focus()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft'});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowLeft',code:'ArrowLeft'});
  assert.equal(await evaluate("document.querySelector('[data-onboarding]').dataset.step"),'0','Keyboard goes back');
  await evaluate("(()=>{const s=document.querySelector('.onboard-cards');s.dispatchEvent(new PointerEvent('pointerdown',{pointerType:'touch',clientX:220,clientY:200}));s.dispatchEvent(new PointerEvent('pointerup',{pointerType:'touch',clientX:110,clientY:210}));})()");
  assert.equal(await evaluate("document.querySelector('[data-onboarding]').dataset.step"),'1','Swipe advances');
  await evaluate("document.querySelector('[data-onboard-dot=\"2\"]').click()");
  assert.equal(await evaluate("document.querySelector('[data-onboard-next]').textContent"),'Get Started');
  await evaluate("document.querySelector('[data-onboard-next]').click()");
  let finished=false;for(let i=0;i<100;i++){if(await evaluate("location.pathname.endsWith('MEL-U-004')&&!!document.querySelector('#main')")){finished=true;break;}await pause(50);}
  assert.ok(finished,'Last slide continues to role selection');
  console.log('Onboarding responsive card counts, Next/dots, keyboard, swipe, Skip destination, and completion navigation passed.');
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
