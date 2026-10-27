# Charte Paname Dev

Charte commune à toutes les apps de Paname Dev. Elle est **légère** : un socle partagé, et chaque app garde son âme.

> **Pour Claude** : si ce fichier t'est donné, applique-le à l'app sur laquelle tu travailles. Il fait foi sur l'identité (nom, contact, copyright, mention « Claude ») et sert de référence sur le graphisme. En cas d'écart entre cette charte et le code d'une app, **ne change rien en silence** : signale l'écart à l'utilisateur et propose la correction. Si tu fais un choix de design nouveau, ajoute-le ici (section 8).

Dépôt de référence : `MaxPyroli/showroom` (le site vitrine contient la mise en œuvre visuelle : `style.css`).

## 1. Identité (valeurs à utiliser partout, à l'identique)

| Sujet | Valeur |
|---|---|
| Marque / éditeur | **Paname Dev** |
| Domaine | `panamedev.fr` (le branchement des sous-domaines se fera plus tard) |
| Contact | **`contact@panamedev.fr`** : adresse unique, partout |
| Copyright | **`© 2026 Paname Dev`** : l'année de première publication, puis `© 2026–<année en cours>` ; jamais l'année seule en dur sans raison |
| Mention de conception | **`Conçu et codé avec Claude`** (Claude, par Anthropic) |
| Langue | Français, tutoiement, ton simple et direct |

Ancien contact à **remplacer partout** : `contact@grandpaname.fun`. Grand Paname quitte son ancien domaine ; le nom de l'app, lui, ne change pas.

### Les deux lignes types

- Pied de page / écran « À propos » / README : `© 2026 Paname Dev · Conçu et codé avec Claude · contact@panamedev.fr`
- Version courte (espace réduit, store) : `© 2026 Paname Dev · Fait avec Claude`

## 2. Où ça doit apparaître (liste de contrôle par app)

À cocher pour chaque app, et à garder cohérent à chaque modification.

- [ ] **Icône** conforme à la recette de la section 3 bis (ou exception décidée et notée en section 8).
- [ ] **Écran « À propos » / Paramètres** de l'app : version, ligne de crédit (section 1), lien confidentialité, contact.
- [ ] **Page de confidentialité** : rubrique « Contact » = `contact@panamedev.fr`, pied de page = ligne de crédit, date de mise à jour.
- [ ] **README du dépôt** : en bas, la ligne de crédit.
- [ ] **Fiche du store** (Play Store, etc.) : e-mail de contact du développeur, mention « Conçu avec Claude » dans la description longue, lien de confidentialité.
- [ ] **Site / PWA** (si applicable) : pied de page, `<meta name="author">`, manifeste.
- [ ] **Licence** : si une licence existe, le titulaire est `Paname Dev`.
- [ ] **Fichier de consignes Claude du dépôt** (`CLAUDE.md` ou `AGENTS.md`) : contient le bloc de la section 10.

## 3. Socle graphique (ce qui se partage)

| Sujet | Règle |
|---|---|
| Icône d'app | Recette de la famille Paname : section 3 bis |
| Coins | Cartes 14–22 px ; boutons et puces en pilule (999 px) |
| Accent | **Une seule couleur d'accent par app**, pour les actions et l'état actif. Le rouge est réservé aux problèmes |
| Thèmes | Toute nouvelle couleur vérifiée en clair et en sombre (Grand Paname ajoute un sombre OLED) |
| Mouvement | Courbe `cubic-bezier(.2,.8,.2,1)`, 250–400 ms, apparition douce vers le haut ; respecter `prefers-reduced-motion` |
| Vie privée | Même promesse partout : sans pub, sans pistage, données chez l'utilisateur (à ne dire que si c'est vrai pour l'app) |
| Pages légales | Gabarit sobre : fond neutre, carte « En résumé » avec filet d'accent à gauche, accent de l'app |
| Textes | Phrases courtes, vocabulaire simple, pas de jargon ; mêmes mots pour les mêmes états (en cours, terminé, en direct, hors ligne) |

## 3 bis. Icônes : la recette de la famille Paname

