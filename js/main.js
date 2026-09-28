import { projectsData } from './data/projectsData.js';
import LuckyWheel from './components/LuckyWheel.js';
import Typewriter from './components/Typewriter.js';
import CountUp from './components/CountUp.js';


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



document.addEventListener('DOMContentLoaded', () => {
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
});

window.ntModulesLoaded = true;
