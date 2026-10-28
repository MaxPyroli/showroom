#!/usr/bin/env python3
"""Palette Paname Dev calculée : 12 teintes régulièrement espacées (OKLCH), même
luminosité et même intensité ; l'encre = même teinte, plus sombre.
Usage : python3 scripts/palette.py   (affiche le tableau Markdown et le HTML)"""
import math, sys
L_FOND, C_FOND = 0.62, 0.15
L_ENCRE, F_ENCRE = 0.44, 0.85
TEINTES = [(20,'Rouge'),(50,'Orange'),(80,'Ambre'),(110,'Jaune olive'),(140,'Vert pomme'),(165,'Vert menthe'),
           (195,'Turquoise'),(230,'Bleu ciel'),(260,'Bleu'),(290,'Violet'),(325,'Magenta'),(355,'Rose')]
def srgb(L,C,h):
    a=C*math.cos(math.radians(h)); b=C*math.sin(math.radians(h))
    l=(L+0.3963377774*a+0.2158037573*b)**3; m=(L-0.1055613458*a-0.0638541728*b)**3; s=(L-0.0894841775*a-1.2914855480*b)**3
    rgb=[4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.7076147010*s]
    return rgb
def hexa(L,C,h):
    while True:
        rgb=srgb(L,C,h)
        if all(-0.0005<=x<=1.0005 for x in rgb): break
        C-=0.002
    f=lambda x:12.92*x if x<=0.0031308 else 1.055*max(x,0)**(1/2.4)-0.055
    return '#'+''.join('%02x'%round(min(max(f(x),0),1)*255) for x in rgb), C
def lum(hx):
    c=[int(hx[i:i+2],16)/255 for i in (1,3,5)]
    c=[x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]
def txt(hx): return '#fff' if 1.05/(lum(hx)+0.05)>=4.5 else '#1b1b1b'
def palette():
    out=[]
    for h,n in TEINTES:
        fond,c=hexa(L_FOND,C_FOND,h); encre,_=hexa(L_ENCRE,c*F_ENCRE,h)
        out.append((n,h,fond,encre))
    return out
if __name__=='__main__':
    for n,h,f,e in palette(): print(f'| {n} | {h}° | `{f}` | `{e}` |')
    print()
    for n,h,f,e in palette():
        print(f'  <div class="card"><div class="pair"><div class="sw" style="background:{f};color:{txt(f)}">Fond</div><div class="sw" style="background:{e};color:{txt(e)}">Encre</div></div><b>{n}</b><small>{f} · {e} · {h}°</small></div>')
