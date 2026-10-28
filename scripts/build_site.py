#!/usr/bin/env python3
"""Génère les sections « apps » de index.html à partir de data/apps.json.

Usage : python3 scripts/build_site.py

Le script remplace tout ce qui se trouve entre les marqueurs
<!-- APPS:START ... --> et <!-- APPS:END --> dans index.html.
Captures : assets/shots/<slug>/NN-light.jpg et NN-dark.jpg (ou .png / .webp ; NN.jpg seul = identique
en clair et sombre). 01 = vue d'ensemble, 02… = une capture par fonctionnalité, dans l'ordre.
Le script détecte les fichiers présents : le relancer après avoir ajouté des images (le workflow
GitHub Pages le fait à chaque déploiement).
"""
import html
import hashlib
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APPS = json.loads((ROOT / "data" / "apps.json").read_text(encoding="utf-8"))["apps"]
e = html.escape


EXTS = ("jpg", "jpeg", "png", "webp")


def find(app, stem, theme):
    """assets/shots/<slug>/<stem>-<theme>.<ext> ou <stem>.<ext>, s'il existe."""
    for name in (f"{stem}-{theme}", stem):
        for ext in EXTS:
            if (ROOT / "assets" / "shots" / app["slug"] / f"{name}.{ext}").exists():
                return f"assets/shots/{app['slug']}/{name}.{ext}"
    return None


def part(app, stem, kind, hint, alt):
    """Un cadre (téléphone ou fenêtre) avec la capture claire/sombre si elle existe."""
    light, dark = find(app, stem, "light"), find(app, stem, "dark")
    src_light, src_dark = light or dark, dark or light
    bar = '<div class="wbar"><i></i><i></i><i></i></div>' if kind == "window" else ""
    if src_light:
        body = (f'<picture><source media="(prefers-color-scheme: light)" srcset="{src_light}">'
                f'<img src="{src_dark}" alt="{e(alt)}" data-light="{src_light}" data-dark="{src_dark}" loading="lazy"></picture>')
        has = " has"
    else:
        base = f"assets/shots/{app['slug']}/{stem}"
        body = (f'<div class="ph"><b>{stem.split("-")[0]}</b><span>Capture à ajouter</span><small>{e(hint)}</small>'
                f'<code>{base}-light.jpg</code><code>{base}-dark.jpg</code></div>')
        has = ""
    return f'<div class="part {kind}{has}"><div class="frame">{bar}{body}</div></div>'


def slot(app, n, hint, alt):
    num = f"{n:02d}"
    fmt = app["format"]
    if fmt == "duo":
        inner = (part(app, f"{num}-desktop", "window", hint, alt + " (bureau)")
                 + part(app, f"{num}-mobile", "phone", hint, alt + " (mobile)"))
    else:
        inner = part(app, num, fmt, hint, alt)
    return f'<figure class="slot {fmt}">{inner}</figure>'


def section(app, index):
    slug = app["slug"]
    mock_file = ROOT / "data" / "mockups" / f"{slug}.html"
    mock = mock_file.read_text(encoding="utf-8").strip() if mock_file.exists() else ""
    items = [{"title": "Vue d'ensemble", "text": app["pitch"], "hint": app["hero_hint"]}] + app["features"]
    total = len(items)
    slides, dots = [], []
    for k, f in enumerate(items, start=1):
        show_mock = mock and k == 1
        area = ("stage withmock" if show_mock else "")
        inner = (mock + "\n          " if show_mock else "") + slot(app, k, f["hint"], f"{app['name']} : {f['title']}")
        slides.append(f'''<article class="slide" aria-label="{k} sur {total}">
        <div class="stxt"><span class="num">{k:02d} / {total:02d}</span><h3>{e(f['title'])}</h3><p>{e(f['text'])}</p></div>
        <div class="shotarea {area}">
          {inner}
        </div>
      </article>''')
        dots.append(f'<button class="dot" type="button" aria-label="Aller à : {e(f["title"])}"></button>')
    links = "".join(
        f'<a class="btn {"ghost" if l.get("ghost") else "app-btn"}" href="{e(l["url"])}" target="_blank" rel="noopener">{e(l["label"])}</a>'
        for l in app["links"])
    links += "".join(f'<a class="btn ghost" href="{e(l["url"])}" target="_blank" rel="noopener">{e(l["label"])} ↗</a>' for l in app["legal"])
    chips = "".join(f"<span>{e(c)}</span>" for c in app["chips"])
    title_style = f' style="font-family:\'{app["title_font"]}\',var(--display);font-weight:700;letter-spacing:0"' if app.get("title_font") else ""
    return f'''<section class="app {slug}{' flip' if index % 2 else ''}" id="{slug}" data-glow="{app['glow']}" style="--a:{app['accent']}">
  <div class="wrap">
    <header class="ahead">
      <div class="aleft">
        <div class="tag reveal"><img src="assets/img/{app['icon']}" alt="" class="mini"> {e(app['tag'])}</div>
        <h2 class="reveal d1"{title_style}>{e(app['name'])}</h2>
      </div>
      <div class="aright">
        <p class="pitch reveal d2"><em>{e(app['tagline'])}</em> {e(app['pitch'])}</p>
        <div class="chips reveal d3">{chips}</div>
        <div class="links reveal d3">{links}</div>
      </div>
    </header>
    <div class="car reveal d2" data-car tabindex="0" role="region" aria-roledescription="carrousel" aria-label="Fonctionnalités de {e(app['name'])}">
      <div class="track">
      {''.join(slides)}
      </div>
      <div class="ctrl">
        <button class="arrow prev" type="button" aria-label="Précédent">←</button>
        <button class="arrow next" type="button" aria-label="Suivant">→</button>
        <div class="dots">{''.join(dots)}</div>
      </div>
    </div>
  </div>
</section>'''


