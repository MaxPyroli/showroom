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

  // Rangée d'icônes : écart fixe entre deux icônes (jamais de chevauchement), quel que soit leur nombre ;
  // celles qui ne tiennent pas dans la largeur arrivent ensuite par le défilement
  const orbitEl = document.querySelector('.orbit');
  const layoutRow = () => {
    if (reduce) return;                                  // mouvement réduit : disposition d'origine, toutes visibles
    const list = [...orbitEl.querySelectorAll('.ico')].filter((el) => !el.hasAttribute('aria-hidden'));
    if (!list.length) return;
    const W = orbitEl.clientWidth, w = list[0].offsetWidth;
    list.forEach((el, i) => { el.style.left = (0.02 * W + i * w * 1.6).toFixed(1) + 'px'; });
  };
  layoutRow();

  // Défilement : une fois les icônes en ligne (rien ne bouge à ce moment-là), la rangée défile vers la gauche
  // en boucle, pour que toutes les icônes passent, quel que soit leur nombre
  let marquee = null;
  const startMarquee = (phase = 0) => {
    if (marquee || reduce) return;
    const originals = [...orbitEl.querySelectorAll('.ico')];
    if (originals.length < 2) return;
    const W = orbitEl.clientWidth, w = originals[0].offsetWidth, n = originals.length;
    const lefts = originals.map((el) => el.offsetLeft);
    const step = (lefts[n - 1] - lefts[0]) / (n - 1), P = n * step;      // largeur d'un « tour » de la rangée
    const belt = document.createElement('div');
    belt.className = 'belt';
    orbitEl.append(belt);
    originals.forEach((el) => belt.append(el));
    const items = originals.map((el, i) => ({ el, x: lefts[i] }));
    for (let k = 1; k * P < W + w + P; k++) originals.forEach((el, i) => {
      const c = el.cloneNode(true);
      c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1;
      c.style.left = (lefts[i] + k * P) + 'px';
      belt.append(c);
      items.push({ el: c, x: lefts[i] + k * P });
    });
    orbitEl.classList.add('run');
    const dur = P / 45 * 1000;                                            // ≈ 45 px par seconde
    const anim = belt.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-P}px)` }], { duration: dur, iterations: Infinity, easing: 'linear' });
    const pause = () => anim.pause(), play = () => anim.play();
    orbitEl.addEventListener('pointerenter', pause);
    orbitEl.addEventListener('pointerleave', play);
    orbitEl.addEventListener('pointercancel', play);
    let raf = 0;
    const tick = () => {
      const sh = (anim.currentTime % dur) / dur * P;
      for (const it of items) {                                           // une icône s'efface en sortant, et apparaît en entrant
        const x0 = it.x - sh, x1 = x0 + w;
        const f = Math.max(0, Math.min(1, 1 + x0 / w, 1 - (x1 - W) / w));
        const g = 1 - Math.min(1, sh / w) * (1 - f);                      // l'effacement s'installe progressivement (pas de saut au départ)
        it.el.style.opacity = g < 1 ? g.toFixed(2) : '';
      }
      raf = requestAnimationFrame(tick);
    };
    anim.currentTime = phase * dur;                                       // reprise là où on en était après un redimensionnement
    tick();
    marquee = {
      W,
      phase: () => (anim.currentTime % dur) / dur,
      stop() {
        cancelAnimationFrame(raf); anim.cancel();
        orbitEl.removeEventListener('pointerenter', pause); orbitEl.removeEventListener('pointerleave', play); orbitEl.removeEventListener('pointercancel', play);
        items.forEach((it) => { if (it.el.hasAttribute('aria-hidden')) it.el.remove(); else { it.el.style.opacity = ''; orbitEl.append(it.el); } });
        belt.remove(); orbitEl.classList.remove('run');
      }
    };
  };
  let rs;
  addEventListener('resize', () => {                                      // la rangée est recalculée si la fenêtre change de taille
    clearTimeout(rs);
    rs = setTimeout(() => {
      if (!marquee || Math.abs(orbitEl.clientWidth - marquee.W) < 2) return;   // la barre d'adresse du téléphone change la hauteur, pas la largeur : on ne touche à rien
      const ph = marquee.phase();
      marquee.stop(); marquee = null; layoutRow(); startMarquee(ph);
    }, 250);
  });

  // Animation d'accueil : le logo (six tuiles en cercle) tourne, puis les tuiles deviennent les six premières icônes
  const runIntro = () => {
    const allIcons = [...document.querySelectorAll('.orbit .ico')];
    const icons = allIcons.slice(0, 6);
    const extras = allIcons.slice(6);
    const done = () => root.classList.remove('intro');
    if (!icons.length || reduce || !root.classList.contains('intro')) { done(); startMarquee(); return; }
    extras.forEach((el) => { el.style.visibility = 'hidden'; });
    const orbit = document.querySelector('.orbit').getBoundingClientRect();
    const vw = root.clientWidth, vh = root.clientHeight;   // sans la barre de défilement
    const L = Math.min(260, vw * 0.6);
    const R = L * 142 / 512, T = L * 112 / 512, n = icons.length;
    const HOLD = 800, SPIN = 3800, D = HOLD + SPIN;   // HOLD : le logo apparaît et attend avant de tourner
    const logo = document.createElement('div');
    logo.className = 'intro-logo';
    logo.style.cssText = `width:${L}px;height:${L}px;left:50%;top:50%;margin:${-L / 2}px 0 0 ${-L / 2}px;border-radius:${L * 113 / 512}px`;
    document.body.append(logo);
    const lr = logo.getBoundingClientRect();
    const cx = lr.left + L / 2, cy = lr.top + L / 2;      // le centre du cercle = le centre du logo
    root.classList.add('intro-fly');
    const anims = [];
    // rotation : la vitesse monte jusqu'à l'envol (t = .5) puis retombe
    const G = (t) => (t < .5 ? t * t : .25 + (1 - Math.pow(1 - (t - .5) / .5, 3)) / 6);
    const G1 = G(1), TURNS = 4;
    // envol : démarre vite, ralentit en arrivant
    const outCubic = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
    icons.forEach((el, i) => {
      const size = el.offsetWidth;
      const fx = orbit.left + el.offsetLeft + size / 2, fy = orbit.top + el.offsetTop + size / 2;
      const a0 = (-90 + i * 360 / n) * Math.PI / 180;
      el.style.animationDelay = `${(i * 0.35).toFixed(2)}s`;   // le léger flottement reprend sans à-coup
      const tile = document.createElement('i');
      tile.className = 'tile';
      tile.style.background = el.dataset.tile || 'var(--a)';
      el.append(tile);
      const frames = [], N = 240;
      for (let k = 0; k <= N; k++) {
        const t = k / N, u = Math.max(0, (t * D - HOLD) / SPIN), e = outCubic((u - 0.46) / 0.54);
        const th = a0 + Math.PI * 2 * TURNS * G(u) / G1;
        const px = cx + R * Math.cos(th), py = cy + R * Math.sin(th);
        const s = (T / size) * (1 - e) + e;
        frames.push({ translate: `${(px * (1 - e) + fx * e - fx).toFixed(1)}px ${(py * (1 - e) + fy * e - fy).toFixed(1)}px`, scale: s.toFixed(3), offset: t });
      }
      const o = { duration: D, easing: 'linear' };
      anims.push(el.animate(frames, o));
      const at = (x) => (HOLD + x * SPIN) / D;           // position dans la séquence complète
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
      logo.remove(); document.querySelectorAll('.orbit .tile').forEach((t) => t.remove());
      root.classList.remove('intro-fly');
      extras.forEach((el) => { el.style.visibility = ''; });
      done();
      startMarquee();
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
  const icons = [...document.querySelectorAll('.ico')];
  addEventListener('pointermove', (e) => {
    if (root.classList.contains('intro-fly')) return;
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
