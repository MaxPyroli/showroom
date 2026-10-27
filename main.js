(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const yr = new Date().getFullYear();
  const y = document.getElementById('y');
  if (y && yr > 2026) y.textContent = '–' + yr;

  // Thème clair / sombre : suit le système, le bouton permet de forcer l'autre
  const applyTheme = (t) => {
    root.dataset.theme = t;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#f4f6fb' : '#0b0d14');
    document.querySelectorAll('img[data-light]').forEach((img) => {
      const want = t === 'light' ? img.dataset.light : img.dataset.dark;
      if (!img.src.endsWith(want)) img.src = want;
    });
  };
  applyTheme(root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  document.querySelector('.tbtn')?.addEventListener('click', () => {
    const t = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  });

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
  const hero = document.querySelector('.hero');
  if (hero) new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { root.style.setProperty('--glow', '#3aa0ff'); links.forEach((a) => a.classList.remove('on')); }
  }, { rootMargin: '-45% 0px -45% 0px' }).observe(hero);

  // Carrousels : flèches, points, balayage tactile et clavier
  document.querySelectorAll('[data-car]').forEach((car) => {
    const track = car.querySelector('.track');
    const slides = [...track.children];
    const dots = [...car.querySelectorAll('.dot')];
    const prev = car.querySelector('.prev'), next = car.querySelector('.next');
    const behavior = reduce ? 'auto' : 'smooth';
    let cur = -1;
    const show = (i) => {
      if (i === cur) return;
      cur = i;
      slides.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };
    const go = (i) => track.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * track.clientWidth, behavior });
    let raf = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => show(Math.round(track.scrollLeft / track.clientWidth)));
    }, { passive: true });
    prev.addEventListener('click', () => go(cur - 1));
    next.addEventListener('click', () => go(cur + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    car.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    });
    addEventListener('resize', () => track.scrollTo({ left: cur * track.clientWidth, behavior: 'auto' }));
    show(0);
  });

  // Agrandissement d'une capture au clic
  document.querySelectorAll('.slot .part.has').forEach((fig) => {
    fig.addEventListener('click', () => {
      const img = fig.querySelector('img');
      const z = document.createElement('div');
      z.className = 'zoom';
      z.innerHTML = '<img alt="">';
      z.firstChild.src = img.currentSrc || img.src; z.firstChild.alt = img.alt;
      z.onclick = () => z.remove();
      document.body.append(z);
    });
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelector('.zoom')?.remove(); });

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
    const stage = el.closest('.stage, .shotarea');
    if (!stage) return;
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `${start} rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`;
    });
    stage.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
})();
