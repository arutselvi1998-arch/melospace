import {logo} from './ds6-design.js';

export function splashScreen(welcomeUrl){
  return `<main id="main" class="melo-splash" data-splash aria-label="Melo Space splash screen">
    <a class="splash-skip" href="${welcomeUrl}">Enter Melo Space</a>
    <div class="splash-glow splash-glow-one" aria-hidden="true"></div>
    <div class="splash-glow splash-glow-two" aria-hidden="true"></div>
    <div class="splash-set" aria-hidden="true"><img class="splash-room" src="/assets/melo/celebration-hero.png" alt="" fetchpriority="high"><div class="splash-dress-frame"><img src="/assets/melo/dress-hd.png" alt=""></div></div>
    <div class="splash-sparkles" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span></div>
    <section class="splash-brand" aria-label="Melo Space">
      <h1>${logo(true)}</h1>
      <p class="splash-tagline">Experiences · Events · Private Rooms<br><span>Create · Connect · Celebrate</span></p>
    </section>
    <svg class="splash-waves" viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="splash-wave-back" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffb6ee"/><stop offset=".5" stop-color="#fa3fc3"/><stop offset="1" stop-color="#bb36df"/></linearGradient><linearGradient id="splash-wave-front" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff5ff"/><stop offset=".5" stop-color="#f9d5ff"/><stop offset="1" stop-color="#f5b5f5"/></linearGradient></defs><path d="M0 55C210 10 330 245 650 220S1190 170 1440 15V420H0Z" fill="url(#splash-wave-back)"/><path d="M0 65C210 20 330 255 650 230S1190 180 1440 25" fill="none" stroke="#ffd6fa" stroke-width="3" opacity=".65"/><path d="M0 235C300 170 510 345 795 300S1190 105 1440 190V420H0Z" fill="url(#splash-wave-front)"/></svg>
    <div class="splash-loading" role="status" aria-live="polite"><span class="splash-spinner" aria-hidden="true"></span><span>Loading Melo Space…</span></div>
  </main>`;
}

export function startSplash(){
  const root=document.querySelector('[data-splash]');
  if(!root)return;
  // A stable preview makes the supplied design easy to review; normal entry advances.
  if(new URLSearchParams(location.search).get('preview')==='1')return;
  const images=[...root.querySelectorAll('img')];
  Promise.race([Promise.all(images.map(image=>image.decode().catch(()=>{}))),new Promise(resolve=>setTimeout(resolve,4000))]).then(()=>{
    setTimeout(()=>{if(!document.hidden)location.replace(root.querySelector('.splash-skip').href);else root.querySelector('.splash-loading').lastElementChild.textContent='Ready to explore Melo Space';},2200);
  });
}
