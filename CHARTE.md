# Charte Panamedev

Charte commune à toutes les apps de Panamedev. Elle est **légère** : un socle partagé, et chaque app garde son âme.

> **Pour Claude** : si ce fichier t'est donné, applique-le à l'app sur laquelle tu travailles. Il fait foi sur l'identité (nom, contact, copyright, mention « Claude ») et sert de référence sur le graphisme. En cas d'écart entre cette charte et le code d'une app, **ne change rien en silence** : signale l'écart à l'utilisateur et propose la correction. Si tu fais un choix de design nouveau, ajoute-le ici (section 8).

Dépôt de référence : `MaxPyroli/showroom` (le site vitrine contient la mise en œuvre visuelle : `style.css`).

## 1. Identité (valeurs à utiliser partout, à l'identique)

| Sujet | Valeur |
|---|---|
| Marque / éditeur | **Panamedev** |
| Domaine | `panamedev.fr` (le branchement des sous-domaines se fera plus tard) |
| Contact | **`contact@panamedev.fr`** : adresse unique, partout |
| Copyright | **`© 2026 Panamedev`** : l'année de première publication, puis `© 2026–<année en cours>` ; jamais l'année seule en dur sans raison |
| Mention de conception | **`Conçu et codé avec Claude`** (Claude, par Anthropic) |
| Langue | Français, tutoiement, ton simple et direct |

Ancien contact à **remplacer partout** : `contact@grandpaname.fun`. Grand Paname quitte son ancien domaine ; le nom de l'app, lui, ne change pas.

### Les deux lignes types

- Pied de page / écran « À propos » / README : `© 2026 Panamedev · Conçu et codé avec Claude · contact@panamedev.fr`
- Version courte (espace réduit, store) : `© 2026 Panamedev · Fait avec Claude`

## 2. Où ça doit apparaître (liste de contrôle par app)

À cocher pour chaque app, et à garder cohérent à chaque modification.

- [ ] **Écran « À propos » / Paramètres** de l'app : version, ligne de crédit (section 1), lien confidentialité, contact.
- [ ] **Page de confidentialité** : rubrique « Contact » = `contact@panamedev.fr`, pied de page = ligne de crédit, date de mise à jour.
- [ ] **README du dépôt** : en bas, la ligne de crédit.
- [ ] **Fiche du store** (Play Store, etc.) : e-mail de contact du développeur, mention « Conçu avec Claude » dans la description longue, lien de confidentialité.
- [ ] **Site / PWA** (si applicable) : pied de page, `<meta name="author">`, manifeste.
- [ ] **Licence** : si une licence existe, le titulaire est `Panamedev`.
- [ ] **Fichier de consignes Claude du dépôt** (`CLAUDE.md` ou `AGENTS.md`) : contient le bloc de la section 9.

## 3. Socle graphique (ce qui se partage)

| Sujet | Règle |
|---|---|
| Icône d'app | Carré arrondi (rayon ≈ 22 % du côté), un seul symbole, 2 à 3 couleurs, lisible à 48 px |
| Coins | Cartes 14–22 px ; boutons et puces en pilule (999 px) |
| Accent | **Une seule couleur d'accent par app**, pour les actions et l'état actif. Le rouge est réservé aux problèmes |
| Thèmes | Toute nouvelle couleur vérifiée en clair et en sombre (Grand Paname ajoute un sombre OLED) |
| Mouvement | Courbe `cubic-bezier(.2,.8,.2,1)`, 250–400 ms, apparition douce vers le haut ; respecter `prefers-reduced-motion` |
| Vie privée | Même promesse partout : sans pub, sans pistage, données chez l'utilisateur (à ne dire que si c'est vrai pour l'app) |
| Pages légales | Gabarit sobre : fond neutre, carte « En résumé » avec filet d'accent à gauche, accent de l'app |
| Textes | Phrases courtes, vocabulaire simple, pas de jargon ; mêmes mots pour les mêmes états (en cours, terminé, en direct, hors ligne) |

## 4. L'âme de chaque app (reste libre)

