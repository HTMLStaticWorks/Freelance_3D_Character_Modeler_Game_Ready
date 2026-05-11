/* ============================================================
   MODELER GAME — MAIN JS
   ============================================================ */
'use strict';

/* --- Theme --- */
const Theme = {
  init(){
    const saved = localStorage.getItem('mg-theme');
    const sys = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    this.apply(saved || sys);
    document.querySelectorAll('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => this.toggle()));
  },
  apply(t){
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('mg-theme', t);
    document.querySelectorAll('[data-theme-toggle]').forEach(b => {
      const i = b.querySelector('i'); if(i) i.className = t==='dark'?'ri-sun-line':'ri-moon-line';
    });
  },
  toggle(){ this.apply(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'); }
};

/* --- RTL --- */
const RTL = {
  init(){
    const saved = localStorage.getItem('mg-dir');
    if(saved) this.apply(saved);
    document.querySelectorAll('[data-rtl-toggle]').forEach(b => b.addEventListener('click', () => this.toggle()));
  },
  apply(d){
    document.documentElement.setAttribute('dir', d);
    localStorage.setItem('mg-dir', d);
    document.querySelectorAll('[data-rtl-toggle]').forEach(b => {
      const i = b.querySelector('i'); if(i) i.className = d==='rtl'?'ri-layout-right-2-line':'ri-layout-left-2-line';
    });
  },
  toggle(){ this.apply((document.documentElement.getAttribute('dir')||'ltr')==='rtl'?'ltr':'rtl'); }
};

/* --- Header / Hamburger --- */
const Header = {
  init(){
    const h = document.getElementById('header');
    const burger = document.getElementById('hamburger');
    const nav = document.getElementById('mobile-nav');
    if(h) window.addEventListener('scroll', () => h.classList.toggle('scrolled', window.scrollY > 60));
    if(burger && nav){
      burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
      });
      nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
        burger.classList.remove('open'); nav.classList.remove('open'); document.body.style.overflow = '';
      }));
    }
    // active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(l => {
      const href = (l.getAttribute('href') || '').split('/').pop();
      if(href === path) l.classList.add('active');
    });
  }
};

/* --- Scroll reveal --- */
const Reveal = {
  init(){
    if(!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in')); return; }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }});
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(e => obs.observe(e));
  }
};

/* --- Counter animation --- */
const Counter = {
  init(){
    if(!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ this.run(e.target); obs.unobserve(e.target); }});
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(e => obs.observe(e));
  },
  run(el){
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const dur = 2000; const start = performance.now();
    const tick = t => {
      const p = Math.min((t-start)/dur,1);
      el.textContent = Math.floor((1-Math.pow(1-p,3))*target) + suffix;
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
};

/* --- Toast --- */
const Toast = {
  show(msg, type='success', dur=4000){
    const t = document.createElement('div');
    const colors = { success:'var(--c-green)', error:'var(--c-red)', info:'var(--c-cyan)' };
    t.innerHTML = `<i class="ri-${type==='success'?'checkbox-circle':'error-warning'}-line"></i><span>${msg}</span>`;
    Object.assign(t.style, {
      position:'fixed', bottom:'24px', right:'24px', zIndex:'9999',
      background: type==='success'?'rgba(16,185,129,0.15)':'rgba(239,68,68,0.15)',
      border:`1px solid ${colors[type]}`, color:'var(--c-text)',
      padding:'12px 18px', borderRadius:'8px',
      display:'flex', alignItems:'center', gap:'10px',
      fontFamily:'var(--f-body)', fontSize:'0.875rem',
      boxShadow:'var(--shadow-lg)', maxWidth:'380px',
      backdropFilter:'blur(12px)'
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), dur);
  }
};

/* --- Form validation --- */
const Validator = {
  rules: {
    required: v => v.trim()!=='' || 'Required',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email',
    password: v => v.length>=8 || 'Min 8 characters',
  },
  init(){
    document.querySelectorAll('form[data-v]').forEach(form => {
      form.addEventListener('submit', e => { if(!this.check(form)) e.preventDefault(); });
      form.querySelectorAll('[data-r]').forEach(f => {
        f.addEventListener('blur', () => this.field(f));
        f.addEventListener('input', () => this.clear(f));
      });
    });
  },
  check(form){ let ok=true; form.querySelectorAll('[data-r]').forEach(f=>{ if(!this.field(f)) ok=false; }); return ok; },
  field(f){
    for(const r of (f.getAttribute('data-r')||'').split(',')){
      const fn = this.rules[r.trim()]; if(!fn) continue;
      const res = fn(f.type==='checkbox'?(f.checked?'checked':''):f.value);
      if(res!==true){ this.err(f,res); return false; }
    }
    this.clear(f); return true;
  },
  err(f,m){ f.classList.add('err'); const e=f.parentElement.querySelector('.form-err'); if(e){e.textContent=m;e.classList.add('show');} },
  clear(f){ f.classList.remove('err'); const e=f.parentElement.querySelector('.form-err'); if(e) e.classList.remove('show'); }
};

/* --- File upload drag-drop --- */
const FileDrop = {
  init(){
    document.querySelectorAll('.file-drop,.upload-zone').forEach(zone => {
      const inp = zone.querySelector('input[type=file]');
      const lbl = zone.querySelector('.file-lbl');
      zone.addEventListener('click', () => inp?.click());
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor='var(--c-cyan)'; });
      zone.addEventListener('dragleave', () => { zone.style.borderColor=''; });
      zone.addEventListener('drop', e => {
        e.preventDefault(); zone.style.borderColor='';
        if(e.dataTransfer.files.length && inp){ inp.files=e.dataTransfer.files; if(lbl) lbl.textContent=e.dataTransfer.files[0].name; }
      });
      inp?.addEventListener('change', () => { if(lbl && inp.files.length) lbl.textContent = inp.files.length===1?inp.files[0].name:`${inp.files.length} files selected`; });
    });
  }
};

