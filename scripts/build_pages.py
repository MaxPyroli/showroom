#!/usr/bin/env python3
"""Génère apps/<slug>/index.html à partir de data/apps.json.

Usage : python3 scripts/build_pages.py
Les captures ne passent pas par ce script : il suffit de déposer
assets/shots/<slug>/NN.jpg (ou .png / .webp), la page les trouve toute seule.
"""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APPS = json.loads((ROOT / "data" / "apps.json").read_text(encoding="utf-8"))["apps"]
e = html.escape


def slot(app, n, hint, cls="", alt=""):
    num = f"{n:02d}"
    path = f"assets/shots/{app['slug']}/{num}"
    fmt = app["format"]
    return f'''<figure class="slot {fmt} {cls}" data-shot="../../{path}">
        <div class="frame">
          {'<div class="wbar"><i></i><i></i><i></i></div>' if fmt == 'window' else ''}
          <img alt="{e(alt or app['name'] + ' : ' + hint)}" hidden>
          <div class="ph"><b>{num}</b><span>Capture à ajouter</span><small>{e(hint)}</small><code>{path}.jpg</code></div>
        </div>
      </figure>'''


def page(app, i):
    prev_app, next_app = APPS[i - 1], APPS[(i + 1) % len(APPS)]
    n = 1
    hero = slot(app, n, app["hero_hint"], "tilt")
    feats = []
    for k, f in enumerate(app["features"]):
        n += 1
        feats.append(f'''<article class="feat{' flip' if k % 2 else ''}">
      <div class="ftxt reveal"><span class="num">{k + 1:02d}</span><h3>{e(f['title'])}</h3><p>{e(f['text'])}</p></div>
      <div class="fshot reveal d1">{slot(app, n, f['hint'], 'tilt', f['title'])}</div>
    </article>''')
    gal = []
    for hint in app["gallery_hint"]:
        n += 1
        gal.append(f'<div class="reveal">{slot(app, n, hint)}</div>')
    links = "".join(
        f'<a class="btn {"ghost" if l.get("ghost") else "app-btn"}" href="{e(l["url"])}" target="_blank" rel="noopener">{e(l["label"])}</a>'
        for l in app["links"])
    legal = "".join(f'<a href="{e(l["url"])}" target="_blank" rel="noopener">{e(l["label"])} ↗</a>' for l in app["legal"])
    chips = "".join(f"<span>{e(c)}</span>" for c in app["chips"])
    others = "".join(
        f'<a class="other" href="../{a["slug"]}/" style="--a:{a["accent"]}"><img src="../../assets/img/{a["icon"]}" alt=""><span>{e(a["name"])}</span></a>'
        for a in APPS if a is not app)
    return f'''<!doctype html>
<html lang="fr" style="--glow:{app['glow']};--a:{app['accent']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(app['name'])} — Paname Dev</title>
<meta name="description" content="{e(app['name'])} : {e(app['tagline'])} {e(app['pitch'])}">
<meta name="author" content="Paname Dev">
<meta name="theme-color" content="#0b0d14">
<link rel="icon" href="../../assets/img/{app['icon']}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../style.css">
</head>
<body class="sub {app['slug']}">
<div class="bg" aria-hidden="true"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><div class="grain"></div></div>

<header class="nav">
  <a class="brand" href="../../"><span class="dot"></span>Showroom</a>
  <nav>
    <a href="../../#top">← Toutes les apps</a>
    <a href="../{prev_app['slug']}/">{e(prev_app['name'])}</a>
    <a href="../{next_app['slug']}/">{e(next_app['name'])}</a>
  </nav>
</header>

<main>
<section class="app p-hero" data-glow="{app['glow']}">
  <div class="wrap grid">
    <div class="copy">
      <div class="tag reveal"><img src="../../assets/img/{app['icon']}" alt="" class="mini"> {e(app['tag'])}</div>
      <h1 class="reveal d1">{e(app['name'])}</h1>
      <p class="lede reveal d2">{e(app['tagline'])}</p>
      <p class="pitch reveal d2">{e(app['pitch'])}</p>
      <div class="chips reveal d3">{chips}</div>
      <div class="links reveal d3">{links}</div>
    </div>
    <div class="stage reveal d2">
      {hero}
    </div>
  </div>
</section>

<section class="featsec" data-glow="{app['glow']}">
  <div class="wrap">
    <h2 class="sec reveal">Ce que ça fait</h2>
    {''.join(feats)}
  </div>
</section>

<section class="gallery" data-glow="{app['glow']}">
  <div class="wrap">
    <h2 class="sec reveal">En images</h2>
    <div class="gal">{''.join(gal)}</div>
  </div>
</section>

<section class="others-sec">
  <div class="wrap">
    <h2 class="sec reveal">Les autres apps</h2>
    <div class="others reveal">{others}</div>
  </div>
</section>
</main>

<footer class="foot"><span>© 2026<span id="y"></span> Paname Dev · Conçu et codé avec Claude</span>{legal}<a href="mailto:contact@panamedev.fr">contact@panamedev.fr</a></footer>
<script src="../../main.js"></script>
</body>
</html>
'''


for i, app in enumerate(APPS):
    out = ROOT / "apps" / app["slug"] / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page(app, i), encoding="utf-8")
    print("écrit", out.relative_to(ROOT))
