#!/usr/bin/env python3
"""Palette Paname Dev des couleurs d'app, calculée à partir de Tool Proj et Desk Mail.

Tool Proj (185°) et Desk Mail (31°) sont les deux points fixes. Les autres couleurs
sont placées sur la roue de façon à ce que l'écart entre deux couleurs voisines soit
le même (donc jamais deux apps proches), avec la luminosité et l'intensité moyennes
des deux points fixes. L'encre = même teinte, plus sombre.
Usage : python3 scripts/palette.py   (affiche le tableau Markdown et le HTML)"""
import math
FIXES = [('Desk Mail', 'Corail', '#e8604c', '#a63a2b'), ('Tool Proj', 'Vert canard', '#0d7c72', '#0d5c55')]
NOUVELLES = ['Ocre', 'Bleu', 'Magenta']
INTERMEDIAIRES = ['Orange brûlé', 'Vert', 'Cyan', 'Violet', 'Rose']   # milieux, dans l'ordre de la roue (réserve)          # entre les deux points fixes, dans l'ordre de la roue
D_ENCRE_L, F_ENCRE_C = 0.13, 0.82

def to_oklch(h):
    f = lambda c: (lambda x: x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4)(int(c, 16)/255)
    r, g, b = f(h[1:3]), f(h[3:5]), f(h[5:7])
    l = (0.4122214708*r+0.5363325363*g+0.0514459929*b)**(1/3)
    m = (0.2119034982*r+0.6806995451*g+0.1073969566*b)**(1/3)
    s = (0.0883024619*r+0.2817188376*g+0.6299787005*b)**(1/3)
    L = 0.2104542553*l+0.7936177850*m-0.0040720468*s
    a = 1.9779984951*l-2.4285922050*m+0.4505937099*s
    bb = 0.0259040371*l+0.7827717662*m-0.8086757660*s
    return L, math.hypot(a, bb), math.degrees(math.atan2(bb, a)) % 360

def srgb(L, C, h):
    a = C*math.cos(math.radians(h)); b = C*math.sin(math.radians(h))
    l = (L+0.3963377774*a+0.2158037573*b)**3; m = (L-0.1055613458*a-0.0638541728*b)**3; s = (L-0.0894841775*a-1.2914855480*b)**3
    return [4.0767416621*l-3.3077115913*m+0.2309699292*s, -1.2684380046*l+2.6097574011*m-0.3413193965*s, -0.0041960863*l-0.7034186147*m+1.7076147010*s]

def hexa(L, C, h):
    while not all(-0.0005 <= x <= 1.0005 for x in srgb(L, C, h)): C -= 0.002
    f = lambda x: 12.92*x if x <= 0.0031308 else 1.055*max(x, 0)**(1/2.4)-0.055
    return '#'+''.join('%02x' % round(min(max(f(x), 0), 1)*255) for x in srgb(L, C, h)), C

def lum(hx):
    c = [int(hx[i:i+2], 16)/255 for i in (1, 3, 5)]
    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def txt(hx): return '#fff' if 1.05/(lum(hx)+0.05) >= 4.5 else '#1b1b1b'

def palette():
    """Liste (nom de couleur, rôle, fond, encre, teinte, luminosité, intensité), dans l'ordre de la roue."""
    dm, tp = [to_oklch(f[2]) for f in FIXES]
    L = (dm[0]+tp[0])/2; C = (dm[1]+tp[1])/2
    h0, h1 = dm[2], tp[2]                      # 31° -> 185°
    reste = (360-(h1-h0)) / (len(NOUVELLES)+1)  # écart régulier sur le grand arc, de 185° vers 31°
    # petit arc (31° -> 185°) : une couleur au milieu ; grand arc : les autres, à écart égal
    n = len(NOUVELLES); n_petit = 1; n_grand = n-n_petit
    out = [(FIXES[0][1], FIXES[0][0], FIXES[0][2], FIXES[0][3], h0, dm[0], dm[1])]
    hp = h0+(h1-h0)/2
    fond, c = hexa(L, C, hp); encre, _ = hexa(L-D_ENCRE_L, c*F_ENCRE_C, hp)
    out.append((NOUVELLES[0], '', fond, encre, hp, L, c))
    out.append((FIXES[1][1], FIXES[1][0], FIXES[1][2], FIXES[1][3], h1, tp[0], tp[1]))
    arc = 360-(h1-h0); pas = arc/(n_grand+1)
    for k, nom in enumerate(NOUVELLES[1:], 1):
        hh = (h1+pas*k) % 360
        fond, c = hexa(L, C, hh); encre, _ = hexa(L-D_ENCRE_L, c*F_ENCRE_C, hh)
        out.append((nom, '', fond, encre, hh, L, c))
    return out

ECART_MIN = 60   # degrés de teinte minimum entre deux apps (règle d'éloignement)
APPS = {'Desk Mail': 31, 'Score Board': 108, 'Tool Proj': 185, 'UrbaSim': 253, 'Near Pass': 322, 'Grand Paname (logo)': 228}

def conflits(apps=APPS):
    """Paires d'apps dont les teintes sont à moins de ECART_MIN degrés."""
    noms = list(apps); out = []
    for i in range(len(noms)):
        for j in range(i+1, len(noms)):
            d = abs(apps[noms[i]]-apps[noms[j]]); d = min(d, 360-d)
            if d < ECART_MIN: out.append((noms[i], noms[j], d))
    return out

def reserve():
    """Couleurs de réserve : au milieu de chaque paire de voisines de palette()."""
    pal = palette(); L, C = pal[1][5], pal[1][6]; out = []
    for k, nom in enumerate(INTERMEDIAIRES):
        a, b = pal[k][4], pal[(k+1) % len(pal)][4]
        h = (a+((b-a) % 360)/2) % 360
        fond, c = hexa(L, C, h); encre, _ = hexa(L-D_ENCRE_L, c*F_ENCRE_C, h)
        out.append((nom, '', fond, encre, h, L, c))
    return out

if __name__ == '__main__':
    for n, role, f, e, h, L, c in palette():
        print(f'| {n}{" · "+role if role else ""} ({h:.0f}°) | `{f}` | `{e}` |  L={L:.2f} C={c:.2f}')
    print('--- réserve')
    for n, role, f, e, h, L, c in reserve(): print(f'| {n} ({h:.0f}°) | `{f}` | `{e}` |')
    print('--- règle : écart mini %d° entre deux apps' % ECART_MIN)
    c = conflits()
    print('\n'.join(f'  trop proches : {a} / {b} ({d:.0f}°)' for a, b, d in c) if c else '  aucun conflit')
