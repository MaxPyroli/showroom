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

  // Liens d'ancre de la page : on défile sans laisser « #… » dans l'adresse, pour que l'animation d'accueil
  // se rejoue au prochain chargement (une adresse avec ancre la désactive)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = a.getAttribute('href').slice(1);
    const target = id === 'top' ? null : document.getElementById(id);
    if (id !== 'top' && !target) return;
    e.preventDefault();
    if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    else scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', location.pathname + location.search);
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
    if (es[0].isIntersecting) { root.style.setProperty('--glow', '#0ca8d8'); links.forEach((a) => a.classList.remove('on')); }
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

  // Bande d'icônes : elles défilent en continu (le nombre d'apps n'a donc pas d'importance)
  const orbitEl = document.querySelector('.orbit');
  const icons = [...orbitEl.querySelectorAll('.ico')];
  const belt = document.createElement('div');
  belt.className = 'belt';
  icons.forEach((el) => belt.append(el));
  orbitEl.append(belt);
  let startBelt = () => {};
  if (reduce) orbitEl.classList.add('still');
  else {
    const gap = parseFloat(getComputedStyle(belt).columnGap) || 0;
    const set = belt.scrollWidth - parseFloat(getComputedStyle(belt).paddingLeft) + gap;   // largeur d'un jeu d'icônes
    const copies = Math.ceil((root.clientWidth + set) / set);
    for (let c = 0; c < copies; c++) icons.forEach((el) => {
      const k = el.cloneNode(true);
      k.setAttribute('aria-hidden', 'true'); k.tabIndex = -1;
      belt.append(k);
    });
    belt.style.setProperty('--set', set + 'px');
    belt.style.setProperty('--belt-t', (set / 45).toFixed(1) + 's');    // ≈ 45 px par seconde
    startBelt = () => orbitEl.classList.add('run');
  }

  // Animation d'accueil : le logo (six tuiles en cercle, toujours le même) attend un instant, puis tourne ;
  // les tuiles des apps prennent le relais, de plus en plus vite (on ne distingue plus leur nombre), puis les icônes se mettent en ligne et défilent
  const runIntro = () => {
    const done = () => root.classList.remove('intro');
    if (!icons.length || reduce || !root.classList.contains('intro')) { done(); startBelt(); return; }
    const vw = root.clientWidth, vh = root.clientHeight;   // sans la barre de défilement
    const L = Math.min(260, vw * 0.6);
    const R = L * 142 / 512, T = L * 112 / 512, n = icons.length;
    const Tn = Math.min(T, 0.92 * 2 * R * Math.sin(Math.PI / n));   // tuiles plus petites si beaucoup d'apps
    const HOLD = 800, SPIN = 4800, D = HOLD + SPIN;   // HOLD : le logo apparaît et attend avant de tourner
    const logoColors = (orbitEl.dataset.logo || '').split(',').filter(Boolean);
    const logo = document.createElement('div');
    logo.className = 'intro-logo';
    logo.style.cssText = `width:${L}px;height:${L}px;left:50%;top:50%;margin:${-L / 2}px 0 0 ${-L / 2}px;border-radius:${L * 113 / 512}px`;
    document.body.append(logo);
    const lr = logo.getBoundingClientRect();
    const cx = lr.left + L / 2, cy = lr.top + L / 2;      // le centre du cercle = le centre du logo
    // positions d'arrivée, mesurées avant que quoi que ce soit ne bouge
    const slots = icons.map((el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2, r.width]; });
    root.classList.add('intro-fly');
    const anims = [];
    const at = (x) => (HOLD + x * SPIN) / D;           // position dans la séquence complète
    // rotation : la vitesse monte jusqu'à l'envol (t = .5) puis retombe
    const G = (t) => (t < .5 ? t * t : .25 + (1 - Math.pow(1 - (t - .5) / .5, 3)) / 6);
    const G1 = G(1), TURNS = 8, N = 520;
    // envol : démarre vite, ralentit en arrivant
    const outCubic = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
    const o = { duration: D, easing: 'linear' };
    const X0 = .2, X1 = .34;          // le logo fixe laisse la place aux tuiles des apps, déjà en pleine vitesse
    // les six tuiles du logo
    const ltiles = logoColors.map((color, i) => {
      const t = document.createElement('i');
      t.className = 'ltile';
      t.style.cssText = `left:${cx - T / 2}px;top:${cy - T / 2}px;width:${T}px;height:${T}px;background:${color}`;
      document.body.append(t);
      const a0 = (-90 + i * 360 / logoColors.length) * Math.PI / 180, frames = [];
      for (let k = 0; k <= N; k++) {
        const tt = k / N, u = Math.max(0, (tt * D - HOLD) / SPIN), th = a0 + Math.PI * 2 * TURNS * G(u) / G1;
        frames.push({ translate: `${(R * Math.cos(th)).toFixed(1)}px ${(R * Math.sin(th)).toFixed(1)}px`, offset: tt });
      }
      anims.push(t.animate(frames, o));
      anims.push(t.animate([{ opacity: 0 }, { opacity: 1, offset: HOLD * .5 / D }, { opacity: 1, offset: at(X0) }, { opacity: 0, offset: at(X1) }, { opacity: 0 }], { ...o, fill: 'forwards' }));
      return t;
    });
    icons.forEach((el, i) => {
      const [fx, fy, size] = slots[i];
      const a0 = (-90 + i * 360 / n) * Math.PI / 180;
      const tile = document.createElement('i');
      tile.className = 'tile';
      tile.style.background = el.dataset.tile || 'var(--a)';
      el.append(tile);
      const frames = [];
      for (let k = 0; k <= N; k++) {
        const t = k / N, u = Math.max(0, (t * D - HOLD) / SPIN), e = outCubic((u - 0.46) / 0.54);
        const th = a0 + Math.PI * 2 * TURNS * G(u) / G1;
        const px = cx + R * Math.cos(th), py = cy + R * Math.sin(th);
        const s = (Tn / size) * (1 - e) + e;
        frames.push({ translate: `${(px * (1 - e) + fx * e - fx).toFixed(1)}px ${(py * (1 - e) + fy * e - fy).toFixed(1)}px`, scale: s.toFixed(3), offset: t });
      }
      anims.push(el.animate(frames, o));
      anims.push(el.animate([{ opacity: 0 }, { opacity: 0, offset: at(X0) }, { opacity: 1, offset: at(X1) }, { opacity: 1 }], o));
      anims.push(el.querySelector('img').animate([{ opacity: 0 }, { opacity: 0, offset: at(.62) }, { opacity: 1 }], o));
      anims.push(tile.animate([{ opacity: 1 }, { opacity: 1, offset: at(.62) }, { opacity: 0 }], { ...o, fill: 'forwards' }));
    });
    // le fond du logo grandit jusqu'à couvrir l'écran et devient le fond de la page
    const pageBg = getComputedStyle(document.body).backgroundColor;
    const cover = 1.7 * Math.max(vw, vh) / L;
    anims.push(logo.animate([
      { opacity: 0, scale: .85, offset: 0 },
      { opacity: 1, scale: 1, offset: HOLD * .5 / D },
      { opacity: 1, scale: 1, offset: (HOLD + .42 * SPIN) / D, easing: 'cubic-bezier(.65,0,.35,1)' },
      { opacity: 1, scale: cover, backgroundColor: pageBg, offset: (HOLD + .76 * SPIN) / D },
      { opacity: 0, scale: cover, backgroundColor: pageBg, offset: (HOLD + .96 * SPIN) / D },
      { opacity: 0, scale: cover, backgroundColor: pageBg, offset: 1 }
    ], { duration: D, easing: 'linear', fill: 'forwards' }));
    // pendant la séquence, on garde la page en haut (sinon le cercle se décalerait) ; rien n'interrompt l'animation
    const stop = (e) => e.preventDefault();
    const stopKeys = (e) => { if ([' ', 'PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp'].includes(e.key)) e.preventDefault(); };
    const keepTop = () => { if (scrollY) scrollTo({ top: 0, behavior: 'instant' }); };
    addEventListener('wheel', stop, { passive: false });
    addEventListener('touchmove', stop, { passive: false });
    addEventListener('keydown', stopKeys);
    addEventListener('scroll', keepTop);
    let ended = false;
    const end = () => {
      if (ended) return; ended = true;
      removeEventListener('wheel', stop); removeEventListener('touchmove', stop);
      removeEventListener('keydown', stopKeys); removeEventListener('scroll', keepTop);
      anims.forEach((a) => a.cancel());
      logo.remove(); ltiles.forEach((t) => t.remove());
      document.querySelectorAll('.orbit .tile').forEach((t) => t.remove());
      root.classList.remove('intro-fly');
      done();
      startBelt();        // les icônes sont à leur place : elles se mettent à défiler sans à-coup
    };
    setTimeout(done, HOLD + SPIN * 0.78);
    anims[0].finished.then(end).catch(end);
    setTimeout(end, D + 600);
  };
  runIntro();

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

  // Maquette Tool Proj : on coche le rond d'un post-it pour le passer en « fait » (barré), et inversement
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.chk');
    if (!b) return;
    const done = b.closest('.note').classList.toggle('done');
    b.setAttribute('aria-pressed', done);
    b.setAttribute('aria-label', done ? 'Marquer comme à faire' : 'Marquer comme fait');
  });

  if (reduce || !fine) return;

  // Icônes du hero : parallaxe à la souris
  const allIcons = [...document.querySelectorAll('.ico')];
  addEventListener('pointermove', (e) => {
    if (root.classList.contains('intro-fly')) return;
    const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
    for (const el of allIcons) {
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
