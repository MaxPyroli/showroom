#!/usr/bin/env python3
"""Assemble le site prêt à héberger : dist/site/ et dist/panamedev-site.zip.

Usage : python3 scripts/package.py
Il suffit ensuite d'envoyer le CONTENU de dist/site/ (ou de décompresser le zip) à la racine
de l'hébergement (dossier « www » chez OVH).
"""
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
SITE = DIST / "site"

for script in ("build_site.py", "build_charte.py"):
    subprocess.run([sys.executable, str(ROOT / "scripts" / script)], check=True)

shutil.rmtree(DIST, ignore_errors=True)
SITE.mkdir(parents=True)
for name in ("index.html", "style.css", "main.js"):
    shutil.copy(ROOT / name, SITE / name)
shutil.copytree(ROOT / "assets", SITE / "assets", ignore=shutil.ignore_patterns(".gitkeep"))
(SITE / "branding").mkdir()
shutil.copy(ROOT / "branding" / "charte-paname-dev.html", SITE / "branding" / "charte-paname-dev.html")
shutil.copy(ROOT / "hosting" / ".htaccess", SITE / ".htaccess")

archive = DIST / "panamedev-site.zip"
with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(SITE.rglob("*")):
        if f.is_file():
            z.write(f, f.relative_to(SITE))
print(f"{archive.relative_to(ROOT)} : {archive.stat().st_size // 1024} Ko, {sum(1 for _ in SITE.rglob('*') if _.is_file())} fichiers")
