// BUNDLED FALLBACK FOR LOCAL FILE:// VIEWING
// Auto-generated from ES6 source modules. Do not edit manually.

// --- js/models/Model.js ---
class Model {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}


// --- js/models/Project.js ---
class Project extends Model {
  #url;
  #desc;
  #tech;
  #grad;
  #image;
  #emoji;

  constructor(data) {
    super(data.id, data.name);
    this.#url = data.url;
    this.#desc = data.desc;
    this.#tech = data.tech || [];
    this.#grad = data.grad || ['#000', '#fff'];
    this.#image = data.image || null;
    this.#emoji = data.emoji || null;
  }

  // Encapsulation - only expose what's needed via getters
  get url() { return this.#url; }
  get desc() { return this.#desc; }
  get tech() { return [...this.#tech]; } // Return a copy for immutability
  get grad() { return [...this.#grad]; }
  get image() { return this.#image; }
  get emoji() { return this.#emoji; }
}


// --- js/data/projectsData.js ---
const projectsData = [
  new Project({
    id: 'digitaltryghed',
    name: 'Digital Tryghed',
    url: 'https://niktho01.github.io/Digitaltryghed/',
    desc: 'En cybersikkerhedsplatform der gør digital sikkerhed enkelt og tilgængeligt for alle. Bygget med fokus på UX og interaktiv læring.',
    tech: ['HTML', 'CSS', 'JavaScript', 'DOM', 'Inter Font'],
    grad: ['#4f6ef7', '#8b5cf6'],
    image: 'images/shield.png'
  }),
  new Project({
    id: 'danitrading',
    name: 'Dani Trading A/S',
    url: 'https://niktho01.github.io/DanitradingdkAS/',
    desc: 'B2B webshop og firmapræsentation for Dani Trading A/S med 10.000+ varenumre, SEO og bæredygtighedsfokus.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Responsivt Design'],
    grad: ['#f97316', '#eab308'],
    image: 'images/DT_logo_transparent.png'
  }),
  new Project({
    id: 'groentildaglig',
    name: 'Grøn Til Daglig',
    url: 'https://niktho01.github.io/Groentildaglig/',
    desc: 'Bæredygtig livsstilsguide med tips om madspild, genbrug og grønne hverdagsvaner. Stærkt WCAG-fokus og semantisk HTML.',
    tech: ['HTML', 'CSS', 'WCAG', 'ARIA', 'Semantisk HTML'],
    grad: ['#22c55e', '#14b8a6'],
    image: 'images/Groentildagliglogo.png'
  }),
  new Project({
    id: 'kystnaer',
    name: 'Kystnær',
    url: 'https://niktho01.github.io/Kystnaer/',
    desc: 'E-commerce site for håndlavet dansk kyst-sæbe og shampoo med hero-video, topbar slider og avanceret mobilmenu.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Video', 'E-commerce UX'],
    grad: ['#14b8a6', '#4f6ef7'],
    image: 'images/logokyst_circle.jpg'
  })
];



class LuckyWheel {
  constructor(canvasId, data) {
    this.canvas   = document.getElementById(canvasId);
    this.ctx      = this.canvas.getContext('2d');
    this.data     = data;
    this.data.forEach(p => {
      if (p.image) {
        p.imgEl = new Image();
        p.imgEl.src = p.image;
        p.imgEl.onload = () => this.draw();
      }
    });
    this.n        = data.length;
    this.arc      = (2 * Math.PI) / this.n;
    this.rotation = 0;
    this.spinning = false;
    this.btn      = document.getElementById('spin-btn');
    this._resize();
    this.draw();
    this.btn.addEventListener('click', () => this.spin());
    this._buildMiniCards();
    window.addEventListener('resize', () => { this._resize(); this.draw(); });
  }

  _resize() {
    const s = Math.min(400, window.innerWidth < 950 ? Math.min(300, window.innerWidth - 60) : 400);
    this.canvas.width  = s;
    this.canvas.height = s;
    this.cx = s / 2;
    this.cy = s / 2;
    this.R  = s / 2 - 6;
  }

  draw(rot) {
    const r = (rot !== undefined) ? rot : this.rotation;
    const { ctx, cx, cy, R, n, arc } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

   
    const glow = ctx.createRadialGradient(cx, cy, R - 8, cx, cy, R + 14);
    glow.addColorStop(0, 'rgba(79,110,247,0.7)');
    glow.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, R + 14, 0, 2 * Math.PI);
    ctx.fillStyle = glow;
    ctx.fill();

   
    this.data.forEach((proj, i) => {
      const start = r + i * arc - Math.PI / 2;
      const end   = start + arc;
      const mid   = start + arc / 2;

      

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, start, end);
      ctx.closePath();
      ctx.fillStyle = proj.grad[0];
      ctx.fill();

      /* segment border */
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, start, end);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth   = 2;
      ctx.stroke();

      
      const er  = R * 0.62;
      const ex  = cx + Math.cos(mid) * er;
      const ey  = cy + Math.sin(mid) * er;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(mid + Math.PI / 2);

    
      if (proj.imgEl && proj.imgEl.complete) {
        const imgSize = Math.max(24, this.canvas.width / 10);
        const ix = 0;
        const iy = -R * 0.1;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ix, iy, imgSize / 2, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(proj.imgEl, ix - imgSize/2, iy - imgSize/2, imgSize, imgSize);
        ctx.restore();
      } else if (proj.emoji) {
        const efs = Math.max(18, this.canvas.width / 16);
        ctx.font = efs + 'px serif';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(proj.emoji, 0, -R * 0.1);
      }

      
      const lfs = Math.max(10, this.canvas.width / 36);
      ctx.font = '700 ' + lfs + 'px Inter, sans-serif';
      ctx.fillStyle = '#000000';
      ctx.shadowColor = 'rgba(255,255,255,0.4)';
      ctx.shadowBlur  = 3;
      ctx.fillText(proj.name.split(' ')[0], 0, R * 0.14);
      ctx.shadowBlur = 0;
      ctx.restore();
    });

   
    const hub = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.16);
    hub.addColorStop(0, '#ffffff');
    hub.addColorStop(1, '#e0e0f0');
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.16, 0, 2 * Math.PI);
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur  = 14;
    ctx.fillStyle   = hub;
    ctx.fill();
    ctx.shadowBlur  = 0;

    const hfs = Math.max(10, this.canvas.width / 28);
    ctx.font = '800 ' + hfs + 'px Space Grotesk, sans-serif';
    ctx.fillStyle    = '#4f6ef7';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NT', cx, cy);
  }

  spin() {
    if (this.spinning) return;
    this.spinning = true;
    this.btn.disabled = true;

    const idx   = Math.floor(Math.random() * this.n);
    
    const tgt   = -(idx * this.arc) - Math.PI / this.n;
    const extra = (6 + Math.random() * 4) * 2 * Math.PI;
    const final = tgt + extra;
    const dur   = 4800 + Math.random() * 1400;
    const t0    = performance.now();
    const r0    = this.rotation;
    const ease  = t => 1 - Math.pow(1 - t, 4); /* quartic ease-out */

    const tick = now => {
      const p  = Math.min((now - t0) / dur, 1);
      this.rotation = r0 + (final - r0) * ease(p);
      this.draw(this.rotation);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        
        this.rotation = ((this.rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        this.spinning = false;
        this.btn.disabled = false;
      
        const winner = Math.floor((2 * Math.PI - this.rotation) * this.n / (2 * Math.PI)) % this.n;
        this._showProject(winner);
        this._highlight(winner);
      }
    };
    requestAnimationFrame(tick);
  }

  _showProject(idx) {
    const p = this.data[idx];
    document.getElementById('ws-placeholder').classList.add('hidden');
    const pp = document.getElementById('project-preview');
    pp.classList.remove('hidden');
    document.getElementById('pp-url').textContent  = p.url;
    document.getElementById('pp-name').textContent = p.name;
    document.getElementById('pp-desc').textContent = p.desc;
    document.getElementById('pp-link').href = p.url;
    document.getElementById('pp-tags').innerHTML = p.tech.map(t => '<span class="ptag">' + t + '</span>').join('');
    const iframe = document.getElementById('pp-iframe');
    iframe.src = '';
    setTimeout(() => { iframe.src = p.url; }, 100);
    document.getElementById('ws-right').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  _highlight(idx) {
    document.querySelectorAll('.mini-card').forEach((c, i) => c.classList.toggle('active', i === idx));
  }

  _buildMiniCards() {
    const grid = document.getElementById('mini-grid');
    grid.innerHTML = this.data.map((p, i) =>
      '<div class="mini-card" data-i="' + i + '" id="mc-' + p.id + '" tabindex="0" role="button" aria-label="Vis ' + p.name + '">' +
        '<div class="mini-thumb"><iframe src="' + p.url + '" title="' + p.name + ' preview" loading="lazy" tabindex="-1" aria-hidden="true"></iframe></div>' +
        '<div class="mini-info"><span class="mini-title">' + (p.image ? '<img src="' + p.image + '" alt="" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle; margin-right: 6px;">' : '') + p.name + '</span><p>' + p.tech.slice(0,3).join(' &middot; ') + '</p></div>' +
      '</div>'
    ).join('');

    grid.querySelectorAll('.mini-card').forEach(card => {
      const click = () => {
        const i = +card.dataset.i;
        this._showProject(i);
        this._highlight(i);
      };
      card.addEventListener('click', click);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); click(); } });
    });
  }
}



