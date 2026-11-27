import test from 'node:test';
import assert from 'node:assert/strict';
import {registrationErrors,adultBirthDateLimit} from '../ds6-data.js';
import {profileCompletionErrors} from '../ds6-data.js';
import {interestSelectionErrors} from '../ds6-data.js';
import {userScreens,adminScreens,initialState,categoryErrors,listValues,bookingTotal,makeBooking,bookingErrors} from '../ds6-data.js';

test('DS6 preserves every named screen and stops admin at category management',()=>{
  assert.equal(userScreens.length,61);
  assert.equal(adminScreens.length,13);
  assert.equal(new Set(userScreens.map(s=>s.id)).size,61);
  assert.equal(adminScreens.at(-1).id,'MEL-A-013');
  for(const n of [53,54,55,56]) assert.equal(userScreens.some(s=>s.number===n),false);
});
test('category editing rejects duplicate names and unsafe image URLs',()=>{
  const state=initialState();
  assert.deepEqual(categoryErrors({...state.categories[0]},state.categories,'art'),[]);
  assert.ok(categoryErrors({name:' creative workshops ',description:'test'},state.categories).some(e=>e.includes('already exists')));
  assert.ok(categoryErrors({name:'New',description:'test',image:'javascript:alert(1)'},state.categories).length);
  assert.ok(categoryErrors({name:'New',description:'test',image:'not-a-url'},state.categories).length);
  assert.deepEqual(listValues(' Art, Quiet, Art, , '),['Art','Quiet']);
});
test('room pricing applies room, optional outfit, decor and accessories once per reservation',()=>{
  const state=initialState();
  assert.equal(bookingTotal({...state.draft,count:3}),1950);
  assert.equal(bookingTotal({...state.draft,experience:'dream',count:4,room:'studio',dress:'evening',decor:['Flowers','Lights'],accessories:['Props']}),2800);
});
test('bookings require adult eligibility, future date, valid capacity and visible category',()=>{
  const state=initialState();
  const draft={...state.draft,date:'2099-01-01'};
  assert.throws(()=>makeBooking(draft,state,'test'),/18/);
  state.profile.adult=true;
  assert.equal(bookingErrors(draft,state).length,0);
  const result=makeBooking(draft,state,'MELO-TEST');
  assert.equal(result.payment,'Not charged');
  assert.equal(result.status,'Demo reserved');
  assert.equal(result.total,650);
  state.categories[0].active=false;
  assert.ok(bookingErrors(draft,state).some(e=>e.includes('unavailable')));
  state.categories[0].active=true;
  assert.ok(bookingErrors({...draft,date:'2020-01-01'},state).some(e=>e.includes('future')));
  assert.ok(bookingErrors({...draft,count:9},state).some(e=>e.includes('between')));
  assert.ok(bookingErrors({...draft,experience:'dream',room:'studio',count:5},state).some(e=>e.includes('between')));
});

test('registration accepts exactly 18, rejects younger or invalid birth dates, and handles leap-day cutoff',()=>{
  const data={name:'Sample Guest',email:'sample@example.com',mobile:'+12025550147',birthDate:'2008-11-21',password:'Sample987!',confirmPassword:'Sample987!',terms:true,role:'user'};
  assert.deepEqual(registrationErrors(data,'2026-11-21'),[]);
  assert.equal(adultBirthDateLimit('2026-11-21'),'2008-11-21');
  assert.ok(registrationErrors({...data,birthDate:'2008-11-22'},'2026-11-21').some(e=>e.includes('18')));
  assert.ok(registrationErrors({...data,birthDate:'1995-02-30'},'2026-11-21').some(e=>e.includes('valid sample date')));
  assert.equal(adultBirthDateLimit('2024-02-29'),'2006-02-28');
  assert.deepEqual(registrationErrors({...data,birthDate:'2006-02-28'},'2024-02-29'),[]);
  assert.ok(registrationErrors({...data,birthDate:'2006-03-01'},'2024-02-29').some(e=>e.includes('18')));
});
test('registration validates contact fields, sample password confirmation, consent and role',()=>{
  const data={name:'Sample User',email:'sample@example.com',mobile:'+12025550147',birthDate:'1995-06-15',password:'Sample987!',confirmPassword:'Sample987!',terms:true,role:'user'};
  assert.deepEqual(registrationErrors(data,'2026-11-21'),[]);
  assert.ok(registrationErrors({...data,email:'invalid'},'2026-11-21').some(e=>e.includes('email')));
  assert.ok(registrationErrors({...data,mobile:'abc123'},'2026-11-21').some(e=>e.includes('mobile')));
  assert.ok(registrationErrors({...data,password:'123',confirmPassword:'123'},'2026-11-21').some(e=>e.includes('six')));
  assert.ok(registrationErrors({...data,confirmPassword:'Different'},'2026-11-21').some(e=>e.includes('do not match')));
  assert.ok(registrationErrors({...data,terms:false},'2026-11-21').some(e=>e.includes('Accept')));
  assert.ok(registrationErrors({...data,role:'host'},'2026-11-21').some(e=>e.includes('Only user accounts')));
  assert.ok(registrationErrors({...data,role:'admin'},'2026-11-21').some(e=>e.includes('Only user accounts')));
});

