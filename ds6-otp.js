import {logo,icon} from './ds6-design.js';

const shield='<svg viewBox="0 0 64 70" fill="none" aria-hidden="true"><path d="m32 6 22 10v18c0 15-13 25-22 30C23 59 10 49 10 34V16Z" stroke="currentColor" stroke-width="2.5"/><path d="m23 34 6 6 13-15" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const envelope='<svg viewBox="0 0 160 130" fill="none" aria-hidden="true"><defs><linearGradient id="otp-envelope-fill" x1="35" y1="35" x2="115" y2="120"><stop stop-color="#f4b8ed"/><stop offset="1" stop-color="#b752c6"/></linearGradient></defs><circle cx="80" cy="65" r="58" fill="#fce4f7"/><path d="m29 64 51-39 51 39v52H29Z" fill="#e6a8e6"/><rect x="48" y="24" width="64" height="70" rx="8" fill="#fffaff" stroke="#f1cdea"/><path d="m59 47 4 7-7-3h8l-7 3ZM77 47l4 7-7-3h8l-7 3ZM95 47l4 7-7-3h8l-7 3Z" fill="#a43bb0"/><path d="m29 64 51 35 51-35v47c0 5-4 9-9 9H38c-5 0-9-4-9-9Z" fill="url(#otp-envelope-fill)"/><path d="m29 116 38-29m64 29L93 87" stroke="#dc8cda" stroke-width="1.5"/><path d="m126 27 8-5m-6 16 10 1m-21-20 1-9M26 44l-8-5m7 17-10 2" stroke="#ed46b1" stroke-width="3" stroke-linecap="round"/></svg>';

export function otpScreen(screenLink){
  const returnTo=new URLSearchParams(location.search).get('returnTo');
  const login=screenLink(5,returnTo?{returnTo}:{},false);
  return `<div class="melo-otp" data-otp-screen>
    <header class="otp-mobile-header"><a class="otp-back" href="${login}" aria-label="Back to login"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></a><a href="${screenLink(2,{},false)}" aria-label="Melo Space welcome">${logo()}</a></header>
    <main id="main" class="otp-layout">
      <section class="otp-illustration" aria-label="Melo Space celebration studio"><img class="otp-room-art" src="/assets/melo/celebration-hero.png" alt="Pink flowers, gifts and a warmly lit celebration room" fetchpriority="high"><div class="otp-brand">${logo(true)}</div><div class="otp-gifts"><img src="/assets/melo/celebration-hd.png" alt="A pink celebration cake and gifts"></div><span class="otp-illustration-star" aria-hidden="true">✦</span></section>
      <section class="otp-panel" aria-labelledby="otp-heading"><div class="otp-symbol otp-desktop-symbol">${shield}</div><div class="otp-symbol otp-mobile-symbol">${envelope}</div><h1 id="otp-heading">OTP Verification</h1><p class="otp-instructions" id="otp-instructions">Enter the 6-digit code for your<br>Melo Space account.</p><p class="otp-demo-code">Demo code: <strong>123456</strong></p>
        <form data-action="verify" class="otp-form" novalidate><div class="form-error" role="alert" tabindex="-1" hidden></div><input name="code" type="hidden" value=""><fieldset class="otp-digits" aria-describedby="otp-instructions otp-demo-note"><legend class="sr-only">Six-digit verification code</legend>${Array.from({length:6},(_,i)=>`<input type="text" id="otp-digit-${i+1}" data-otp-digit="${i}" name="digit-${i+1}" inputmode="numeric" maxlength="${i===0?6:1}" pattern="[0-9]" autocomplete="${i===0?'one-time-code':'off'}" aria-label="Digit ${i+1} of 6" aria-required="true" placeholder="–">`).join('')}</fieldset><div class="otp-resend-row"><button type="button" class="otp-resend" data-otp-resend disabled><span>Resend OTP in <strong data-otp-countdown>00:30</strong></span></button></div><button type="submit" class="otp-verify">Verify</button></form>
        <a class="button secondary otp-change-number" href="${login}">Change Number</a><p class="otp-feedback" data-otp-feedback role="status" aria-live="polite"></p><p class="otp-demo-note" id="otp-demo-note">Local demo only. No code is sent by SMS or email.</p>
      </section>
      <svg class="otp-waves" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true"><path d="M0 130C330 25 570 270 850 140S1200 10 1440 100V240H0Z" fill="#e5b0f2" opacity=".55"/><path d="M0 185C300 60 600 260 930 190S1260 105 1440 170V240H0Z" fill="#fbd4f7"/></svg>
    </main>
    <div class="otp-bottom-curve" aria-hidden="true"></div>
  </div>`;
}

export function startOtp(){
  const root=document.querySelector('[data-otp-screen]');if(!root)return;
  const form=root.querySelector('.otp-form');const digits=[...root.querySelectorAll('[data-otp-digit]')];const aggregate=form.elements.code;const resend=root.querySelector('[data-otp-resend]');const feedback=root.querySelector('[data-otp-feedback]');
  const sync=()=>{aggregate.value=digits.map(d=>d.value).join('');digits.forEach(d=>d.classList.toggle('has-value',Boolean(d.value)));};
  function clearError(){const box=form.querySelector('.form-error');box.hidden=true;box.textContent='';digits.forEach(d=>d.removeAttribute('aria-invalid'));}
  function distribute(index,text){const code=text.replace(/\D/g,'').slice(0,6);if(!code)return;if(code.length===6)index=0;for(let i=index;i<digits.length&&i-index<code.length;i++)digits[i].value=code[i-index];sync();clearError();digits[Math.min(index+code.length,digits.length-1)].focus();}
  digits.forEach((digit,index)=>{
    digit.addEventListener('input',()=>{const value=digit.value.replace(/\D/g,'');if(value.length>1){digit.value='';distribute(index,value);return;}digit.value=value;sync();clearError();if(value&&index<5)digits[index+1].focus();});
    digit.addEventListener('paste',event=>{event.preventDefault();distribute(index,event.clipboardData?.getData('text')||'');});
    digit.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();digits[Math.max(0,Math.min(5,index+(event.key==='ArrowRight'?1:-1)))].focus();}else if(event.key==='Backspace'&&!digit.value&&index>0){event.preventDefault();digits[index-1].value='';digits[index-1].focus();sync();clearError();}});
  });
  form.addEventListener('submit',event=>{sync();if(!/^\d{6}$/.test(aggregate.value)){event.preventDefault();event.stopImmediatePropagation();const box=form.querySelector('.form-error');box.textContent='Enter all six digits to continue.';box.hidden=false;digits.filter(d=>!d.value).forEach(d=>d.setAttribute('aria-invalid','true'));(digits.find(d=>!d.value)||digits[0]).focus();}},true);
  let readyAt=Date.now()+30000;
  function updateTimer(){const remaining=Math.max(0,Math.ceil((readyAt-Date.now())/1000));resend.disabled=remaining>0;resend.innerHTML=remaining?`<span>Resend OTP in <strong data-otp-countdown>00:${String(remaining).padStart(2,'0')}</strong></span>`:'Resend OTP';}
  resend.addEventListener('click',()=>{if(Date.now()<readyAt)return;digits.forEach(d=>d.value='');sync();clearError();readyAt=Date.now()+30000;updateTimer();feedback.textContent='Demo code refreshed: 123456. No message was sent.';digits[0].focus();});
  setInterval(updateTimer,1000);document.addEventListener('visibilitychange',updateTimer);updateTimer();
}