def orbit(i, n, app):
    left = 2 + i * (84 / max(n - 1, 1))
    top = 6 if i % 2 == 0 else 50
    delay = -((i * 1.3) % 5)
    depth = (18, 26, 34, 40, 22, 44)[i % 6]
    return (f'<a href="#{app["slug"]}" class="ico" data-depth="{depth}" '
            f'data-tile="{app.get("tile", app["accent"])}" '
            f'style="left:{left:.1f}%;top:{top}%;animation-delay:{delay:.1f}s"><img src="assets/img/{app["icon"]}" alt=""></a>')


def favicon():
    """Icône du site : les tuiles des apps disposées en cercle (le « logo » de l'animation d'accueil)."""
    n = len(APPS)
    r = 142 if n <= 6 else 150
    size = 112 if n <= 6 else max(60, min(112, 2 * r * math.sin(math.pi / n) - 26))
    rects = ""
    for i, a in enumerate(APPS):
        ang = math.radians(-90 + i * 360 / n)
        x, y = 256 + r * math.cos(ang) - size / 2, 256 + r * math.sin(ang) - size / 2
        rects += f'<rect x="{x:.0f}" y="{y:.0f}" width="{size:.0f}" height="{size:.0f}" rx="{size * 32 / 112:.0f}" fill="{a.get("tile", a["accent"])}"/>'
    (ROOT / "assets" / "img" / "favicon.svg").write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="113" fill="#0b0d14"/>{rects}</svg>\n',
        encoding="utf-8")


def fill(src, name, content):
    pat = re.compile(rf"(<!-- {name}:START[^>]*-->\n).*?(\s*<!-- {name}:END -->)", re.S)
    assert pat.search(src), f"marqueurs {name} introuvables dans index.html"
    return pat.sub(lambda m: m.group(1) + content + m.group(2), src)


favicon()
index = ROOT / "index.html"
src = index.read_text(encoding="utf-8")
src = fill(src, "NAV", "\n".join(f'    <a href="#{a["slug"]}">{e(a["name"])}</a>' for a in APPS))
src = fill(src, "ORBIT", "\n".join("    " + orbit(i, len(APPS), a) for i, a in enumerate(APPS)))
new = "\n\n".join(section(a, i) for i, a in enumerate(APPS))
pattern = re.compile(r"(<!-- APPS:START[^>]*-->\n).*?(<!-- APPS:END -->)", re.S)
assert pattern.search(src), "marqueurs APPS:START / APPS:END introuvables dans index.html"
def version(name):
    return hashlib.md5((ROOT / name).read_bytes()).hexdigest()[:8]


src = pattern.sub(lambda m: m.group(1) + new + "\n\n" + m.group(2), src)
# adresse versionnée : une mise à jour du CSS ou du JS est prise en compte tout de suite
src = re.sub(r'href="style\.css(\?v=\w+)?"', lambda m: f'href="style.css?v={version("style.css")}"', src)
src = re.sub(r'src="main\.js(\?v=\w+)?"', lambda m: f'src="main.js?v={version("main.js")}"', src)
index.write_text(src, encoding="utf-8")
print(f"index.html : {len(APPS)} apps, {sum(len(a['features']) + 1 for a in APPS)} diapositives")
