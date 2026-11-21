import test from 'node:test';
import assert from 'node:assert/strict';
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
