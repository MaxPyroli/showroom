# Showroom — Paname Dev

Site vitrine des apps de Paname Dev. HTML/CSS/JS sans étape de build, publié par GitHub Pages (`.github/workflows/pages.yml`).

- **Charte commune** : [`CHARTE.md`](CHARTE.md) (identité, contact, copyright, graphisme, état de l'harmonisation).
- **Page de la charte** : `branding/charte-paname-dev.html` (autonome, icônes intégrées), générée depuis `branding/charte-paname-dev.src.html` par `python3 scripts/build_charte.py`.
- **Page unique** : `index.html`. Les sections des apps (carrousels) sont générées depuis `data/apps.json` par `python3 scripts/build_site.py`.
- **Ajouter des captures** : déposer `01-light.jpg` et `01-dark.jpg`, `02-light.jpg`… dans `assets/shots/<app>/`, puis relancer le script (le déploiement le fait aussi). Détails : section 9 de la charte.

© 2026 Paname Dev · Conçu et codé avec Claude · contact@panamedev.fr
