(function () {
  const overlay = document.getElementById('dice-overlay');
  const btn = document.getElementById('dice-btn');
  if (!btn || !overlay) return;

  const ctx = overlay.getContext('2d');
  let W = 0, H = 0;

  function resize() {
    W = overlay.width = window.innerWidth * devicePixelRatio;
    H = overlay.height = window.innerHeight * devicePixelRatio;
    overlay.style.width = window.innerWidth + 'px';
    overlay.style.height = window.innerHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  // ---------- effects ----------

  function confetti() {
    const colors = ['#ffffff', '#fdc114', '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'];
    const pieces = [];
    const r = btn.getBoundingClientRect();
    const ox = r.left + r.width / 2;
    const oy = r.top + r.height / 2;
    for (let i = 0; i < 80; i++) {
      pieces.push({
        x: ox, y: oy,
        vx: (Math.random() - 0.5) * 10,
        vy: -Math.random() * 8 - 3,
        g: 0.25,
        life: 120,
        color: colors[(Math.random() * colors.length) | 0],
        size: 3 + Math.random() * 4,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
      });
    }
    const step = () => {
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      let alive = false;
      for (const p of pieces) {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        if (p.life > 0 && p.y < window.innerHeight + 20) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 60));
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
          ctx.restore();
        }
      }
      if (alive) requestAnimationFrame(step);
      else ctx.clearRect(0, 0, overlay.width, overlay.height);
    };
    requestAnimationFrame(step);
  }

  function tilt() {
    document.body.style.transition = 'transform 0.5s cubic-bezier(.2,.9,.2,1.2)';
    document.body.style.transform = 'rotate(1.2deg)';
    setTimeout(() => { document.body.style.transform = 'rotate(0)'; }, 500);
    setTimeout(() => {
      document.body.style.transition = '';
      document.body.style.transform = '';
    }, 1100);
  }

  function colorShuffle() {
    const palettes = ['#fdc114', '#e85d75', '#5ac8fa', '#7ddf64', '#b983ff', '#ff9f1c'];
    const orig = getComputedStyle(document.body).backgroundColor;
    document.body.style.transition = 'background-color 0.35s ease';
    let i = 0;
    const iv = setInterval(() => {
      document.body.style.background = palettes[i % palettes.length];
      i++;
      if (i >= 6) {
        clearInterval(iv);
        setTimeout(() => {
          document.body.style.background = '';
          setTimeout(() => { document.body.style.transition = ''; }, 400);
        }, 350);
      }
    }, 350);
  }

  function matrixRain() {
    const chars = 'FARSHADKURDI01کوردی';
    const fontSize = 16;
    const cols = Math.ceil(window.innerWidth / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -20);
    let frames = 0;
    const total = 120;
    const step = () => {
      ctx.fillStyle = 'rgba(253, 193, 20, 0.12)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = '#ffffff';
      ctx.font = fontSize + 'px VT323, monospace';
      for (let i = 0; i < cols; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
      }
      frames++;
      if (frames < total) requestAnimationFrame(step);
      else {
        // fade out
        let a = 1;
        const fade = () => {
          a -= 0.05;
          ctx.fillStyle = 'rgba(253, 193, 20, ' + (1 - a) + ')';
          ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
          if (a > 0) requestAnimationFrame(fade);
          else ctx.clearRect(0, 0, overlay.width, overlay.height);
        };
        requestAnimationFrame(fade);
      }
    };
    requestAnimationFrame(step);
  }

  function glitch() {
    const roles = document.querySelector('.roles');
    if (!roles) return;
    const orig = roles.style.cssText;
    let frames = 0;
    const iv = setInterval(() => {
      const dx = (Math.random() - 0.5) * 8;
      const dy = (Math.random() - 0.5) * 4;
      roles.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      roles.style.filter = 'hue-rotate(' + ((Math.random() * 360) | 0) + 'deg)';
      frames++;
      if (frames > 16) {
        clearInterval(iv);
        roles.style.cssText = orig;
      }
    }, 60);
  }

  function fallingEmoji() {
    const emoji = '🔥';
    const items = [];
    for (let i = 0; i < 18; i++) {
      items.push({
        x: Math.random() * window.innerWidth,
        y: -40 - Math.random() * 200,
        vy: 2 + Math.random() * 3,
        vr: (Math.random() - 0.5) * 0.2,
        rot: 0,
        size: 20 + Math.random() * 20,
        life: 240,
      });
    }
    const step = () => {
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      let alive = false;
      for (const p of items) {
        p.y += p.vy;
        p.rot += p.vr;
        p.life--;
        if (p.life > 0 && p.y < window.innerHeight + 40) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.font = p.size + 'px serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(emoji, 0, 0);
          ctx.restore();
        }
      }
      if (alive) requestAnimationFrame(step);
      else ctx.clearRect(0, 0, overlay.width, overlay.height);
    };
    requestAnimationFrame(step);
  }

  const QUOTES = [
    "'Know thyself.' — Socrates",
    "'The only true wisdom is in knowing you know nothing.' — Socrates",
    "'We are what we repeatedly do.' — Aristotle",
    "'He who has a why to live can bear almost any how.' — Nietzsche",
    "'I think, therefore I am.' — Descartes",
    "'The impediment to action advances action.' — Marcus Aurelius",
    "'Simplicity is the ultimate sophistication.' — da Vinci",
    "'Whereof one cannot speak, thereof one must be silent.' — Wittgenstein",
  ];

  function wisdomRoll() {
    const bq = document.querySelector('.quote blockquote');
    if (!bq) return;
    const orig = bq.textContent;
    const pick = QUOTES[(Math.random() * QUOTES.length) | 0];
    bq.style.transition = 'opacity 0.3s ease';
    bq.style.opacity = '0';
    setTimeout(() => {
      bq.textContent = pick;
      bq.style.opacity = '1';
      setTimeout(() => {
        bq.style.opacity = '0';
        setTimeout(() => {
          bq.textContent = orig;
          bq.style.opacity = '1';
          setTimeout(() => { bq.style.transition = ''; }, 400);
        }, 400);
      }, 5000);
    }, 350);
  }

  function pixelate() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    let k = 0;
    logo.style.transition = 'filter 0.1s linear';
    const iv = setInterval(() => {
      logo.style.filter = 'blur(' + (k % 10) + 'px) contrast(' + (1 + (k % 5) * 0.3) + ')';
      k++;
      if (k > 24) {
        clearInterval(iv);
        logo.style.filter = '';
        setTimeout(() => { logo.style.transition = ''; }, 200);
      }
    }, 70);
  }

  function tetromino() {
    const colors = ['#00f0f0', '#f0a000', '#f0f000', '#00f000', '#a000f0', '#f00000', '#0000f0'];
    const shapes = [
      [[1,1,1,1]],
      [[1,1],[1,1]],
      [[0,1,0],[1,1,1]],
      [[1,0,0],[1,1,1]],
      [[0,0,1],[1,1,1]],
    ];
    const cell = 20;
    const shape = shapes[(Math.random() * shapes.length) | 0];
    const color = colors[(Math.random() * colors.length) | 0];
    const w = shape[0].length * cell;
    const x = window.innerWidth - 80 - w;
    let y = -shape.length * cell;
    const targetY = window.innerHeight - 60 - shape.length * cell;
    const step = () => {
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      y += 10;
      const drawY = Math.min(y, targetY);
      ctx.fillStyle = color;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[0].length; c++) {
          if (shape[r][c]) {
            ctx.fillRect(x + c * cell, drawY + r * cell, cell - 2, cell - 2);
          }
        }
      }
      if (y < targetY) requestAnimationFrame(step);
      else setTimeout(() => ctx.clearRect(0, 0, overlay.width, overlay.height), 900);
    };
    requestAnimationFrame(step);
  }

  const EFFECTS = [confetti, tilt, colorShuffle, matrixRain, glitch, fallingEmoji, wisdomRoll, pixelate, tetromino];

  let lastIdx = -1;
  btn.addEventListener('click', () => {
    let i;
    do { i = (Math.random() * EFFECTS.length) | 0; } while (i === lastIdx && EFFECTS.length > 1);
    lastIdx = i;
    // small dice spin
    btn.style.transition = 'transform 0.5s ease';
    btn.style.transform = 'rotate(' + (360 + (Math.random() * 180 | 0)) + 'deg) scale(1.15)';
    setTimeout(() => { btn.style.transform = ''; }, 500);
    setTimeout(() => { btn.style.transition = ''; }, 1000);
    try { EFFECTS[i](); } catch (e) { /* never let one effect crash the dice */ }
  });
})();
