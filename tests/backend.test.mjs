import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createBackend} from '../backend/api.mjs';
import {initialState,today} from '../ds6-data.js';
test('backend persists customers and bookings and enforces sessions and roles',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'melo-api-'));const databasePath=join(directory,'test.sqlite');let api,server;
 const start=async()=>{api=createBackend({databasePath,adminEmail:'admin@example.com',adminPassword:'AdminTest12345!'});server=http.createServer(async(req,res)=>{if(!await api.handle(req,res)){res.writeHead(404);res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));};
 const stop=async()=>{await new Promise(r=>server.close(r));api.close();};
 let cookie='';const request=async(path,method='GET',data,credentials=cookie)=>{const response=await fetch('http://127.0.0.1:'+server.address().port+'/api'+path,{method,headers:{...(data?{'Content-Type':'application/json'}:{}),...(credentials?{Cookie:credentials}:{})},body:data?JSON.stringify(data):undefined});return {status:response.status,data:await response.json(),cookie:response.headers.get('set-cookie')?.split(';')[0]};};
 try{
 await start();assert.equal((await request('/admin/customers')).status,401);
 const fields={name:'Customer One',email:'one@example.com',mobile:'1234567890',birthDate:'1995-01-01',password:'Customer123!',confirmPassword:'Customer123!',terms:true};
 const first=await request('/auth/register','POST',fields);assert.equal(first.status,200);cookie=first.cookie;assert.ok(cookie);assert.equal(first.data.customer.password,undefined);const firstCookie=cookie;
 assert.equal((await request('/admin/customers')).status,403);
 assert.equal((await request('/auth/register','POST',fields)).status,409);
 const profile=await request('/me','PATCH',{name:'Updated Customer',city:'Chennai',country:'India',interests:['art']});assert.equal(profile.status,200);
 const future=new Date(Date.now()+86400000*2).toISOString().slice(0,10);const draft={...initialState().draft,date:future,count:1};const created=await request('/bookings','POST',{...draft,id:'client-chosen-id',total:1,status:'Paid'});assert.equal(created.status,201);assert.notEqual(created.data.booking.total,1);assert.notEqual(created.data.booking.id,'client-chosen-id');assert.equal(created.data.booking.payment,'Not charged');const id=created.data.booking.id;
 const second=await request('/auth/register','POST',{...fields,email:'two@example.com'});assert.equal(second.status,200);cookie=second.cookie;assert.equal((await request('/bookings')).data.bookings.length,0);assert.equal((await request('/bookings/'+id+'/cancel','POST',{confirm:true})).status,404);
 cookie=firstCookie;assert.equal((await request('/bookings/'+id+'/cancel','POST',{confirm:true})).data.booking.status,'Cancelled');assert.equal((await request('/bookings/'+id+'/reschedule','POST',{date:today(),slot:'13:00'})).status,409);
 await stop();await start();assert.equal((await request('/bookings')).data.bookings[0].status,'Cancelled');assert.equal((await request('/me')).data.customer.city,'Chennai');
 const admin=await request('/auth/login','POST',{identifier:'admin@example.com',password:'AdminTest12345!'});assert.equal(admin.status,200);const customers=await request('/admin/customers','GET',undefined,admin.cookie);assert.equal(customers.data.customers.length,2);assert.ok(customers.data.customers.every(c=>!('password' in c)));
 const originResponse=await fetch('http://127.0.0.1:'+server.address().port+'/api/auth/logout',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://untrusted.example',Cookie:cookie},body:'{}'});assert.equal(originResponse.status,403);
 await request('/auth/logout','POST',{});assert.equal((await request('/me')).status,401);assert.equal((await request('/auth/login','POST',{identifier:fields.email,password:'wrong'})).status,401);
 }finally{if(server?.listening)await stop();await rm(directory,{recursive:true,force:true});}
});
