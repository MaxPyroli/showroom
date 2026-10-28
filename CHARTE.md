# Charte Paname Dev

Charte commune à toutes les apps de Paname Dev. Elle est **légère** : un socle partagé, et chaque app garde son âme.

> **Pour Claude** : si ce fichier t'est donné, applique-le à l'app sur laquelle tu travailles. Il fait foi sur l'identité (nom, contact, copyright, mention « Claude ») et sert de référence sur le graphisme. En cas d'écart entre cette charte et le code d'une app, **ne change rien en silence** : signale l'écart à l'utilisateur et propose la correction. Si tu fais un choix de design nouveau, ajoute-le ici (section 8).

Dépôt de référence : `MaxPyroli/showroom` (le site vitrine contient la mise en œuvre visuelle : `style.css`).

## 1. Identité (valeurs à utiliser partout, à l'identique)

| Sujet | Valeur |
|---|---|
| Marque / éditeur | **Paname Dev** |
| Domaine | `panamedev.fr` : **le site est en ligne** (hébergement OVH, voir section 11) ; les sous-domaines par app (ex. `toolproj.panamedev.fr`) viendront plus tard |
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

- [ ] **Icône** à jour (idées de la section 3 bis, librement).
- [ ] **Écran « À propos » / Paramètres** de l'app : version, ligne de crédit (section 1), lien confidentialité, contact.
- [ ] **Page de confidentialité** : rubrique « Contact » = `contact@panamedev.fr`, pied de page = ligne de crédit, date de mise à jour.
- [ ] **README du dépôt** : en bas, la ligne de crédit.
- [ ] **Fiche du store** (Play Store, etc.) : e-mail de contact du développeur, mention « Conçu avec Claude » dans la description longue, lien de confidentialité.
- [ ] **Site / PWA** (si applicable) : pied de page, `<meta name="author">`, manifeste.
- [ ] **Licence** : si une licence existe, le titulaire est `Paname Dev`.
- [ ] **Fichier de consignes Claude du dépôt** (`CLAUDE.md` ou `AGENTS.md`) : contient le bloc de la section 12.

## 3. Socle graphique (ce qui se partage)

