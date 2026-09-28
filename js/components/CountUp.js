export default class CountUp {
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