Source : `branding/charte-icones-paname.html` (document de référence, avec les schémas et les icônes redessinées en SVG). Elle est tirée de Tool Proj et Desk Mail, qui suivent la même recette ; **toute nouvelle icône doit s'y conformer**.

**En une phrase** : un fond uni en carré très arrondi, deux objets pastel (rose derrière, jaune devant) qui se chevauchent, un seul trait foncé épais pour le symbole. Pas de dégradé, pas d'ombre, pas de contour.

**Palette**
- Socle commun à toutes les apps : **jaune `#ffe66d`** (objet principal, devant) et **rose `#ff9ec3`** (objet secondaire, derrière).
- Une **couleur d'app** (le fond) avec son **encre** foncée (le symbole) : même teinte que le fond, environ 30 % plus sombre.

| App | Fond | Encre |
|---|---|---|
| Tool Proj (vert) | `#0d7c72` | `#0d5c55` |
| Desk Mail (corail) | `#e8604c` | `#a63a2b` |
| Indigo (gardé de côté) | `#3b4cc0` | `#232f86` |
| Orange (proposition) | `#f08a24` | `#a85a10` |
| Violet (proposition) | `#7a4fd1` | `#4f2f94` |
| Bleu ciel (proposition) | `#2f9fe0` | `#1c6a9c` |

Les propositions ont été calculées, pas testées sur une vraie icône : à valider à l'œil.

**Anatomie**
1. Carré arrondi : rayon **22 %** du côté, fond d'un seul aplat.
2. Marge intérieure : **12 %** de chaque côté ; le dessin ne touche pas les bords.
3. Deux objets qui se chevauchent : le rose derrière, en haut à droite, penché de **+12°** ; le jaune devant, en bas à gauche, penché de **−6°**.
4. Un seul trait foncé pour le symbole : épaisseur ≈ **4,5 %** de l'icône, bouts et angles arrondis.
5. Objets arrondis : coins à environ 14 % de leur hauteur.

