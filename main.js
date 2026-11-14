/* Portfolio interactions. Original features are retained and hardened. */
document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const navbar = document.querySelector('.navbar');
  const menuButton = document.getElementById('menu-icon');
  const navMenu = document.getElementById('primary-navigation');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  const scrollTop = document.querySelector('.scroll-top');
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const typewriter = document.getElementById('typewriter');
  if (typewriter && typeof Typed !== 'undefined') {
    new Typed('#typewriter', { strings: ['Frontend Development','Full Stack Applications','Modern UI/UX Designs','Database-Driven Systems','Responsive Websites','Interactive Experiences'], typeSpeed: 65, backSpeed: 42, backDelay: 1400, loop: true, showCursor: true, cursorChar: '|' });
  } else if (typewriter) typewriter.textContent = 'Frontend Development';

  const closeMenu = () => {
    navMenu?.classList.remove('active');
    menuButton?.setAttribute('aria-expanded','false');
    const icon = menuButton?.querySelector('i');
    if (icon) icon.className = 'bx bx-menu';
  };
  menuButton?.addEventListener('click', () => {
    const open = navMenu?.classList.toggle('active') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
    const icon = menuButton.querySelector('i');
    if (icon) icon.className = open ? 'bx bx-x' : 'bx bx-menu';
  });
  navMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => { if (navMenu?.classList.contains('active') && !navbar?.contains(e.target)) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') { e.preventDefault(); return; }
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'}); }
  }));

  const updateScroll = () => {
    const scrolled = window.scrollY > 24;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrolled);
      navbar.style.background = scrolled ? (html.dataset.theme === 'dark' ? 'rgba(23,17,38,.96)' : 'rgba(255,255,255,.96)') : '';
      navbar.style.backdropFilter = scrolled ? 'blur(18px)' : '';
    }
    scrollTop?.classList.toggle('show', window.scrollY > 420);
  };
  window.addEventListener('scroll', updateScroll, {passive:true}); updateScroll();

  // Particle animation with safe initial pointer coordinates and resize handling.
  const canvas = document.querySelector('.particles-canvas');
  if (canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let w=0,h=0,frame=0; const particles=[]; const pointer={x:-1000,y:-1000};
      const resize=()=>{ const rect=canvas.getBoundingClientRect(); const dpr=Math.min(devicePixelRatio||1,2); w=rect.width||innerWidth; h=rect.height||innerHeight; canvas.width=Math.floor(w*dpr); canvas.height=Math.floor(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); };
      class Particle { constructor(){this.x=Math.random()*w;this.y=Math.random()*h;this.bx=this.x;this.by=this.y;this.r=Math.random()*2+1;this.d=Math.random()*18+5;} update(){const dx=pointer.x-this.bx,dy=pointer.y-this.by,dist=Math.hypot(dx,dy);if(dist>0&&dist<115){const f=(115-dist)/115;this.x=this.bx-dx/dist*f*this.d;this.y=this.by-dy/dist*f*this.d;}else{this.x+=(this.bx-this.x)*.08;this.y+=(this.by-this.y)*.08;}} draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=html.dataset.theme==='dark'?'rgba(196,163,255,.55)':'rgba(124,58,237,.34)';ctx.fill();} }
      resize(); for(let i=0;i<Math.min(72,Math.floor(innerWidth/18));i++) particles.push(new Particle());
      const animate=()=>{ctx.clearRect(0,0,w,h);particles.forEach(p=>{p.update();p.draw();});for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const a=particles[i],b=particles[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<105){ctx.beginPath();ctx.strokeStyle=html.dataset.theme==='dark'?`rgba(196,163,255,${.18*(1-d/105)})`:`rgba(124,58,237,${.14*(1-d/105)})`;ctx.lineWidth=1;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}frame=requestAnimationFrame(animate);};
      canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;});
      canvas.addEventListener('mouseleave',()=>{pointer.x=-1000;pointer.y=-1000;});
      window.addEventListener('resize',()=>{cancelAnimationFrame(frame);resize();particles.forEach(p=>{p.bx=Math.random()*w;p.by=Math.random()*h;p.x=p.bx;p.y=p.by;});animate();},{passive:true}); animate();
    }
  }

  // Scroll reveal
  const revealTargets=document.querySelectorAll('.section-header,.about-grid,.skills-preview,.service-card,.skills-category,.project-card,.contact-wrapper');
  if ('IntersectionObserver' in window) { const io=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'}); revealTargets.forEach(el=>{el.classList.add('reveal-on-scroll');io.observe(el);}); }

  // Light is the default theme; dark mode remains available via the original toggle.
  const setTheme=theme=>{html.dataset.theme=theme;if(themeIcon)themeIcon.className=theme==='dark'?'bx bx-sun theme-icon':'bx bx-moon theme-icon';themeToggle?.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');themeToggle?.setAttribute('title',theme==='dark'?'Switch to light theme':'Switch to dark theme');};
  let saved='light';try{saved=localStorage.getItem('portfolio-theme')||'light';}catch(e){} setTheme(saved==='dark'?'dark':'light');
  themeToggle?.addEventListener('click',()=>{const next=html.dataset.theme==='dark'?'light':'dark';setTheme(next);try{localStorage.setItem('portfolio-theme',next);}catch(e){}});

  // Project filters
  const cards=[...document.querySelectorAll('.project-card')], filters=[...document.querySelectorAll('.filter-btn')];
  const filterProjects=filter=>cards.forEach((card,i)=>{const show=filter==='all'||card.dataset.category===filter;card.hidden=!show;card.classList.toggle('animate',show);if(show)card.style.animationDelay=`${i*70}ms`;});
  filters.forEach(btn=>{btn.addEventListener('click',()=>{filters.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});btn.classList.add('active');btn.setAttribute('aria-pressed','true');filterProjects(btn.dataset.filter||'all');});btn.setAttribute('aria-pressed',btn.classList.contains('active')?'true':'false');});filterProjects('all');

  // Original service-card tilt feature, enabled only for mouse/trackpad users.
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.transform=`perspective(900px) rotateX(${(.5-y)*5}deg) rotateY(${(x-.5)*5}deg) translateY(-4px)`;});card.addEventListener('mouseleave',()=>card.style.transform='');});

  // Contact form validates and opens the user's mail client (no server endpoint is configured).
  const form=document.querySelector('.contact-form');
  if(form){const status=document.createElement('p');status.className='form-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.appendChild(status);form.addEventListener('submit',e=>{e.preventDefault();status.textContent='';let valid=true;[{name:'name',message:'Please enter your name.'},{name:'email',message:'Please enter a valid email address.'},{name:'message',message:'Please enter a message.'}].forEach(f=>{const input=form.elements[f.name],error=input?.parentElement?.querySelector('.error-message');let msg=!input?.value.trim()?f.message:'';if(f.name==='email'&&input?.value.trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()))msg='Please enter a valid email address.';if(error){error.textContent=msg;error.classList.toggle('show',!!msg);}input?.setAttribute('aria-invalid',String(!!msg));if(msg)valid=false;});if(!valid){status.textContent='Please correct the highlighted fields.';return;}const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),subject=form.elements.subject.value.trim()||`Portfolio enquiry from ${name}`,body=`Name: ${name}\nEmail: ${email}\n\n${form.elements.message.value.trim()}`;status.textContent='Opening your email application to send this message.';window.location.href=`mailto:artbrand254@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;});}

  scrollTop?.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  document.querySelectorAll('.btn-primary,.btn-secondary,.btn-link').forEach(btn=>{btn.addEventListener('pointerdown',()=>btn.classList.add('is-pressed'));['pointerup','pointerleave','blur'].forEach(type=>btn.addEventListener(type,()=>btn.classList.remove('is-pressed')));});
});
