#!/usr/bin/env python3
"""Génère branding/charte-paname-dev.html (page autonome) à partir de la source .src.html.

Les icônes (assets/img/*) sont intégrées dans le fichier (data URI) pour que la page
s'affiche partout, même ouverte seule, hors du dépôt.

Usage : python3 scripts/build_charte.py
"""
import base64
import io
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "branding" / "charte-paname-dev.src.html"
OUT = ROOT / "branding" / "charte-paname-dev.html"


def data_uri(name: str) -> str:
    path = ROOT / "assets" / "img" / name
    if path.suffix == ".svg":
        return "data:image/svg+xml;base64," + base64.b64encode(path.read_bytes()).decode()
    im = Image.open(path).convert("RGBA")
    im.thumbnail((192, 192), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


html = SRC.read_text(encoding="utf-8")
html = re.sub(r'src="\.\./assets/img/([^"]+)"', lambda m: f'src="{data_uri(m.group(1))}"', html)
OUT.write_text(html, encoding="utf-8")
print(f"{OUT.relative_to(ROOT)} : {OUT.stat().st_size // 1024} Ko")