/* --- Form submit handlers --- */
const Forms = {
  init(){
    document.getElementById('contact-form')?.addEventListener('submit', e => {
      e.preventDefault(); Toast.show('Message sent! I\'ll respond within 24 hours.'); e.target.reset();
    });
    document.querySelectorAll('.nl-form').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault(); Toast.show('You\'re on the list! Watch your inbox.'); f.reset();
    }));
    document.getElementById('login-form')?.addEventListener('submit', e => { e.preventDefault(); Toast.show('Login requires backend integration.','info'); });
    document.getElementById('register-form')?.addEventListener('submit', e => {
      e.preventDefault();
      const p=document.getElementById('rp'), c=document.getElementById('rc');
      if(p&&c&&p.value!==c.value){ Toast.show('Passwords do not match.','error'); return; }
      if(!document.getElementById('terms')?.checked){ Toast.show('Please accept the terms.','error'); return; }
      Toast.show('Registration requires backend integration.','info');
    });
    // Dashboard upload
    document.getElementById('dash-upload-form')?.addEventListener('submit', e => {
      e.preventDefault(); Toast.show('Concept art uploaded! Modeler will review shortly.'); e.target.reset();
    });
    // Approve button
    document.querySelectorAll('[data-approve]').forEach(btn => btn.addEventListener('click', () => Toast.show('Asset approved and marked ready for download.')));
    document.querySelectorAll('[data-download]').forEach(btn => btn.addEventListener('click', () => Toast.show('Download starting...','info')));
  }
};

/* --- Password strength --- */
const PwdStrength = {
  init(){
    const i=document.getElementById('rp'), b=document.getElementById('sb'), t=document.getElementById('st');
    if(!i) return;
    i.addEventListener('input', () => {
      const v=i.value;
      let s=[v.length>=8,/[A-Z]/.test(v),/[0-9]/.test(v),/[^A-Za-z0-9]/.test(v)].filter(Boolean).length;
      const lvl=[{w:'0%',c:'transparent',t:'At least 8 chars'},{w:'25%',c:'var(--c-red)',t:'Weak'},{w:'50%',c:'var(--c-amber)',t:'Fair'},{w:'75%',c:'var(--c-cyan)',t:'Good'},{w:'100%',c:'var(--c-green)',t:'Strong'}];
      const l=lvl[Math.min(s,4)];
      if(b){b.style.width=l.w;b.style.background=l.c;}
      if(t){t.textContent=l.t;t.style.color=l.c||'var(--c-text3)';}
    });
  }
};

/* --- Pass toggle --- */
const PassToggle = {
  init(){
    document.querySelectorAll('[data-eye]').forEach(btn => {
      const id=btn.getAttribute('data-eye'), inp=document.getElementById(id);
      btn.addEventListener('click', () => {
        const isT = inp.type==='text'; inp.type=isT?'password':'text';
        btn.querySelector('i').className=isT?'ri-eye-line':'ri-eye-off-line';
      });
    });
  }
};

/* --- Back to top --- */
const BackTop = {
  init(){
    const b=document.createElement('button');
    b.innerHTML='<i class="ri-arrow-up-line"></i>';
    b.setAttribute('aria-label','Back to top');
    Object.assign(b.style,{position:'fixed',bottom:'24px',right:'24px',zIndex:'990',width:'42px',height:'42px',borderRadius:'4px',background:'rgba(0,212,255,0.12)',border:'1px solid var(--c-cyan)',color:'var(--c-cyan)',fontSize:'1rem',opacity:'0',pointerEvents:'none',transition:'all .3s',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'});
    document.body.appendChild(b);
    window.addEventListener('scroll', () => { const show=window.scrollY>400; b.style.opacity=show?'1':'0'; b.style.pointerEvents=show?'auto':'none'; });
    b.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  }
};

/* --- Smooth scroll --- */
const SmoothScroll = {
  init(){
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t=document.querySelector(a.getAttribute('href')); if(!t) return;
        e.preventDefault();
        window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});
      });
    });
  }
};

/* --- Dashboard: revision round tabs --- */
const DashTabs = {
  init(){
    document.querySelectorAll('[data-tab-group]').forEach(group => {
      const tabs=group.querySelectorAll('[data-tab]');
      const panels=group.querySelectorAll('[data-panel]');
      tabs.forEach(tab => tab.addEventListener('click', () => {
        const target=tab.getAttribute('data-tab');
        tabs.forEach(t=>t.classList.remove('active'));
        panels.forEach(p=>p.style.display='none');
        tab.classList.add('active');
        const panel=group.querySelector(`[data-panel="${target}"]`);
        if(panel) panel.style.display='';
      }));
    });
  }
};

/* --- Init --- */
document.addEventListener('DOMContentLoaded', () => {
  Theme.init(); RTL.init(); Header.init(); Reveal.init(); Counter.init();
  Validator.init(); FileDrop.init(); Forms.init(); PwdStrength.init();
  PassToggle.init(); BackTop.init(); SmoothScroll.init(); DashTabs.init();
});
