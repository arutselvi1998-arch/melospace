import {logo,icon} from './ds6-design.js';

export function welcomeScreen(screenLink){
  const href=n=>screenLink(n,{},false);
  const features=[['sparkles','Exciting','experiences',12],['room','Private','rooms',35],['calendar','Events &','celebrations',49],['grid','Creative','workshops',13],['heart','Connect &','celebrate',47]];
  return `<div class="melo-welcome" data-welcome>
    <header class="welcome-header">
      <a href="${href(11)}" class="welcome-desktop-brand" aria-label="Melo Space home">${logo()}</a>
      <nav aria-label="Welcome navigation"><a href="${href(3)}">About</a><a href="${href(12)}">Experiences</a><a href="${href(35)}">Private rooms</a><a href="${href(47)}">Community</a></nav>
      <div class="welcome-header-actions"><a href="${href(5)}" class="button secondary">Login</a><a href="${href(3)}" class="button">Get Started</a></div>
    </header>
    <main id="main" class="welcome-main">
      <section class="welcome-hero" aria-labelledby="welcome-title">
        <div class="welcome-copy">
          <div class="welcome-mobile-brand" aria-hidden="true">${logo(true)}</div>
          <h1 id="welcome-title">Welcome to<br><span>Melo Space<sup>+</sup></span></h1>
          <p class="welcome-intro">Discover experiences, book events,<br class="welcome-desktop-break"> create private moments and<br class="welcome-desktop-break"> make new memories.</p>
          <div class="welcome-action-block">
            <div class="welcome-actions"><a class="button welcome-start" href="${href(3)}">Get Started</a><a class="button secondary welcome-login" href="${href(5)}">Login</a></div>
            <p class="welcome-new-account">New here? <a href="${href(7)}">Create an account</a></p>
          </div>
        </div>
        <div class="welcome-scene" aria-label="Creative experiences, private rooms, and moments together">
          <div class="welcome-room"><img src="/assets/melo/room-hd.png" alt="A private pink celebration room with a glowing heart and warm fairy lights" fetchpriority="high"></div>
          <div class="welcome-collage"><img src="/assets/melo/meetup-hd.png" alt="Friends connecting at a creative experience"><img src="/assets/melo/workshop-hd.png" alt="Creative workshop materials"><img src="/assets/melo/dress-hd.png" alt="A pink celebration gown in a dressing studio"></div>
          <span class="welcome-doodle doodle-one" aria-hidden="true">✦</span><span class="welcome-doodle doodle-two" aria-hidden="true">✧</span>
        </div>
        <svg class="welcome-mobile-wave" viewBox="0 0 390 75" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22C120 72 260-12 390 27V75H0Z" fill="#fff1fc"/><path d="M0 17C120 67 260-17 390 22" fill="none" stroke="#ffb4e7" stroke-width="3"/></svg>
      </section>
      <section class="welcome-features" aria-label="Discover Melo Space">${features.map(([i,line1,line2,n])=>`<a class="welcome-feature" href="${href(n)}">${icon(i)}<span>${line1}<br>${line2}</span></a>`).join('')}</section>
    </main>
    <div class="welcome-bottom-curve" aria-hidden="true"></div>
  </div>`;
}
