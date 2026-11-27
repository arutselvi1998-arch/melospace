import {logo,icon} from './ds6-design.js';

export function onboardingScreen(screenLink){
  const next=screenLink(5,{},false);
  const slides=[
    {title:'Discover Experiences',description:'Explore creative workshops and activities made for your interests. Find something new to love.',image:'onboarding-discover.png',alt:'An adult woman enjoying a painting workshop with friends',icon:'sparkles'},
    {title:'Book Private Rooms',description:'Choose unique rooms, decoration themes, and little extras for your special moments.',image:'celebration-hd.png',alt:'A pink celebration setup with cake, flowers, and warm lights',icon:'room'},
    {title:'Celebrate Together',description:'Join community events, connect with others, and create memories together.',image:'onboarding-celebrate.png',alt:'Three adult friends celebrating together in a pink studio',icon:'heart'}
  ];
  return `<div class="melo-onboarding" data-onboarding>
    <header class="onboard-header"><a href="${screenLink(2,{},false)}" aria-label="Melo Space welcome">${logo()}</a><a class="onboard-skip" href="${next}">Skip</a></header>
    <main id="main" class="onboard-main">
      <div class="onboard-layout">
        <section class="onboard-intro"><h1>Get to Know<br><span>Melo Space<sup>+</sup></span></h1><p>A space to explore, learn,<br>connect and celebrate<br>special moments.</p></section>
        <section class="onboard-cards" aria-label="Get to know Melo Space" aria-roledescription="carousel">${slides.map((s,i)=>`<article class="onboard-card ${i===0?'is-active':''}" data-onboard-card="${i}" aria-label="${i+1} of 3: ${s.title}"><span class="onboard-card-icon" aria-hidden="true">${icon(s.icon)}</span><div class="onboard-card-photo"><img src="/assets/melo/${s.image}" alt="${s.alt}" ${i===0?'fetchpriority="high"':'loading="lazy"'}></div><div class="onboard-card-copy"><h2>${s.title}</h2><p>${s.description}</p></div></article>`).join('')}</section>
      </div>
      <div class="onboard-controls"><div class="onboard-progress" role="group" aria-label="Onboarding steps">${slides.map((s,i)=>`<button type="button" data-onboard-dot="${i}" aria-label="Show step ${i+1}: ${s.title}" aria-pressed="${i===0}"><span></span></button>`).join('')}</div><button type="button" class="onboard-next" data-onboard-next data-destination="${next}">Next</button></div>
      <p class="sr-only" data-onboard-status aria-live="polite" aria-atomic="true">Step 1 of 3: Discover Experiences</p>
    </main>
    <svg class="onboard-waves" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 65C260-40 430 170 735 105S1200-15 1440 70V180H0Z" fill="#f5dcff" opacity=".7"/><path d="M0 125C280 15 430 165 730 140S1180 60 1440 125V180H0Z" fill="#fbdcf4"/></svg>
  </div>`;
}

export function startOnboarding(){
  const root=document.querySelector('[data-onboarding]');
  if(!root)return;
  const cards=[...root.querySelectorAll('[data-onboard-card]')];
  const dots=[...root.querySelectorAll('[data-onboard-dot]')];
  const next=root.querySelector('[data-onboard-next]');
  const mobile=matchMedia('(max-width:640px)');
  let active=0;
  function show(index){active=Math.max(0,Math.min(cards.length-1,index));root.dataset.step=String(active);cards.forEach((card,i)=>{card.classList.toggle('is-active',i===active);card.hidden=mobile.matches&&i!==active;});dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===active)));next.textContent=active===cards.length-1?'Get Started':'Next';root.querySelector('[data-onboard-status]').textContent=`Step ${active+1} of ${cards.length}: ${cards[active].querySelector('h2').textContent}`;}
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
  next.addEventListener('click',()=>{if(active<cards.length-1)show(active+1);else location.assign(next.dataset.destination);});
  root.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(active+(event.key==='ArrowRight'?1:-1));}});
  const surface=root.querySelector('.onboard-cards');let start=null;
  surface.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')start={x:event.clientX,y:event.clientY};});
  surface.addEventListener('pointerup',event=>{if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dy)<60)show(active+(dx<0?1:-1));});
  surface.addEventListener('pointercancel',()=>{start=null;});
  mobile.addEventListener('change',()=>show(active));
  show(0);
}
