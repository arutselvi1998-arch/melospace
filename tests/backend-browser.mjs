import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const profile=resolve('.browser-profile-visual-backend-'+process.pid);
const child=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',['--headless=new','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--disable-extensions','about:blank'],{windowsHide:true,stdio:'ignore'});
let socket;
try{
 let port;for(let i=0;i<70;i++){try{port=Number((await readFile(resolve(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]);if(port)break;}catch{}await pause(100);}assert.ok(port,'Browser debugging port available');
 const targets=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();const target=targets.find(t=>t.type==='page');socket=new WebSocket(target.webSocketDebuggerUrl);await new Promise((yes,no)=>{socket.addEventListener('open',yes,{once:true});socket.addEventListener('error',no,{once:true});});let id=0;const calls=new Map();socket.addEventListener('message',event=>{const msg=JSON.parse(event.data);if(msg.id){const c=calls.get(msg.id);if(c){clearTimeout(c.timer);calls.delete(msg.id);msg.error?c.no(Error(msg.error.message)):c.yes(msg.result);}}});
 const send=(method,params={})=>new Promise((yes,no)=>{const key=++id;const timer=setTimeout(()=>{calls.delete(key);no(Error('Browser timed out: '+method));},8000);calls.set(key,{yes,no,timer});socket.send(JSON.stringify({id:key,method,params}));});
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.text);return result.result.value;};
 await send('Page.enable');await send('Runtime.enable');
 const visit=async path=>{await send('Page.navigate',{url:'http://127.0.0.1:3001'+path});for(let i=0;i<80;i++){if(await evaluate("!!document.querySelector('#main')"))return;await pause(100);}throw Error('Page did not render');};
 await visit('/admin');assert.equal(await evaluate("!!document.querySelector('form[data-action=demo-login] input[name=password]')"),true,'Admin uses password login');
 const credentials={identifier:process.env.MELO_ADMIN_EMAIL,password:process.env.MELO_ADMIN_PASSWORD};
 await evaluate('(()=>{const data='+JSON.stringify(credentials)+';const form=document.querySelector("form[data-action=demo-login]");form.elements.name.value=data.identifier;form.elements.password.value=data.password;form.requestSubmit();})()');
 for(let i=0;i<80;i++){if(await evaluate("location.pathname.endsWith('MEL-A-006')&&!!document.querySelector('.product-admin-sidebar')"))break;await pause(100);}
 assert.ok(await evaluate("location.pathname.endsWith('MEL-A-006')"),'Admin sign-in reaches dashboard');
 await visit('/admin/screens/MEL-A-009');assert.ok(await evaluate("!!document.querySelector('.customer-records')"),'Customer records page renders');
 await evaluate("fetch('/api/auth/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})");
 await visit('/customer/screens/MEL-U-007');assert.ok(await evaluate("!!document.querySelector('.register-form')"),'Customer signup renders');assert.ok(await evaluate("document.querySelector('input[name=password]').minLength===8"),'Signup uses eight character minimum');
 console.log('Browser: protected admin login, dashboard, customer records, logout, and signup rendering passed.');
}finally{socket?.close();child.kill();}