| Sujet | Règle |
|---|---|
| Icône d'app | Quelques idées communes et une palette, à reprendre librement : section 3 bis |
| Coins | Cartes 14–22 px ; boutons et puces en pilule (999 px) |
| Accent | **Une seule couleur d'accent par app**, pour les actions et l'état actif. Le rouge est réservé aux problèmes |
| Thèmes | Toute nouvelle couleur vérifiée en clair et en sombre (Grand Paname ajoute un sombre OLED) |
| Mouvement | Courbe `cubic-bezier(.2,.8,.2,1)`, 250–400 ms, apparition douce vers le haut ; respecter `prefers-reduced-motion` |
| Vie privée | **Sans pub, sans pistage, données chez l'utilisateur : vrai pour toutes les apps**, donc on peut le dire partout (site, fiches, README) |
| Pages légales | Gabarit sobre : fond neutre, carte « En résumé » avec filet d'accent à gauche, accent de l'app |
| Ombres | Trois niveaux (grande, moyenne, petite) définis **par thème** : profondes en sombre, douces et teintées bleu nuit en clair. Elles ne doivent jamais être coupées par un conteneur |
| Boutons | Pilule ; au survol : léger soulèvement et reflet qui glisse ; le bouton plein prend le dégradé du titre. Écrire le survol avec `translate`/`scale` (pas `transform`, que les animations d'apparition écrasent) |
| Séparation des apps (site) | Filet teinté de l'accent de l'app + grand numéro décoratif (01 à 06) ; en-tête dans l'ordre titre, description, étiquettes, boutons |
| Textes | Phrases courtes, vocabulaire simple, pas de jargon ; mêmes mots pour les mêmes états (en cours, terminé, en direct, hors ligne) |

## 3 bis. Icônes : quelques idées communes, à reprendre librement

Inspirées de Tool Proj et Desk Mail (leur charte d'icônes complète est gardée comme référence dans `branding/charte-icones-paname.html`). Ce ne sont **pas des règles** : chaque app garde son âme, et on reprend une idée seulement quand elle sert l'app.

- **Une palette douce partagée** pour les objets de l'icône (des pastels, jamais criards). Jaune et rose sont ceux de Tool Proj et Desk Mail ; les autres sont des **propositions** dans la même douceur, à valider à l'œil sur une vraie icône :

| Pastel | Valeur | Statut |
|---|---|---|
| Jaune | `#ffe66d` | en usage |
| Rose | `#ff9ec3` | en usage |
| Ciel | `#8fd3ff` | proposition |
| Pêche | `#ffb27a` | proposition |
| Menthe | `#a8e6a1` | proposition |
| Lavande | `#cdbcff` | proposition |
| Crème | `#fff4d6` | proposition |
- **Une couleur par app**, avec une version plus foncée pour les détails et le trait (l'« encre »).
- **Des formes plates et arrondies**, sur un fond uni en carré arrondi.
- **Des objets qui se chevauchent**, un peu inclinés, pour donner de la vie.
- **Rester lisible en tout petit** (32 px).

**Mesures de référence** (pour une icône de 512 px ; tout se règle en pourcentage de la taille, donc ça se transpose à toute taille) :

| Quoi | Repère |
|---|---|
| Coins du carré de fond | **22 %** du côté (≈ 113 px) |
| Marge intérieure | **12 %** de chaque côté (≈ 62 px) : le dessin reste dans le carré intérieur |
| Épaisseur du trait (symbole) | **≈ 4,5 %** de l'icône (≈ 23 à 30 px), bouts et angles arrondis |
| Coins des objets | **≈ 14 %** de la hauteur de l'objet (≈ 20 à 30 px) |
| Inclinaison des objets | **+12°** (derrière) et **−6°** (devant) chez Desk Mail ; ≈ 6° et −4° chez Tool Proj |
| Tailles de test | 96, 48 et 32 px |

Ce sont des **repères pour garder l'air de famille**, pas des obligations : s'écarter un peu est normal quand l'icône l'exige.

| App | Couleur | Encre |
|---|---|---|
| Tool Proj | `#0d7c72` | `#0d5c55` |
| Desk Mail | `#e8604c` | `#a63a2b` |
| Near Pass | `#8a6bff` (provisoire) | à choisir |
| Orange (piste) | `#f08a24` | `#a85a10` |
| Bleu ciel (piste) | `#2f9fe0` | `#1c6a9c` |
| Violet (piste) | `#7a4fd1` | `#4f2f94` |
| Indigo (gardé de côté) | `#3b4cc0` | `#232f86` |
| Framboise (proposition) | `#d9467a` | `#a72251` |
| Moutarde (proposition) | `#d9a21b` | `#987113` |
| Ardoise (proposition) | `#4a6275` | `#344552` |
| Bleu nuit (proposition) | `#2b4b8f` | `#1e3564` |

L'encre est la même teinte que le fond, environ 30 % plus sombre. Les couleurs « piste » et « proposition » sont calculées, pas encore testées sur une vraie icône.

Score Board et UrbaSim gardent leurs couleurs et leurs icônes (section 4). **Grand Paname a sa propre palette, à part** (ci-dessous).

**Palette propre de Grand Paname** (trois thèmes : clair / sombre / OLED), tirée de son guide graphique :

| Rôle | Clair | Sombre | OLED |
|---|---|---|---|
| Fond | `#ffffff` | `#010e26` | `#000000` |
| Fond discret | `#f1f2f6` | `#07213f` | `#050505` |
| Fond de carte | `#ffffff` | `#031a3a` | `#000000` |
| Texte | `#25303b` | `#ddeeff` | `#ddeeff` |
| Texte secondaire | `#7f8c8d` | `#6e99cc` | `#6e99cc` |
| Accent | `#3498db` | `#5ab3f5` | `#5ab3f5` |
| Pastille active | `#ddeeff` | `#0a2d64` | `#0a0a0a` |

Étoile de favori : or `#f2b705`. Le rouge est réservé aux problèmes de trafic. Police : GrandParis. Sur le site vitrine, l'accent utilisé est `#3aa0ff`.

## 4. L'âme de chaque app (reste libre)

| App | Accent | Matière / ambiance | Police | Plateforme |
|---|---|---|---|---|
| Grand Paname | `#3aa0ff`, fond nuit `#010e26` | Carte plein écran, barre de recherche et navigation flottantes, verre dépoli, trois thèmes (clair, sombre, OLED) | GrandParis | Android (Expo) |
| Tool Proj | `#0d7c72` (vert, encre `#0d5c55`) | Papier : post-it colorés légèrement penchés | Système | Web / PWA, bureau + mobile |
| Desk Mail | `#e8604c` (corail, encre `#a63a2b`, icône : deux enveloppes rose et jaune) | Sobre et dense, logiciel de bureau ; accents corail | Segoe UI | Windows |
| Near Pass | `#8a6bff` (violet provisoire ; couleur d'app non définie) | Radar, halos, lumière | Système | Android |
| Score Board (écrit « Score Board » dans l'app) | `#2fbf8f` (thème app `#1f6f5c`) + jaune | Papier crème, contour épais sombre, ombre pleine ; chaque jeu a sa carte en dégradé (Tarot violet, Skyjo bleu, Aventuriers du Rail rouge, Sushi Go Party corail, 6 qui prend orange) | Système, titres gras | Android + Web / PWA |
| UrbaSim (jeu, bêta) | `#3d86f0` (bouton `#2a6ff0`) | Ciel en dégradé, immeubles colorés (rose, jaune, bleu, vert), ton ludique | Système | Web, version bureau (mobile non optimisé) |

Sur le site : une app = une variable `--a`.

## 5. Ton éditorial

- On parle à l'utilisateur (« tu »), on va droit au but, on dit ce que l'app fait avant comment.
- Une promesse n'est affichée que si elle est vraie dans le code (ex. « aucun serveur » seulement pour une app sans serveur).
- **L'histoire de la marque** : des apps que l'auteur a toujours voulu avoir et qui n'existaient pas, donc il les a créées. « Par un utilisateur, pour les utilisateurs. » On ne dit jamais « fait à la main » (les apps sont codées avec Claude) ni « fait en France » sans preuve.
- Pas de superlatifs creux. Des faits : « hors-ligne », « 6 jeux », « code à 4 caractères ».

## 6. Recette pour une nouvelle app

1. Choisir un accent (contraste ≥ 4,5:1 pour le texte sur le bouton plein ; sinon texte sombre).
2. Dessiner l'icône (idées de la section 3 bis, librement) et la déposer dans `assets/img/` (carrée, PNG ou SVG).
3. Ajouter une entrée dans `data/apps.json` : `slug`, `name`, `icon`, `accent`, `glow`, `format` (`phone`, `window` ou `duo`), `tag`, `tagline`, `pitch`, `chips`, `links`, `legal`, `hero_hint` et `features` (une par diapo : titre, texte, `hint` de la capture à fournir) ; optionnels : `tile` (couleur de la tuile du logo et de l'animation, par défaut l'accent) et `title_font` (police du titre).
4. Lancer `python3 scripts/build_site.py` : la barre de navigation, l'icône de l'accueil et la section avec son carrousel se génèrent seules, avec l'accent de l'app (aucun CSS à écrire).
5. Déposer les captures dans `assets/shots/<slug>/` (section 9). Le déploiement sur OVH est automatique à chaque modification (section 11).
6. Appliquer la liste de contrôle de la section 2 et ajouter l'app au tableau de la section 4 et de la section 7.

L'icône du site (`assets/img/favicon.svg`, les tuiles des apps en cercle) et l'animation d'accueil sont générées à partir de `data/apps.json` (champ `tile` = couleur de la tuile). Reste manuel : si besoin, un décor dessiné (`data/mockups/<slug>.html`) avant les vraies captures.

## 7. État de l'harmonisation (à tenir à jour)

Légende : ✅ fait · ⬜ à faire · ❓ à vérifier. Mis à jour le 2026-10-28 (site vitrine) ; les lignes des apps datent de la lecture des dépôts du 2026-10-27 et n'ont pas encore été vérifiées dans le code des apps.

| App | Contact `@panamedev.fr` | Copyright | Mention Claude | Notes |
|---|---|---|---|---|
| Grand Paname | ❓ | ⬜ | ⬜ | Ancien domaine `grandpaname.fun` à retirer ; `docs/confidentialite.html` à revoir |
| Tool Proj | ❓ | ⬜ | ⬜ | |
| Desk Mail | ⬜ (page : `panamail-pages`) | ⬜ | ⬜ | Icône réelle (corail) intégrée au site ; la page de confidentialité est encore en bleu, à passer au corail ; le dépôt de la page s'appelle encore « panamail » |
| Near Pass | ⬜ (page : `nearpass-site`, affiche `contact@grandpaname.fun`) | ⬜ | ⬜ | Icône radar provisoire ; couleur d'app à choisir |
| Score Board | ❓ | ⬜ | ⬜ | Le README dit encore « PanaGames » ; `PRIVACY.md` à revoir |
| UrbaSim | ❓ | ⬜ | ⬜ | |
| Site Showroom | ✅ | ✅ | ✅ | En ligne sur `panamedev.fr`, déploiement automatique |

## 8. Journal des décisions de design

Du plus ancien au plus récent.

**2026-10-27**
- Création de la charte : socle léger, une couleur d'accent par app, tutoiement. Domaine `panamedev.fr`, contact unique `contact@panamedev.fr`, copyright et mention de conception à poser partout.
- Slogan du site remplacé par l'histoire réelle : « Des apps faites pour l'utilisateur, par un utilisateur. » (le paragraphe d'intro raconte : des apps que l'auteur voulait, qui n'existaient pas, donc il les a créées). « Fait à la main » retiré (faux, les apps sont codées avec Claude). « Hors-ligne » ne se dit que page par page ; « sans pub, sans pistage » est vrai pour toutes les apps et se dit partout.
- UrbaSim est désormais le **jeu** « Le Monopoly de l'immobilier réel » (bêta) ; l'outil de pré-faisabilité d'origine reste en ligne mais n'est plus la vitrine. Son accent passe de l'orange au bleu du jeu.
- Le site devient une page unique avec un carrousel par app (capture + texte qui changent), à la place de sous-pages. Thèmes clair et sombre ; chaque capture existe en version claire et sombre. Vraies captures dans des cadres de téléphone (plus de maquettes dessinées pour Grand Paname, Score Board, UrbaSim).
- Mise en page en alternance : une app sur deux en miroir (capture à gauche, texte à droite) pour éviter la répétition.
- Tool Proj montré en version bureau **et** mobile (format `duo`) ; UrbaSim en version bureau uniquement (le mobile n'est pas optimisé).
- Charte d'icônes de Desk Mail intégrée **en version très légère** (section 3 bis) : une palette et des idées à reprendre librement, aucune règle ni interdit. Tool Proj prend son vert d'icône `#0d7c72` comme accent. Near Pass garde son icône radar provisoire.
- Icône réelle de Desk Mail (corail, deux enveloppes) : l'accent passe du bleu au corail.
- Décisions : on garde toute la palette élargie ; la palette de Grand Paname est une catégorie à part ; l'app s'écrit « Score Board » ; « sans pub, sans pistage » est vrai pour toutes les apps ; l'icône du site garde les six icônes, disposées **en cercle** (jamais l'icône d'une app seule).
- Animation d'accueil : le logo (tuiles des apps en cercle sur fond sombre) apparaît, tourne, puis son fond s'agrandit jusqu'à devenir le fond de la page pendant que les tuiles se transforment en icônes et se posent sur la rangée de l'accueil. Rien ne l'interrompt (le défilement est bloqué pendant les 3,8 s pour que le cercle reste aligné) ; elle est désactivée si l'utilisateur a demandé moins d'animations.

**2026-10-28**
- Ombres : trois niveaux définis par thème (voir section 3) ; le carrousel ne les rogne plus. Zone de survol du carrousel invisible aux clics (elle recouvrait les boutons de l'en-tête : correctif).
- En-tête de chaque app : titre puis description, dans la colonne du texte ; filet teinté et grand numéro décoratif entre les apps.
- Boutons : soulèvement, reflet qui glisse, dégradé du titre sur le bouton plein (avec `translate`/`scale`).
- Maquette Tool Proj interactive : on coche le rond d'un post-it pour le barrer, et inversement ; tableau à plat (l'inclinaison 3D décalait les clics).
- Indicateur de défilement de l'accueil : un simple chevron animé, discret, sans pastille ; plus bas.
- Mise en ligne sur OVH (SFTP, déploiement automatique), fichiers CSS et JS versionnés dans leur adresse pour éviter les anciens fichiers en cache (section 11).
- *(à compléter à chaque décision, avec la date et l'app concernée)*

## 9. Site vitrine : page unique, carrousels et captures d'écran

Le site est **une seule page** (`index.html`). Chaque app y a une section avec un **carrousel** : flèches, points et balayage tactile ; à chaque diapositive, la capture d'écran change et le texte à côté aussi. Le contenu vient de `data/apps.json`, et les sections se génèrent avec `python3 scripts/build_site.py` (le workflow GitHub Pages le fait aussi à chaque déploiement).

- **Thèmes** : le site suit le thème de l'utilisateur (clair ou sombre), avec un bouton pour changer. Les captures suivent aussi.
- **Captures** : à déposer dans `assets/shots/<slug>/`, **en deux versions** : `NN-light.jpg` (thème clair) et `NN-dark.jpg` (thème sombre). `.png` et `.webp` sont acceptés. Si une seule version existe, elle sert pour les deux thèmes ; `NN.jpg` sans suffixe sert aussi pour les deux.
- **Numérotation** : `01` = vue d'ensemble, puis `02`, `03`… une par fonctionnalité, dans l'ordre de `features` dans `data/apps.json`.
- **Formats** (champ `format` de chaque app dans `data/apps.json`) :
  - `phone` : capture brute du téléphone (portrait) : Grand Paname, Near Pass, Score Board.
  - `window` : capture de la version bureau (16:10) : Desk Mail, UrbaSim (la version mobile d'UrbaSim n'est pas à l'ordre du jour et n'est pas optimisée : ne pas la montrer).
  - `duo` : bureau **et** mobile dans le même cadre (fenêtre + téléphone qui la chevauche) : Tool Proj, qui existe dans les deux versions. Fichiers `NN-desktop-light.jpg`, `NN-desktop-dark.jpg`, `NN-mobile-light.jpg`, `NN-mobile-dark.jpg`.
  - Largeur 1000 à 1300 px, JPEG qualité ≈ 85.
- **Emplacement vide** : un cadre pointillé indique le fichier attendu et l'écran à montrer. Les maquettes dessinées (`data/mockups/<slug>.html`) servent de vue d'ensemble pour Tool Proj, Desk Mail et Near Pass tant que `01-…` n'existe pas.
- **Contenu des captures** : pas de données personnelles (vrais noms, e-mails, positions). Mettre des données de démonstration.
- **Nouvelle fonctionnalité d'une app** : ajouter une entrée dans `features` de `data/apps.json`, puis déposer la capture suivante.
- **Faits** : ne décrire que ce que l'app fait vraiment ; en cas de doute, demander à l'utilisateur.

## 10. Page visuelle de la charte

`branding/charte-paname-dev.html` : une page autonome (icônes intégrées) qui résume cette charte avec les palettes et les mesures, pour en discuter. Elle est générée depuis `branding/charte-paname-dev.src.html` par `python3 scripts/build_charte.py`. **En cas d'écart, `CHARTE.md` fait foi** ; mettre la page à jour quand la charte change.

## 11. Hébergement et déploiement

- **En ligne** : `https://panamedev.fr` (hébergement OVH, Apache). `https://maxpyroli.github.io/showroom/` reste un secours.
- **Déploiement automatique** : à chaque modification poussée sur la branche, le workflow GitHub `.github/workflows/deploy-ovh.yml` assemble le site (`python3 scripts/package.py`) et l'envoie en **SFTP** dans `www/`. Les identifiants sont des *secrets* du dépôt (`SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD`…), jamais dans un fichier ni dans une conversation. Détails : `hosting/LISEZMOI.md`.
- **Rien n'est supprimé** sur le serveur : un fichier retiré du site reste en ligne tant qu'on ne l'enlève pas à la main.
- **Cache** : les fichiers `style.css` et `main.js` sont versionnés dans leur adresse (`?v=…`, calculé par `scripts/build_site.py`), donc une mise à jour est prise en compte tout de suite. Ne jamais publier de CSS ou de JS sans passer par le script.
- **À faire côté OVH** : forcer le HTTPS (3 lignes à décommenter dans `hosting/.htaccess`), créer l'adresse `contact@panamedev.fr`, sous-domaines par app.
- **Paquet manuel** : `python3 scripts/package.py` produit `dist/panamedev-site.zip` (à envoyer à la main si besoin).

## 12. Bloc à copier dans le `CLAUDE.md` / `AGENTS.md` de chaque app

```md
## Charte Paname Dev
- La charte commune est dans `MaxPyroli/showroom`, fichier `CHARTE.md` (lien brut, branche de travail actuelle : https://raw.githubusercontent.com/MaxPyroli/showroom/claude/modest-babbage-vp5jts/CHARTE.md ; remplacer par `main` quand la branche sera fusionnée). La lire au début d'une tâche qui touche à l'interface, aux textes, aux pages légales, au README ou au store.
- Identité à utiliser telle quelle : éditeur « Paname Dev », contact `contact@panamedev.fr`, copyright `© 2026 Paname Dev`, mention « Conçu et codé avec Claude ». Promesse vraie pour toutes les apps : sans pub, sans pistage, données chez l'utilisateur.
- Si l'app s'écarte de la charte, le signaler à l'utilisateur au lieu de corriger en silence ; noter toute nouvelle décision de design dans la section 8 de la charte.
```
