(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const yr = new Date().getFullYear();
  if (yr > 2026) document.getElementById('y').textContent = '–' + yr;

  // Apparition au scroll
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // La lueur du fond et le menu suivent la section visible
  const links = [...document.querySelectorAll('.nav nav a')];
  const sections = [...document.querySelectorAll('.app')];
  const glowIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const c = e.target.dataset.glow;
      root.style.setProperty('--glow', c);
      links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
    }
  }, { rootMargin: '-45% 0px -45% 0px' });
  sections.forEach((s) => glowIO.observe(s));
  new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { root.style.setProperty('--glow', '#3aa0ff'); links.forEach((a) => a.classList.remove('on')); }
  }, { rootMargin: '-45% 0px -45% 0px' }).observe(document.querySelector('.hero'));

  // Compteurs du tableau de scores
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const countIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      countIO.unobserve(e.target);
      const target = +e.target.dataset.count;
      if (reduce) { e.target.textContent = target; continue; }
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / 1600);
        e.target.textContent = Math.round(target * ease(p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

  if (reduce || !fine) return;

  // Icônes du hero : parallaxe à la souris
  const icons = [...document.querySelectorAll('.ico')];
  addEventListener('pointermove', (e) => {
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    for (const el of icons) {
      const d = +el.dataset.depth;
      el.style.translate = `${x * d}px ${y * d}px`;
    }
  });

  // Inclinaison 3D des maquettes
  document.querySelectorAll('.tilt').forEach((el) => {
    const base = getComputedStyle(el).transform;
    const start = base === 'none' ? '' : base;
    const stage = el.closest('.stage');
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `${start} rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`;
    });
    stage.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
})();
