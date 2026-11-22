export const userGroups = [
  ['Authentication & Onboarding',1,['Splash Screen','Welcome / Get Started','Onboarding','Role Selection — User / Host','Login / Sign Up','OTP Verification','Create Account','Age Eligibility — 18+','Complete Profile','Select Interests']],
  ['Home & Experience Discovery',11,['Home Dashboard','Explore Experiences','Experience Categories','Category Details','Search Results','Experience Details','Experience Gallery','Host / Facilitator Profile','Venue Details','Wishlist','Recently Viewed']],
  ['Experience Booking',22,['Availability Calendar','Session Details','Select Participants','Booking Summary','Offers & Coupons','Checkout & Payment','Booking Confirmation','My Bookings','Booking Details','Digital Entry Pass / QR','Reschedule Booking','Cancel Booking','Refund Status']],
  ['Private Rooms, Decor & Dresses',35,['Private Rooms Landing','Private Room Categories','Room / Package Details','Select Room & Size','Select Decoration Theme','Select Decoration Items','Dress & Costume Catalogue','Dress Details & Size Selection','Accessories & Add-ons','Private Room Date & Time','Private Room Booking Summary','Private Room Booking Confirmation']],
  ['Communities & Social',47,['Community Hub','Community Details','Community Events','My Communities','Messages','Reviews & Ratings']],
  ['Wallet, Gifts & Notifications',57,['Notifications']],
  ['Profile, Settings & Support',58,['My Profile','Edit Profile','My Preferences','Account & Security Settings','Payment Methods & Billing','Help & Support','Support Ticket Details','Legal, Privacy & Account Closure']]
];
export const adminGroups = [
  ['Authentication & Admin Account',1,['Admin Login','OTP / MFA Verification','Forgot / Reset Password','Admin Profile','Account & Security Settings']],
  ['Dashboard & Analytics',6,['Overview Dashboard','Revenue Dashboard','Booking Dashboard','Customer Analytics','Event Performance']],
  ['Category Management',11,['All Categories','Add / Edit Category','Subcategories & Tags']]
];
export function screens(groups,prefix){return groups.flatMap(([group,start,names])=>names.map((title,i)=>({id:`MEL-${prefix}-${String(start+i).padStart(3,'0')}`,number:start+i,title,group})));}
export const userScreens=screens(userGroups,'U');
export const adminScreens=screens(adminGroups,'A');
export const seeds=[
  {id:'art',name:'Creative Workshops',description:'Discover hands-on workshops and make something wonderfully yours.',image:'',subcategories:['Painting','Crochet'],tags:['Creative','Hands-on'],active:true},
  {id:'craft',name:'DIY & Crafts',description:'Turn little ideas into something you can hold.',image:'',subcategories:['Pottery','DIY Kits'],tags:['Craft','Creative'],active:true},
  {id:'dress',name:'Dresses & Costumes',description:'Dress up for your special experience.',image:'',subcategories:['Dresses','Costumes'],tags:['Style','Rental'],active:true},
  {id:'party',name:'Parties & Celebrations',description:'Celebrate your moments in a beautifully prepared space.',image:'',subcategories:['Birthday','Anniversary'],tags:['Celebration','Private'],active:true},
  {id:'private',name:'Themed Rooms',description:'A little world, made for you.',image:'',subcategories:['Birthday','Friends','Anniversary'],tags:['Private','Customizable'],active:true},
  {id:'stage',name:'Photo Experiences',description:'Capture a moment in your own creative setting.',image:'',subcategories:['Photo Booth','Portraits'],tags:['Photo','Creative'],active:true},
  {id:'social',name:'Meetups & Hangouts',description:'New faces. Unexpected connections.',image:'',subcategories:['Meetups','Creative Groups'],tags:['Social','18+'],active:true},
  {id:'relax',name:'Wellness & Self Care',description:'Slow down with a story and a quiet corner.',image:'',subcategories:['Reading Circle','Relaxation'],tags:['Quiet','Mindful'],active:true}
];
export const experiences=[
  {id:'art',category:'art',title:'Crochet Bag Workshop',price:650,icon:'✿',duration:'90 minutes',host:'Melo creative team'},
  {id:'pottery',category:'craft',title:'Clay & conversation',price:850,icon:'◒',duration:'2 hours',host:'Melo creative team'},
  {id:'music',category:'stage',title:'Photo Booth Experience',price:450,icon:'◒',duration:'90 minutes',host:'Melo photo team'},
  {id:'reading',category:'relax',title:'The slow reading club',price:350,icon:'☷',duration:'90 minutes',host:'Melo reading circle'},
  {id:'meetup',category:'social',title:'New faces, good stories',price:500,icon:'◎',duration:'2 hours',host:'Melo community team'},
  {id:'dream',category:'private',title:'Your private Dream Room',price:1800,icon:'☾',duration:'2 hours',host:'Melo room team'}
];
export const rooms=[{id:'studio',name:'Sunlit Studio',capacity:4,price:1800},{id:'lounge',name:'Moonlight Lounge',capacity:6,price:2400},{id:'garden',name:'Pastel Garden',capacity:8,price:3000}];
export const themes=['Soft celebration','Floral daydream','Starlit evening'];
export const dresses=[{id:'linen',name:'Linen celebration set',price:400},{id:'evening',name:'Evening dress',price:600},{id:'classic',name:'Classic costume',price:500}];
export const communities=[{id:'makers',name:'The Makers Circle',description:'Art, experiments, and happy little accidents.'},{id:'readers',name:'Slow Sunday Readers',description:'A quieter kind of together.'},{id:'stage',name:'Open Stage Collective',description:'A welcoming space to find your voice.'}];
export const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export function initialState(){return {version:6,categories:structuredClone(seeds),profile:{name:'Demo Guest',bio:'',interests:[],adult:false},role:'user',demoSession:false,adminSession:false,wishlist:[],recent:[],bookings:[],communities:[],messages:[],reviews:[],tickets:[],preferences:{email:true,push:true,quiet:false},draft:{experience:'art',count:1,date:'',slot:'10:00',guests:'Demo Guest',room:'studio',theme:themes[0],decor:[],dress:'',size:'M',accessories:[],note:''}};}
export function bookingTotal(draft){const e=experiences.find(e=>e.id===draft.experience)||experiences[0];if(e.id!=='dream')return e.price*Number(draft.count);const room=rooms.find(r=>r.id===draft.room)||rooms[0];const dress=dresses.find(d=>d.id===draft.dress);return room.price+(draft.decor||[]).length*150+(draft.accessories||[]).length*100+(dress?.price||0);}
export function categoryErrors(input,categories,editingId){const errors=[];if(!input.name?.trim())errors.push('Enter a category name.');if(input.name?.trim().length>80)errors.push('Category names must be 80 characters or fewer.');if(categories.some(c=>c.id!==editingId&&c.name.toLowerCase()===input.name?.trim().toLowerCase()))errors.push('A category with this name already exists.');if(!input.description?.trim())errors.push('Enter a category description.');if(input.image){try{if(!['http:','https:'].includes(new URL(input.image).protocol))errors.push('Use an http or https image URL.');}catch{errors.push('Enter a valid image URL.');}}return errors;}
export function listValues(value){return [...new Set(String(value).split(',').map(s=>s.trim()).filter(Boolean))];}
export function bookingErrors(draft,state){const errors=[];const e=experiences.find(e=>e.id===draft.experience);if(!e)errors.push('Select an experience.');else if(!state.categories.find(c=>c.id===e.category)?.active)errors.push('This category is currently unavailable. Select another experience.');if(!state.profile.adult)errors.push('Confirm you are 18 or older before booking.');if(!draft.date||!/^\d{4}-\d{2}-\d{2}$/.test(draft.date))errors.push('Select a date.');else if(draft.date<today())errors.push('Choose today or a future date.');else if(draft.date===today()&&/^\d{2}:\d{2}$/.test(draft.slot)){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date());if(draft.slot<=parts)errors.push('That time has passed. Choose a future date or slot.');}if(!['10:00','13:00','16:00'].includes(draft.slot))errors.push('Select a valid time slot.');const max=e?.id==='dream'?(rooms.find(r=>r.id===draft.room)?.capacity||0):8;if(!Number.isInteger(Number(draft.count))||Number(draft.count)<1||Number(draft.count)>max)errors.push(`Choose between 1 and ${max} participants.`);if(!draft.guests?.trim())errors.push('Enter participant names.');return errors;}
export function today(){const p=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const v=k=>p.find(x=>x.type===k).value;return `${v('year')}-${v('month')}-${v('day')}`;}
export function adultBirthDateLimit(reference=today()){const [year,month,day]=reference.split('-').map(Number);const target=year-18;const limit=Math.min(day,new Date(Date.UTC(target,month,0)).getUTCDate());return `${target}-${String(month).padStart(2,'0')}-${String(limit).padStart(2,'0')}`;}
export function registrationErrors(data,reference=today()){
  const errors=[];
  if(!data.name?.trim()||data.name.trim().length>80)errors.push('Enter a sample full name of 80 characters or fewer.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||''))errors.push('Enter a valid sample email address.');
  const mobile=String(data.mobile||'');const digits=mobile.replace(/\D/g,'');
  if(!/^[+\d\s()-]+$/.test(mobile)||digits.length<7||digits.length>15)errors.push('Enter a sample mobile number with 7–15 digits.');
  const date=String(data.birthDate||'');const parsed=new Date(date+'T00:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(parsed.getTime())||parsed.toISOString().slice(0,10)!==date)errors.push('Choose a valid sample date of birth.');
  else if(date>adultBirthDateLimit(reference))errors.push('Melo Space is for adults aged 18 or older.');
  if(String(data.password||'').trim().length<6)errors.push('Use a sample password with at least six characters.');
  if(data.password!==data.confirmPassword)errors.push('The sample passwords do not match.');
  if(!data.terms)errors.push('Accept the Terms & Conditions and Privacy Policy to continue in this demo.');
  if(!['user','host'].includes(data.role))errors.push('Choose User or Host before creating a demo profile.');
  return errors;
}
export function profileCompletionErrors(data,categories,reference=today()){
  const errors=[];
  if(!data.name?.trim()||data.name.trim().length>80)errors.push('Enter a sample full name of 80 characters or fewer.');
  if(!data.city?.trim()||data.city.trim().length>80)errors.push('Enter a sample city or location of 80 characters or fewer.');
  if(String(data.country||'').length>80)errors.push('Keep the country name to 80 characters or fewer.');
  if(data.birthDate){const date=String(data.birthDate),parsed=new Date(date+'T00:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(parsed.getTime())||parsed.toISOString().slice(0,10)!==date)errors.push('Choose a valid sample date of birth.');else if(date>adultBirthDateLimit(reference))errors.push('Melo Space is for adults aged 18 or older.');}
  if(!['','female','male','other'].includes(data.gender||''))errors.push('Choose one of the available gender options.');
  if(!Array.isArray(data.interests)||data.interests.some(id=>!categories.some(c=>c.id===id&&c.active)))errors.push('Choose interests from the available categories.');
  if(data.photo&&(!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=\r\n]+$/.test(data.photo)||data.photo.length>2900000))errors.push('Choose a PNG, JPEG, or WebP profile image under 2 MB.');
  return errors;
}
export function interestSelectionErrors(ids,categories){const errors=[];if(!Array.isArray(ids))return ['Choose interests from the available categories.'];if(new Set(ids).size>6)errors.push('Choose up to six interests to continue.');if(ids.some(id=>!categories.some(c=>c.id===id&&c.active)))errors.push('Choose interests from the available categories.');return errors;}
export function makeBooking(draft,state,id){const errors=bookingErrors(draft,state);if(errors.length)throw new Error(errors.join(' '));const e=experiences.find(e=>e.id===draft.experience);return {id,title:e.title,...structuredClone(draft),total:bookingTotal(draft),status:'Demo reserved',payment:'Not charged',checkedIn:false,createdAt:new Date().toISOString()};}