test('profile completion validates required identity/location and any supplied adult birth date',()=>{
  const state=initialState();const data={name:'Profile Demo',city:'Sample City',country:'',birthDate:'',gender:'',interests:[],photo:''};
  assert.deepEqual(profileCompletionErrors(data,state.categories,'2026-11-21'),[]);
  assert.ok(profileCompletionErrors({...data,name:''},state.categories,'2026-11-21').some(e=>e.includes('full name')));
  assert.ok(profileCompletionErrors({...data,city:''},state.categories,'2026-11-21').some(e=>e.includes('city')));
  assert.deepEqual(profileCompletionErrors({...data,birthDate:'2008-11-21'},state.categories,'2026-11-21'),[]);
  assert.ok(profileCompletionErrors({...data,birthDate:'2008-11-22'},state.categories,'2026-11-21').some(e=>e.includes('18')));
  assert.ok(profileCompletionErrors({...data,birthDate:'1995-02-30'},state.categories,'2026-11-21').some(e=>e.includes('valid sample date')));
});
test('profile completion restricts selections and avatar sources to local supported image data',()=>{
  const state=initialState();const data={name:'Profile Demo',city:'Sample City',gender:'female',interests:['art'],photo:''};
  assert.deepEqual(profileCompletionErrors(data,state.categories,'2026-11-21'),[]);
  assert.ok(profileCompletionErrors({...data,gender:'invalid'},state.categories,'2026-11-21').some(e=>e.includes('gender')));
  assert.ok(profileCompletionErrors({...data,interests:['unknown']},state.categories,'2026-11-21').some(e=>e.includes('interests')));
  state.categories[0].active=false;
  assert.ok(profileCompletionErrors(data,state.categories,'2026-11-21').some(e=>e.includes('interests')));
  assert.ok(profileCompletionErrors({...data,interests:[],photo:'javascript:alert(1)'},state.categories).some(e=>e.includes('image')));
  assert.ok(profileCompletionErrors({...data,interests:[],photo:'data:image/svg+xml;base64,AAAA'},state.categories).some(e=>e.includes('image')));
  assert.deepEqual(profileCompletionErrors({...data,interests:[],photo:'data:image/png;base64,AAAA'},state.categories),[]);
});
test('interests allow zero through six distinct active categories and reject invalid or unavailable choices',()=>{
  const state=initialState();const six=state.categories.slice(0,6).map(c=>c.id);
  assert.deepEqual(interestSelectionErrors([],state.categories),[]);
  assert.deepEqual(interestSelectionErrors(six,state.categories),[]);
  assert.deepEqual(interestSelectionErrors(['art','art','craft'],state.categories),[]);
  assert.ok(interestSelectionErrors(state.categories.slice(0,7).map(c=>c.id),state.categories).some(e=>e.includes('six')));
  assert.ok(interestSelectionErrors(['unknown'],state.categories).some(e=>e.includes('available')));
  state.categories[0].active=false;
  assert.ok(interestSelectionErrors(['art'],state.categories).some(e=>e.includes('available')));
  assert.ok(interestSelectionErrors(null,state.categories).length);
});
