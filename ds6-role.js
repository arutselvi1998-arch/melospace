import {logo,icon} from './ds6-design.js';

export function roleScreen(screenLink,selectedRole){
  const selected='user';
  const roles=[
    {value:'user',title:'User',description:'Discover, book experiences, private rooms and more.',image:'role-user.png',alt:'A woman enjoying her phone',features:[['sparkles','Book experiences'],['room','Private rooms'],['user','Discover & connect']]}
  ];
  return `<div class="melo-role-selection" data-role-selection>
    <header class="role-header"><a href="${screenLink(3,{},false)}" class="role-back" aria-label="Back to onboarding"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></a><a href="${screenLink(2,{},false)}" class="role-brand" aria-label="Melo Space welcome">${logo()}</a></header>
    <main id="main" class="role-main">
      <div class="role-heading"><h1>Your Melo Space Account</h1><p>Discover and book experiences with your user account</p></div>
      <form data-action="role" class="role-form"><div class="form-error" role="alert" tabindex="-1" hidden></div>
        <fieldset class="role-options"><legend class="sr-only">Your account</legend>${roles.map(r=>`<label class="role-choice ${selected===r.value?'is-selected':''}" data-role-card="${r.value}"><input type="hidden" name="role" value="user"><span class="role-portrait"><img src="/assets/melo/${r.image}" alt="" fetchpriority="high"></span><span class="role-choice-copy"><strong>${r.title}</strong><span>${r.description}</span></span><span class="role-features">${r.features.map(([i,t])=>`<span>${icon(i)}<span>${t}</span></span>`).join('')}</span><span class="role-choice-sparkles" aria-hidden="true">✦</span></label>`).join('')}</fieldset>
        <div class="role-continue"><button type="submit">Continue</button></div>
      </form>
      <p class="sr-only" data-role-status aria-live="polite">User account.</p>
    </main>
    <svg class="role-waves" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60C220-30 500 190 770 100S1230 0 1440 70V180H0Z" fill="#f7e0ff"/><path d="M0 135C260 30 530 190 830 140S1220 80 1440 130V180H0Z" fill="#ffdef3"/></svg>
  </div>`;
}

export function startRoleSelection(){}