class Typewriter {
  constructor(elementId, roles, typeSpeed = 90, deleteSpeed = 55, pause = 1900) {
    this.el = document.getElementById(elementId);
    this.roles = roles;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pause = pause;
    this.ri = 0;
    this.ci = 0;
    this.del = false;

    if (this.el) {
      setTimeout(() => this.tick(), 900);
    }
  }

  tick() {
    const w = this.roles[this.ri];
    if (!this.del) {
      this.el.textContent = w.slice(0, ++this.ci);
      if (this.ci === w.length) {
        this.del = true;
        return setTimeout(() => this.tick(), this.pause);
      }
    } else {
      this.el.textContent = w.slice(0, --this.ci);
      if (this.ci === 0) {
        this.del = false;
        this.ri = (this.ri + 1) % this.roles.length;
        return setTimeout(() => this.tick(), 350);
      }
    }
    setTimeout(() => this.tick(), this.del ? this.deleteSpeed : this.typeSpeed);
  }
}



class CountUp {
  static initAll(selector = '.sc-num[data-target]', duration = 1200, threshold = 0.4) {
    document.querySelectorAll(selector).forEach(el => {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          const tgt = +el.dataset.target;
          let v = 0;
          const step = tgt / (duration / 16);
          const t = setInterval(() => {
            v = Math.min(v + step, tgt);
            el.textContent = Math.floor(v);
            if (v >= tgt) clearInterval(t);
          }, 16);
          obs.disconnect();
        }
      }, { threshold });
      obs.observe(el);
    });
  }
}



