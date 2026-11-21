if (location.pathname.startsWith('/staff')) {
  await import('./app.js');
} else {
  await import('./ds6-app.js');
  const {startSplash}=await import('./ds6-splash.js');
  startSplash();
  const {startOnboarding}=await import('./ds6-onboarding.js');
  startOnboarding();
  const {startRoleSelection}=await import('./ds6-role.js');
  startRoleSelection();
  const {startLogin}=await import('./ds6-login.js');
  startLogin();
  // One delegated controller keeps the footer trigger and drawer close control in sync.
  document.addEventListener('click',event=>{
    const trigger=event.target.closest('.ds-menu');
    if(!trigger)return;
    event.preventDefault();event.stopImmediatePropagation();
    const panel=document.querySelector('#screen-navigation');
    const open=!panel.classList.contains('open');
    panel.classList.toggle('open',open);
    document.querySelectorAll('.ds-menu').forEach(b=>b.setAttribute('aria-expanded',String(open)));
    if(open)panel.querySelector('button')?.focus();
    else document.querySelector('.product-footer .ds-menu')?.focus();
  },true);
  document.addEventListener('keydown',event=>{
    const panel=document.querySelector('#screen-navigation');
    if(event.key==='Escape'&&panel?.classList.contains('open')){
      event.preventDefault();event.stopImmediatePropagation();
      panel.classList.remove('open');
      document.querySelectorAll('.ds-menu').forEach(b=>b.setAttribute('aria-expanded','false'));
      document.querySelector('.product-footer .ds-menu')?.focus();
    }
  },true);
}
