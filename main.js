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
  // Passage clair ↔ sombre : coucher ou lever de soleil (le soleil se couche et la lune se lève, ou l'inverse),
  // pendant que les couleurs de la page se fondent
  let skyFx = null;
  const sunsetFx = (to) => {
    if (skyFx) { skyFx.end(); skyFx = null; }
    const D = 2000, SWITCH = 0.36;
    const vw = innerWidth, vh = innerHeight;
    const size = Math.max(60, Math.min(100, Math.min(vw, vh) * 0.15));   // taille de l'astre, adaptée aux petits écrans
    const sky = document.createElement('div');
    sky.className = 'sky';
    // on ne montre que l'astre du thème qu'on va avoir : le soleil pour le clair, la lune pour le sombre
    sky.innerHTML = `<div class="sky-cool"></div><div class="sky-warm"></div><i class="orb ${to === 'dark' ? 'sky-moon' : 'sky-sun'}"></i>`;
    document.body.append(sky);
    const [cool, warm, orb] = sky.children;
    orb.style.width = orb.style.height = size + 'px';
    // trajet : il arrive d'en bas à gauche, monte en passant dans l'écran, et finit au milieu à gauche, déjà hors de l'écran
    const P = [[vw * 0.1, vh + size * 0.6], [vw * 0.78, vh * 1.02], [vw * 0.9, vh * 0.42], [-size * 1.4, vh * 0.5]];
    const bez = (u) => {
      const m = 1 - u, w = [m * m * m, 3 * m * m * u, 3 * m * u * u, u * u * u];
      return [0, 1].map((k) => P.reduce((a, pt, n) => a + w[n] * pt[k], 0));
    };
    const smooth = (u) => u * u * (3 - 2 * u);
    const frames = Array.from({ length: 41 }, (_, i) => { const [x, y] = bez(smooth(i / 40)); return { transform: `translate(${(x - size / 2).toFixed(0)}px, ${(y - size / 2).toFixed(0)}px)`, offset: i / 40 }; });
    const lin = { duration: D, easing: 'linear', fill: 'forwards' };
    const all = [];
    const run = (el, fr, opts) => all.push(el.animate(fr, opts));
    run(orb, frames, lin);
    run(orb, [{ opacity: 0 }, { opacity: 1, offset: .1 }, { opacity: 1 }], lin);
    if (to === 'dark') {
      run(warm, [{ opacity: 0 }, { opacity: .95, offset: .32 }, { opacity: 0, offset: .72 }, { opacity: 0 }], lin);
      run(cool, [{ opacity: 0 }, { opacity: 0, offset: .3 }, { opacity: .5, offset: .6 }, { opacity: .35, offset: .86 }, { opacity: 0 }], lin);
    } else {
      run(cool, [{ opacity: .45 }, { opacity: .45, offset: .2 }, { opacity: 0, offset: .55 }, { opacity: 0 }], lin);
      run(warm, [{ opacity: 0 }, { opacity: 0, offset: .25 }, { opacity: .85, offset: .55 }, { opacity: .25, offset: .88 }, { opacity: 0 }], lin);
    }
    root.classList.add('theming');
    // tout est calé sur l'animation elle-même (et non sur des minuteries) : sur un téléphone lent, elle va jusqu'au bout
    const lead = all[0];
    let switched = false, finished = false, raf = 0;
    const doSwitch = () => { if (!switched) { switched = true; applyTheme(to); } };
    const end = () => {
      if (finished) return; finished = true;
      cancelAnimationFrame(raf); clearTimeout(safety);
      doSwitch();
      all.forEach((x) => x.cancel()); sky.remove(); root.classList.remove('theming');
      if (skyFx && skyFx.sky === sky) skyFx = null;
    };
    const watch = () => {                                   // le thème change au milieu du trajet, quand la lueur est la plus forte
      if (finished) return;
      if ((lead.currentTime || 0) >= D * SWITCH) doSwitch(); else raf = requestAnimationFrame(watch);
    };
    watch();
    lead.finished.then(end).catch(end);
    const safety = setTimeout(end, D + 4000);               // filet de sécurité
    skyFx = { sky, end };
  };
  let wanted = root.dataset.theme;                       // le thème voulu (le thème affiché change un peu plus tard, pendant l'animation)
  document.querySelector('.tbtn')?.addEventListener('click', () => {
    const t = wanted === 'light' ? 'dark' : 'light';
    wanted = t;
    if (reduce) applyTheme(t); else sunsetFx(t);
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
    const x0 = Math.max(0, (W - 900) / 2) + 0.02 * Math.min(W, 900);   // la rangée démarre là où elle était (au centre), puis traverse tout l'écran
    list.forEach((el, i) => { el.style.left = (x0 + i * w * 1.6).toFixed(1) + 'px'; });
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
    const step = (lefts[n - 1] - lefts[0]) / (n - 1), P = n * step;      // largeur d'un jeu d'icônes
    const PP = (n % 2 ? 2 : 1) * P;                                       // un tour complet : deux jeux si n est impair, pour que la vague haut/bas reste régulière à la jonction
    const belt = document.createElement('div');
    belt.className = 'belt';
    orbitEl.append(belt);
    originals.forEach((el) => belt.append(el));
    const born = performance.now();
    const items = originals.map((el, i) => ({ el, x: lefts[i], late: i >= 6 }));   // les icônes au-delà de la sixième apparaissent en fondu
    // des jeux d'icônes de chaque côté, pour que l'écran soit toujours plein, y compris au moment où la boucle recommence
    const kmin = -Math.max(1, Math.ceil((lefts[0] + w) / P)), kmax = Math.ceil((W + w + PP - lefts[0]) / P);
    for (let k = kmin; k <= kmax; k++) if (k) originals.forEach((el, i) => {
      const c = el.cloneNode(true);
      c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1;
      c.style.left = (lefts[i] + k * P) + 'px';
      c.style.top = ((i + k * n) % 2 + 2) % 2 ? '50%' : '6%';             // une icône sur deux en haut, sans exception
      belt.append(c);
      items.push({ el: c, x: lefts[i] + k * P, late: k < 0 });
    });
    orbitEl.classList.add('run');
    const dur = PP / 45 * 1000;                                           // ≈ 45 px par seconde
    const anim = belt.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${-PP}px)` }], { duration: dur, iterations: Infinity, easing: 'linear' });
    let raf = 0;
    const tick = () => {
      const sh = (anim.currentTime % dur) / dur * PP;
      for (const it of items) {                                           // une icône s'efface en sortant, et apparaît en entrant
        const x0 = it.x - sh, x1 = x0 + w;
        const f = Math.max(0, Math.min(1, 1 + x0 / w, 1 - (x1 - W) / w));
        let g = 1 - Math.min(1, sh / w) * (1 - f);                        // l'effacement s'installe progressivement (pas de saut au départ)
        if (it.late) g *= Math.min(1, (performance.now() - born) / 900);
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
