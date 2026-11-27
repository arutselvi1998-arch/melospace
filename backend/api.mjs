import {DatabaseSync} from 'node:sqlite';
import {randomBytes,randomUUID,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
import {mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {initialState,registrationErrors,makeBooking,bookingErrors,profileCompletionErrors,interestSelectionErrors} from '../ds6-data.js';
const hash=value=>createHash('sha256').update(value).digest('hex');
const passwordHash=password=>{const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');};
const passwordMatches=(password,stored)=>{const [salt,key]=stored.split(':');return timingSafeEqual(Buffer.from(key,'hex'),scryptSync(password,salt,64));};
export function createBackend({databasePath,adminEmail,adminPassword,secureCookies=false}={}){
  if(databasePath!==':memory:')mkdirSync(dirname(databasePath),{recursive:true});
  const db=new DatabaseSync(databasePath);db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;');
  db.exec(`CREATE TABLE IF NOT EXISTS customers(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,mobile TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL,profile TEXT NOT NULL,created_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,customer_id TEXT REFERENCES customers(id) ON DELETE CASCADE,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS bookings(id TEXT PRIMARY KEY,customer_id TEXT REFERENCES customers(id),data TEXT NOT NULL);`);
  if(adminEmail&&adminPassword){if(adminPassword.length<12)throw Error('Admin password must contain at least 12 characters.');const email=adminEmail.toLowerCase().trim();if(!db.prepare('SELECT id FROM customers WHERE email=?').get(email))db.prepare('INSERT INTO customers VALUES(?,?,?,?,?,?,?)').run(randomUUID(),email,'',passwordHash(adminPassword),'admin',JSON.stringify({name:'Melo Space Admin'}),new Date().toISOString());}
  const attempts=new Map();
  const fail=(status,message)=>{throw Object.assign(new Error(message),{status});};
  const publicCustomer=row=>({id:row.id,customerId:row.id,email:row.email,mobile:row.mobile,role:row.role,...JSON.parse(row.profile),createdAt:row.created_at});
  const cookie=(value,age)=>`melo_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}${secureCookies?'; Secure':''}`;
  function session(req){const token=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('melo_session='))?.slice(13);if(!token)return null;return db.prepare('SELECT c.* FROM customers c JOIN sessions s ON s.customer_id=c.id WHERE s.token=? AND s.expires>?').get(hash(token),Date.now());}
  function authenticate(req,role){const user=session(req);if(!user)fail(401,'Please sign in.');if(role&&user.role!==role)fail(403,'Administrator access required.');return user;}
  function startSession(res,id){const token=randomBytes(32).toString('hex');db.prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(hash(token),id,Date.now()+86400000);res.setHeader('Set-Cookie',cookie(token,86400));}
  async function body(req){let value='';for await(const chunk of req){value+=chunk;if(Buffer.byteLength(value)>3000000)fail(413,'Request too large.');}try{const parsed=JSON.parse(value||'{}');if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))fail(400,'Use a JSON object.');return parsed;}catch{fail(400,'Invalid JSON object.');}}
  const reply=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
  async function handle(req,res){const path=new URL(req.url,'http://localhost').pathname;if(!path.startsWith('/api/'))return false;
    try{
      if(!['GET','HEAD'].includes(req.method)){const origin=req.headers.origin;const expected=`${secureCookies?'https':'http'}://${req.headers.host}`;if(origin&&origin!==expected)fail(403,'Cross-origin request rejected.');if(req.headers['sec-fetch-site']==='cross-site')fail(403,'Cross-origin request rejected.');if(!String(req.headers['content-type']||'').startsWith('application/json'))fail(415,'Use application/json.');}
      if(path==='/api/health'&&req.method==='GET'){reply(res,200,{status:'ok',storage:'sqlite'});return true;}
      if(['/api/auth/register','/api/auth/login'].includes(path)&&req.method==='POST'){
        const key=req.socket.remoteAddress||'local';const previous=attempts.get(key);const entry=previous&&previous.until>Date.now()?previous:{count:0,until:Date.now()+60000};attempts.set(key,entry);if(++entry.count>20)fail(429,'Too many attempts. Try again in a minute.');const data=await body(req);
        if(typeof data.password!=='string'||data.password.length>120)fail(400,'Enter a password of at most 120 characters.');let user;
        if(path.endsWith('register')){
          if(['name','email','mobile','birthDate','confirmPassword'].some(key=>typeof data[key]!=='string')||data.terms!==true)fail(400,'Complete the required registration fields and accept the terms.');const errors=registrationErrors({...data,role:'user'});if(data.password.length<8)errors.push('Use at least eight characters for your password.');if(errors.length)fail(400,errors.join(' '));const email=data.email.trim().toLowerCase();if(db.prepare('SELECT id FROM customers WHERE email=?').get(email))fail(409,'An account already uses this email.');
          const id=randomUUID();const profile={name:data.name.trim(),birthDate:data.birthDate,adult:true,interests:[]};db.prepare('INSERT INTO customers VALUES(?,?,?,?,?,?,?)').run(id,email,data.mobile.trim(),passwordHash(data.password),'user',JSON.stringify(profile),new Date().toISOString());user=db.prepare('SELECT * FROM customers WHERE id=?').get(id);
        }else{const identifier=String(data.identifier||'').trim().toLowerCase();user=db.prepare('SELECT * FROM customers WHERE email=?').get(identifier);const stored=user?.password||'00000000000000000000000000000000:'+scryptSync('invalid','00000000000000000000000000000000',64).toString('hex');const matches=passwordMatches(data.password,stored);if(!user||!matches)fail(401,'Email or password is incorrect.');}
        startSession(res,user.id);reply(res,200,{customer:publicCustomer(user)});return true;
      }
      if(path==='/api/auth/logout'&&req.method==='POST'){const token=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('melo_session='))?.slice(13);if(token)db.prepare('DELETE FROM sessions WHERE token=?').run(hash(token));res.setHeader('Set-Cookie',cookie('',0));reply(res,200,{ok:true});return true;}
      if(path==='/api/me'&&req.method==='GET'){reply(res,200,{customer:publicCustomer(authenticate(req))});return true;}
      if(path==='/api/me'&&req.method==='PATCH'){const user=authenticate(req);const data=await body(req);const profile=JSON.parse(user.profile);for(const key of ['name','birthDate','gender','city','country','bio','photo','interests'])if(data[key]!==undefined)profile[key]=data[key];const errors=user.role==='admin'?(!String(profile.name||'').trim()?['Enter a name.']:[]):profileCompletionErrors(profile,initialState().categories);errors.push(...interestSelectionErrors(profile.interests||[],initialState().categories));if(errors.length)fail(400,errors.join(' '));db.prepare('UPDATE customers SET profile=? WHERE id=?').run(JSON.stringify(profile),user.id);reply(res,200,{customer:publicCustomer(db.prepare('SELECT * FROM customers WHERE id=?').get(user.id))});return true;}
      if(path==='/api/admin/customers'&&req.method==='GET'){authenticate(req,'admin');reply(res,200,{customers:db.prepare("SELECT * FROM customers WHERE role='user' ORDER BY created_at DESC").all().map(publicCustomer)});return true;}
      if(path==='/api/bookings'&&req.method==='GET'){const user=authenticate(req);const rows=user.role==='admin'?db.prepare('SELECT data FROM bookings').all():db.prepare('SELECT data FROM bookings WHERE customer_id=?').all(user.id);reply(res,200,{bookings:rows.map(r=>JSON.parse(r.data))});return true;}
      if(path==='/api/bookings'&&req.method==='POST'){const user=authenticate(req);const input=await body(req);const base=initialState().draft;const draft=Object.fromEntries(Object.keys(base).map(key=>[key,input[key]??base[key]]));if(!Array.isArray(draft.decor)||!Array.isArray(draft.accessories)||typeof draft.guests!=='string')fail(400,'Invalid booking details.');const state=initialState();state.profile=JSON.parse(user.profile);const errors=bookingErrors(draft,state);if(errors.length)fail(400,errors.join(' '));const booking=makeBooking(draft,state,'MELO-'+randomUUID().slice(0,8).toUpperCase());booking.customerId=user.id;db.prepare('INSERT INTO bookings VALUES(?,?,?)').run(booking.id,user.id,JSON.stringify(booking));reply(res,201,{booking});return true;}
      const match=path.match(/^\/api\/bookings\/([^/]+)\/(cancel|reschedule)$/);
      if(match&&req.method==='POST'){const user=authenticate(req);const row=db.prepare('SELECT * FROM bookings WHERE id=? AND customer_id=?').get(match[1],user.id);if(!row)fail(404,'Booking not found.');const booking=JSON.parse(row.data);if(booking.status==='Cancelled')fail(409,'This booking is already cancelled.');const data=await body(req);if(match[2]==='cancel'){if(data.confirm!==true)fail(400,'Confirm cancellation.');booking.status='Cancelled';booking.cancelledAt=new Date().toISOString();}else{const changed={...booking,date:data.date,slot:data.slot};const state=initialState();state.profile=JSON.parse(user.profile);const errors=bookingErrors(changed,state);if(errors.length)fail(400,errors.join(' '));booking.date=changed.date;booking.slot=changed.slot;}db.prepare('UPDATE bookings SET data=? WHERE id=?').run(JSON.stringify(booking),booking.id);reply(res,200,{booking});return true;}
      fail(404,'API route not found.');
    }catch(error){reply(res,error.status||500,{error:error.status?error.message:'Unable to complete this request.'});}return true;
  }
  return {handle,close:()=>db.close()};
}