const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));


const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 90);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => ro.observe(el));



  new Typewriter('typewriter', ['Web Developer','UI/UX Designer','Creative Coder','Multimediedesigner']);
  CountUp.initAll('.sc-num[data-target]', 1200, 0.4);
  CountUp.initAll('#hb-big-num', 2000, 0.5);

  new LuckyWheel('wcanvas', projectsData);

 
  const dmBtn = document.getElementById('dm-toggle');
  const html  = document.documentElement;
  // Load saved preference
  const saved = localStorage.getItem('nt-theme');
  if (saved) html.setAttribute('data-theme', saved);
  if (dmBtn) {
    dmBtn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('nt-theme', next);
    });
  }

 
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
  const sdLinks  = document.querySelectorAll('.sd');
  const sectionEls = sections.map(id => document.getElementById(id));

  function updateDots() {
    let current = 0;
    sectionEls.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        current = i;
      }
    });
    sdLinks.forEach((link, i) => link.classList.toggle('active', i === current));
  }
  window.addEventListener('scroll', updateDots, { passive: true });
  updateDots();

  
  function applyTilt() {
    document.querySelectorAll('.mini-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);
        const rotX = -dy * 10;
        const rotY =  dx * 10;
        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform .4s var(--ease), border-color .3s, box-shadow .3s';
        setTimeout(() => { card.style.transition = ''; }, 400);
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'border-color .3s, box-shadow .3s';
      });
    });
  }
  
  setTimeout(applyTilt, 500);


window.ntModulesLoaded = true;