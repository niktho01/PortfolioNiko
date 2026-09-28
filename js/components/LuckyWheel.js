export default class LuckyWheel {
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

    /* Outer glow ring */
    const glow = ctx.createRadialGradient(cx, cy, R - 8, cx, cy, R + 14);
    glow.addColorStop(0, 'rgba(79,110,247,0.7)');
    glow.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, R + 14, 0, 2 * Math.PI);
    ctx.fillStyle = glow;
    ctx.fill();

    /* Segments */
    this.data.forEach((proj, i) => {
      const start = r + i * arc - Math.PI / 2;
      const end   = start + arc;
      const mid   = start + arc / 2;

      /* solid fill */

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

      /* emoji + label */
      const er  = R * 0.62;
      const ex  = cx + Math.cos(mid) * er;
      const ey  = cy + Math.sin(mid) * er;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(mid + Math.PI / 2);

      /* image or emoji */
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

      /* label */
      const lfs = Math.max(10, this.canvas.width / 36);
      ctx.font = '700 ' + lfs + 'px Inter, sans-serif';
      ctx.fillStyle = '#000000';
      ctx.shadowColor = 'rgba(255,255,255,0.4)';
      ctx.shadowBlur  = 3;
      ctx.fillText(proj.name.split(' ')[0], 0, R * 0.14);
      ctx.shadowBlur = 0;
      ctx.restore();
    });

    /* Center hub */
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
    /* angle so midpoint of segment `idx` lands at pointer (top = -PI/2) */
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
        /* Normalize rotation to [0, 2Ï€) â€” avoids negative modulo issues */
        this.rotation = ((this.rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        this.spinning = false;
        this.btn.disabled = false;
        /* Compute which segment is actually under the pointer from final rotation.
           Pointer is at angle -Ï€/2 (top). Segment i starts at: rot + i*arc - Ï€/2.
           Winner = floor((2Ï€ - rot) * n / 2Ï€) % n                               */
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