**Formes** : tout est arrondi (aucun angle vif) et plat (jamais de dégradé, d'ombre portée, de brillance ni de contour). Le symbole est lisible à **32 px** (tester à 96, 48 et 32 px) : si un détail disparaît en petit, on l'enlève. Une idée par icône : le symbole décrit l'app (une coche pour les tâches, une enveloppe pour le mail).

**À éviter** : dégradés et ombres ; dessin collé aux bords ; trop de détails et de contours ; couleurs hors palette.

**Exceptions actuelles** (icônes antérieures à la recette, à décider : refaire ou garder) : Grand Paname (carte du réseau), ScoreBoard (pion + « 21 »), UrbaSim (immeubles colorés). Near Pass : icône **provisoire** en violet `#7a4fd1`, couleur d'app non définie.

Le script `branding/logo.py` (côté Desk Mail, non versionné ici) applique la recette pour l'enveloppe : changer les couleurs et le symbole suffit pour produire un nouveau logo.

**Typographie, sites web, boutons, mode sombre** : non couverts par le document d'icônes ; ce sont les sections 3 et 4 de cette charte qui font foi.

## 4. L'âme de chaque app (reste libre)

| App | Accent | Matière / ambiance | Police | Plateforme |
|---|---|---|---|---|
| Grand Paname | `#3aa0ff`, fond nuit `#010e26` | Carte plein écran, barre de recherche et navigation flottantes, verre dépoli, trois thèmes (clair, sombre, OLED) | GrandParis | Android (Expo) |
| Tool Proj | `#0d7c72` (vert, encre `#0d5c55`) | Papier : post-it colorés légèrement penchés | Système | Web / PWA, bureau + mobile |
| Desk Mail | `#e8604c` (corail, encre `#a63a2b`, icône : deux enveloppes rose et jaune) | Sobre et dense, logiciel de bureau ; accents corail | Segoe UI | Windows |
| Near Pass | `#7a4fd1` (violet provisoire, encre `#4f2f94` ; couleur d'app non définie) | Radar, halos, lumière | Système | Android |
| ScoreBoard (écrit « Score Board » dans l'app) | `#2fbf8f` (thème app `#1f6f5c`) + jaune | Papier crème, contour épais sombre, ombre pleine ; chaque jeu a sa carte en dégradé (Tarot violet, Skyjo bleu, Aventuriers du Rail rouge, Sushi Go Party corail, 6 qui prend orange) | Système, titres gras | Android + Web / PWA |
| UrbaSim (jeu, bêta) | `#3d86f0` (bouton `#2a6ff0`) | Ciel en dégradé, immeubles colorés (rose, jaune, bleu, vert), ton ludique | Système | Web, version bureau (mobile non optimisé) |

Sur le site : une app = une variable `--a`.

## 5. Ton éditorial

- On parle à l'utilisateur (« tu »), on va droit au but, on dit ce que l'app fait avant comment.
- Une promesse n'est affichée que si elle est vraie dans le code (ex. « aucun serveur » seulement pour une app sans serveur).
- **L'histoire de la marque** : des apps que l'auteur a toujours voulu avoir et qui n'existaient pas, donc il les a créées. « Par un utilisateur, pour les utilisateurs. » On ne dit jamais « fait à la main » (les apps sont codées avec Claude) ni « fait en France » sans preuve.
- Pas de superlatifs creux. Des faits : « hors-ligne », « 6 jeux », « code à 4 caractères ».

## 6. Recette pour une nouvelle app

1. Choisir un accent (contraste ≥ 4,5:1 pour le texte sur le bouton plein ; sinon texte sombre).
2. Dessiner l'icône d'après la section 3 et la déposer dans `assets/img/` (carrée, PNG ou SVG).
3. Ajouter une entrée dans `data/apps.json` : `slug`, `name`, `icon`, `accent`, `glow`, `format` (`phone`, `window` ou `duo`), `tag`, `tagline`, `pitch`, `chips`, `links`, `legal`, `hero_hint` et `features` (une par diapo : titre, texte, `hint` de la capture à fournir).
4. Lancer `python3 scripts/build_site.py` : la barre de navigation, l'icône de l'accueil et la section avec son carrousel se génèrent seules, avec l'accent de l'app (aucun CSS à écrire).
5. Déposer les captures dans `assets/shots/<slug>/` (section 9).
6. Appliquer la liste de contrôle de la section 2 et ajouter l'app au tableau de la section 4 et de la section 7.

Reste manuel : l'icône du site (`assets/img/favicon.svg`, six tuiles) et, si besoin, un décor dessiné (`data/mockups/<slug>.html`) avant les vraies captures.

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

- 2026-10-27 : UrbaSim est désormais le **jeu** « Le Monopoly de l'immobilier réel » (bêta). L'outil de pré-faisabilité d'origine reste en ligne mais n'est plus la vitrine. Son accent passe de l'orange au bleu du jeu.
- 2026-10-27 : le site vitrine utilise de vraies captures d'écran dans des cadres de téléphone (plus de maquettes dessinées pour Grand Paname, ScoreBoard, UrbaSim).
- 2026-10-27 : slogan du site remplacé par l'histoire réelle : « Des apps faites pour l'utilisateur, par un utilisateur. » (titre d'accueil ; le paragraphe d'intro raconte l'histoire : des apps que l'auteur voulait, qui n'existaient pas, donc il les a créées). « Fait à la main » retiré (faux, les apps sont codées avec Claude). Les promesses « hors-ligne », « sans pub », « sans pistage » ne se disent que page par page, jamais pour tout le site.
- 2026-10-27 : le site devient une page unique avec un carrousel par app (capture + texte qui changent), à la place de sous-pages. Thèmes clair et sombre sur le site ; chaque capture existe en version claire et sombre.
- 2026-10-27 : mise en page en alternance : une app sur deux est en miroir (capture à gauche, texte à droite), pour éviter la répétition. À l'essai, à valider.
- 2026-10-27 : Tool Proj est montré en version bureau **et** mobile (format `duo`) ; UrbaSim en version bureau uniquement (le mobile n'est pas optimisé).
- 2026-10-27 : intégration de la charte d'icônes de Desk Mail (`branding/charte-icones-paname.html`) : recette de la famille Paname (section 3 bis). Tool Proj prend son vert d'icône `#0d7c72` comme accent ; l'icône provisoire de Near Pass est redessinée sans dégradé, en violet `#7a4fd1`.
- 2026-10-27 : icône réelle de Desk Mail (corail, deux enveloppes) : l'accent de l'app passe du bleu au corail. La page de confidentialité de Desk Mail, elle, est encore en bleu : à harmoniser.
- 2026-10-27 : icône du site (favicon) propre à Paname Dev : six tuiles aux couleurs des six apps, et non l'icône d'une app.
- 2026-10-27 : création de la charte. Socle léger, une couleur d'accent par app, tutoiement. Domaine `panamedev.fr`, contact unique `contact@panamedev.fr`. Copyright et mention de conception à poser partout.
- *(à compléter à chaque décision, avec la date et l'app concernée)*

## 9. Site vitrine : page unique, carrousels et captures d'écran

Le site est **une seule page** (`index.html`). Chaque app y a une section avec un **carrousel** : flèches, points et balayage tactile ; à chaque diapositive, la capture d'écran change et le texte à côté aussi. Le contenu vient de `data/apps.json`, et les sections se génèrent avec `python3 scripts/build_site.py` (le workflow GitHub Pages le fait aussi à chaque déploiement).

- **Thèmes** : le site suit le thème de l'utilisateur (clair ou sombre), avec un bouton pour changer. Les captures suivent aussi.
- **Captures** : à déposer dans `assets/shots/<slug>/`, **en deux versions** : `NN-light.jpg` (thème clair) et `NN-dark.jpg` (thème sombre). `.png` et `.webp` sont acceptés. Si une seule version existe, elle sert pour les deux thèmes ; `NN.jpg` sans suffixe sert aussi pour les deux.
- **Numérotation** : `01` = vue d'ensemble, puis `02`, `03`… une par fonctionnalité, dans l'ordre de `features` dans `data/apps.json`.
- **Formats** (champ `format` de chaque app dans `data/apps.json`) :
  - `phone` : capture brute du téléphone (portrait) : Grand Paname, Near Pass, ScoreBoard.
  - `window` : capture de la version bureau (16:10) : Desk Mail, UrbaSim (la version mobile d'UrbaSim n'est pas à l'ordre du jour et n'est pas optimisée : ne pas la montrer).
  - `duo` : bureau **et** mobile dans le même cadre (fenêtre + téléphone qui la chevauche) : Tool Proj, qui existe dans les deux versions. Fichiers `NN-desktop-light.jpg`, `NN-desktop-dark.jpg`, `NN-mobile-light.jpg`, `NN-mobile-dark.jpg`.
  - Largeur 1000 à 1300 px, JPEG qualité ≈ 85.
- **Emplacement vide** : un cadre pointillé indique le fichier attendu et l'écran à montrer. Les maquettes dessinées (`data/mockups/<slug>.html`) servent de vue d'ensemble pour Tool Proj, Desk Mail et Near Pass tant que `01-…` n'existe pas.
- **Contenu des captures** : pas de données personnelles (vrais noms, e-mails, positions). Mettre des données de démonstration.
- **Nouvelle fonctionnalité d'une app** : ajouter une entrée dans `features` de `data/apps.json`, puis déposer la capture suivante.
- **Faits** : ne décrire que ce que l'app fait vraiment ; en cas de doute, demander à l'utilisateur.

## 10. Bloc à copier dans le `CLAUDE.md` / `AGENTS.md` de chaque app

```md
## Charte Paname Dev
- La charte commune est dans `MaxPyroli/showroom`, fichier `CHARTE.md` (lien brut : https://raw.githubusercontent.com/MaxPyroli/showroom/main/CHARTE.md). La lire au début d'une tâche qui touche à l'interface, aux textes, aux pages légales, au README ou au store.
- Identité à utiliser telle quelle : éditeur « Paname Dev », contact `contact@panamedev.fr`, copyright `© 2026 Paname Dev`, mention « Conçu et codé avec Claude ».
- Si l'app s'écarte de la charte, le signaler à l'utilisateur au lieu de corriger en silence ; noter toute nouvelle décision de design dans la section 8 de la charte.
```
