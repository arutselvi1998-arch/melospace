import {logo,icon} from './ds6-design.js';

const eye='<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
const providers=[['Google','<span class="login-google-mark" aria-hidden="true">G</span>'],['Apple','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 12.5c0-2 1.6-3 1.7-3.1-1-1.5-2.6-1.7-3.1-1.7-1.3-.1-2.5.8-3.2.8-.6 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.5 2.1 2.6 2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.9.7 1.9-1 2.6-2c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.9-2.2-3.6ZM14.6 6.3c.6-.8 1.1-1.9 1-3-.9 0-2 .7-2.7 1.5-.6.7-1.2 1.9-1 2.9 1 .1 2.1-.5 2.7-1.4Z"/></svg>'],['WhatsApp','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 20 1-4a8 8 0 1 1 3 3Z"/><path d="M8 7c-1 1 0 4 2 6s5 3 6 2l-1-2-2 1-3-3 1-2Z"/></svg>']];

export {providers as accountProviders};

export function loginScreen(screenLink,selectedRole,remember=false){
  const role=selectedRole==='host'?'host':'user';
  const returnTo=new URLSearchParams(location.search).get('returnTo');
  const link=n=>screenLink(n,n===5&&returnTo?{returnTo}:{},false);
  return `<div class="melo-login" data-login-screen>
    <a class="login-back" href="${link(4)}" aria-label="Back to role selection"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></a>
    <div class="login-mobile-welcome">${logo(true)}<h1>Welcome Back!</h1><p>Sign in to unlock your world.<br>Experiences, moments and more.</p></div>
    <main id="main" class="login-layout">
      <section class="login-illustration" aria-label="Melo Space experiences"><div class="login-room-scene"><img src="/assets/melo/room-hd.png" alt="A pink celebration studio with fairy lights and a glowing heart" fetchpriority="high"></div><div class="login-illustration-copy">${logo(true)}<p>Experience · Celebrate · Create</p><div class="login-brand-features">${[['calendar','Book','experiences'],['room','Private','rooms'],['sparkles','Themes','& decor']].map(([i,t,s])=>`<span>${icon(i)}<span>${t}<br>${s}</span></span>`).join('')}</div></div><span class="login-decoration" aria-hidden="true">✦</span></section>
      <section class="login-card" aria-label="Login or sign up">
        <div class="login-heading"><h1>Welcome to<br><span>Melo Space<sup>+</sup></span></h1><p>Sign in to create your next moment.</p></div>
        <nav class="login-access-tabs" aria-label="Account access"><a class="is-current" href="${link(5)}" aria-current="page">Login</a><a href="${link(7)}">Sign Up</a></nav>
        <div class="login-role-context"><span>${role==='host'?'Host':'User'} account</span><a href="${link(4)}">Change role</a></div>
        <form data-action="demo-login" class="login-form" autocomplete="off"><div class="form-error" role="alert" tabindex="-1" hidden></div><input type="hidden" name="role" value="${role}">
          <label for="login-identifier">Email or mobile number</label><div class="login-input-wrap">${icon('user')}<input id="login-identifier" name="identifier" type="text" required maxlength="120" placeholder="demo@example.com" autocomplete="off" autocapitalize="none" spellcheck="false"></div>
          <label for="login-password">Password</label><div class="login-input-wrap login-password-wrap">${icon('lock')}<input id="login-password" name="password" type="password" required minlength="6" maxlength="120" placeholder="Sample password (6+ characters)" autocomplete="off" aria-describedby="login-demo-note"><button type="button" class="login-password-toggle" data-password-toggle aria-label="Show password" aria-pressed="false">${eye}</button></div>
          <div class="login-form-options"><label class="login-remember"><input type="checkbox" name="remember" ${remember?'checked':''}><span>Remember me</span></label><button class="login-forgot" type="button" data-open-recovery>Forgot password?</button></div>
          <button type="submit" class="login-submit">Login</button>
        </form>
        <div class="login-social-divider"><span>Or continue with</span></div>
        <div class="login-providers" aria-label="Other sign-in methods">${providers.map(([name,mark])=>`<button type="button" data-provider="${name}" class="login-provider ${name.toLowerCase()}" aria-label="Continue with ${name}">${mark}</button>`).join('')}</div>
        <p class="login-provider-feedback" data-provider-feedback role="status" aria-live="polite"></p>
        <p class="login-create-account">Don't have an account? <a href="${link(7)}">Create an account</a></p>
        <p class="login-demo-note" id="login-demo-note">Demo only — use sample details. No real sign-in or messages; passwords are not saved.</p>
      </section>
    </main>
    <dialog class="login-recovery" aria-labelledby="login-recovery-title"><h2 id="login-recovery-title">Forgot your password?</h2><p>Password recovery is managed by the shared Meetura account service. It is not connected in this local preview, so no reset message can be sent.</p><p>To explore the demo, use a sample email or mobile number and any sample password with six or more characters.</p><button type="button" data-close-recovery>Back to login</button></dialog>
    <div class="login-bottom-curve" aria-hidden="true"></div>
  </div>`;
}

export function startLogin(){
  const root=document.querySelector('[data-login-screen]');
  if(!root)return;
  const password=root.querySelector('input[name=password]');
  const toggle=root.querySelector('[data-password-toggle]');
  toggle.addEventListener('click',()=>{const visible=password.type==='password';password.type=visible?'text':'password';toggle.setAttribute('aria-pressed',String(visible));toggle.setAttribute('aria-label',visible?'Hide password':'Show password');});
  const recovery=root.querySelector('dialog');
  const recoveryOpener=root.querySelector('[data-open-recovery]');
  recoveryOpener.addEventListener('click',()=>{recoveryOpener.focus();recovery.showModal();});
  root.querySelector('[data-close-recovery]').addEventListener('click',()=>recovery.close());
  recovery.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();recovery.close();}});
  recovery.addEventListener('close',()=>recoveryOpener.focus());
  root.querySelectorAll('[data-provider]').forEach(button=>button.addEventListener('click',()=>{root.querySelector('[data-provider-feedback]').textContent=`${button.dataset.provider} sign-in is not connected. Use the demo login above.`;}));
}