| App | Accent | Matière / ambiance | Police | Plateforme |
|---|---|---|---|---|
| Grand Paname | `#3aa0ff`, fond nuit `#010e26` | Verre dépoli, carte au centre, trois thèmes | GrandParis | Android (Expo) |
| Tool Proj | `#14b8a6` (teal `#0d7c72`) | Papier : post-it colorés légèrement penchés | Système | Web / PWA |
| Desk Mail | `#396cd8` | Sobre et dense, logiciel de bureau | Segoe UI | Windows |
| Near Pass | `#8a6bff` (dégradé `#5b7bff` → `#8a4dff`) | Radar, halos, lumière | Système | Android |
| ScoreBoard | `#2fbf8f` (thème app `#1f6f5c`) + jaune | Jeu de société : contour épais, ombre pleine, tampons | Système, titres gras | Android + Web / PWA |
| UrbaSim | `#ff9a4d` | Technique, plans, 3D | Système | Web |

Sur le site : une app = une variable `--a`.

## 5. Ton éditorial

- On parle à l'utilisateur (« tu »), on va droit au but, on dit ce que l'app fait avant comment.
- Une promesse n'est affichée que si elle est vraie dans le code (ex. « aucun serveur » seulement pour une app sans serveur).
- Pas de superlatifs creux. Des faits : « hors-ligne », « 6 jeux », « code à 4 caractères ».

## 6. Recette pour une nouvelle app

1. Choisir un accent (contraste ≥ 4,5:1 pour le texte sur le bouton plein ; sinon texte sombre).
2. Dessiner l'icône d'après la section 3.
3. Appliquer la liste de contrôle de la section 2.
4. Sur le site vitrine : section `.app` avec `class="app xx"`, `data-glow="<accent>"` et `.xx{--a:<accent>}` ; la lueur, la nav, les puces et le bouton suivent seuls.
5. Fabriquer une maquette dans la matière de l'app (pas une capture brute) avec une ou deux pastilles flottantes.

## 7. État de l'harmonisation (à tenir à jour)

Légende : ✅ fait · ⬜ à faire · ❓ à vérifier. Mis à jour le 2026-10-27, d'après la lecture des dépôts.

| App | Contact `@panamedev.fr` | Copyright | Mention Claude | Notes |
|---|---|---|---|---|
| Grand Paname | ❓ | ⬜ | ⬜ | Ancien domaine `grandpaname.fun` à retirer ; `docs/confidentialite.html` à revoir |
| Tool Proj | ❓ | ⬜ | ⬜ | |
| Desk Mail | ⬜ (page : `panamail-pages`) | ⬜ | ⬜ | Icône à dessiner ; le dépôt de la page s'appelle encore « panamail » |
| Near Pass | ⬜ (page : `nearpass-site`, affiche `contact@grandpaname.fun`) | ⬜ | ⬜ | Icône à dessiner |
| ScoreBoard | ❓ | ⬜ | ⬜ | Le README dit encore « PanaGames » ; `PRIVACY.md` à revoir |
| UrbaSim | ❓ | ⬜ | ⬜ | |
| Site Showroom | ✅ | ✅ | ✅ | |

## 8. Journal des décisions de design

- 2026-10-27 : création de la charte. Socle léger, une couleur d'accent par app, tutoiement. Domaine `panamedev.fr`, contact unique `contact@panamedev.fr`. Copyright et mention de conception à poser partout.
- *(à compléter à chaque décision, avec la date et l'app concernée)*

## 9. Bloc à copier dans le `CLAUDE.md` / `AGENTS.md` de chaque app

```md
## Charte Panamedev
- La charte commune est dans `MaxPyroli/showroom`, fichier `CHARTE.md` (lien brut : https://raw.githubusercontent.com/MaxPyroli/showroom/main/CHARTE.md). La lire au début d'une tâche qui touche à l'interface, aux textes, aux pages légales, au README ou au store.
- Identité à utiliser telle quelle : éditeur « Panamedev », contact `contact@panamedev.fr`, copyright `© 2026 Panamedev`, mention « Conçu et codé avec Claude ».
- Si l'app s'écarte de la charte, le signaler à l'utilisateur au lieu de corriger en silence ; noter toute nouvelle décision de design dans la section 8 de la charte.
```
