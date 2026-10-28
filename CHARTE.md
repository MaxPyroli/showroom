# Charte Paname Dev

Charte commune à toutes les apps de Paname Dev. Elle est **légère** : un socle partagé, et chaque app garde son âme.

> **Pour Claude** : si ce fichier t'est donné, applique-le à l'app sur laquelle tu travailles. Il fait foi sur l'identité (nom, contact, copyright, mention « Claude ») et sert de référence sur le graphisme. En cas d'écart entre cette charte et le code d'une app, **ne change rien en silence** : signale l'écart à l'utilisateur et propose la correction. Si tu fais un choix de design nouveau, ajoute-le ici (section 8).

Dépôt de référence : `MaxPyroli/showroom` (le site vitrine contient la mise en œuvre visuelle : `style.css`).

## 1. Identité (valeurs à utiliser partout, à l'identique)

| Sujet | Valeur |
|---|---|
| Marque / éditeur | **Paname Dev** |
| Domaine | `panamedev.fr` : **le site est en ligne** (hébergement OVH, voir section 11) ; **chaque app a le sous-domaine de son nom** : `toolproj.panamedev.fr`, `urbasim.panamedev.fr`, etc. (créé chez OVH, redirigé vers l'hébergement de l'app) |
| Contact | **`contact@panamedev.fr`** : adresse unique, partout |
| Copyright | **`© 2026 Paname Dev`** : l'année de première publication, puis `© 2026–<année en cours>` ; jamais l'année seule en dur sans raison |
| Mention de conception | **Version longue** (à propos, README, store) : `Pensé par Paname Dev et codé par Claude` ; **version courte** (pieds de page, à côté du copyright) : `Codé par Claude` (Claude, par Anthropic) |
| Promesse | **Sans pub, sans pistage** : vrai pour toutes les apps, on le dit partout. « Données chez toi », « hors-ligne », « zéro serveur » : seulement app par app, quand c'est exact |
| Langue | Français, tutoiement, ton simple et direct |

Ancien contact à **remplacer partout** : `contact@grandpaname.fun`. Grand Paname quitte son ancien domaine ; le nom de l'app, lui, ne change pas.

### Les deux lignes types

- Pied de page / README : `© 2026 Paname Dev · Codé par Claude · contact@panamedev.fr`
- Écran « À propos » / store / texte plus long : `© 2026 Paname Dev · Pensé par Paname Dev et codé par Claude`

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
| Vie privée | **Sans pub, sans pistage** : vrai pour toutes les apps, donc dit partout (site, fiches, README). **Ne pas écrire « données chez toi » pour toutes** : faux pour Tool Proj (Supabase), Score Board en ligne (Firebase), Grand Paname (API d'Île-de-France Mobilités) ; à réserver aux apps où c'est exact (Desk Mail, Near Pass) |
| Services tiers | **Aucune requête vers un tiers pour afficher l'app** : polices, bibliothèques et scripts sont **hébergés avec l'app** (pas de Google Fonts, jsDelivr, unpkg, cdnjs…), car ces services voient l'adresse IP de l'utilisateur. Les services **nécessaires** (tuiles de carte, API de données, base de données, connexion) sont autorisés mais **nommés dans la page de confidentialité** de l'app |
| Pages légales obligatoires | **Toute app a une page de confidentialité**, même courte : éditeur (Paname Dev), contact, ce qui est stocké et où, services tiers utilisés (nommés), date de mise à jour (à changer à chaque modification) |
| Nom | **Un seul nom partout** : sous l'icône du téléphone, fiche de store, README, interface, thème et dépôt. Exemple à corriger : « PanaGames » → « Score Board » |
| Identifiant technique | Pour une app **pas encore publiée**, un identifiant de la forme `fr.panamedev.<app>` (**adopté**, 2026-10-28) ; il ne peut plus changer après la première publication. Les apps déjà publiées gardent le leur (ex. Grand Paname : `fun.grandpaname.app`) |
| Mention de conception | **Exacte** : « Pensé par Paname Dev et codé par Claude » (longue), « Codé par Claude » (courte, à côté du © Paname Dev) ; si un autre outil a réellement contribué, on le dit (Grand Paname n'a plus de trace de Gemini : il n'affichera que Claude) |
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

| Couleur · app (teinte) | Fond | Encre |
|---|---|---|
| Corail · Desk Mail (31°) | `#e8604c` | `#a63a2b` |
| Ocre · Score Board (108°) | `#878300` | `#5f5c02` |
| Vert canard · Tool Proj (185°) | `#0d7c72` | `#0d5c55` |
| Bleu · UrbaSim (253°) | `#3f80ca` | `#285a93` |
| Magenta · Near Pass (322°) | `#a261ac` | `#75427c` |

**Palette calculée** (`python3 scripts/palette.py`) : elle part de **Tool Proj et Desk Mail, qui ne bougent pas**. Les autres couleurs sont placées sur la roue (OKLCH) pour que **l'écart entre deux voisines soit le même (70 à 77°)** : aucune app n'est proche d'une autre. Elles prennent la luminosité et l'intensité **moyennes** de Tool Proj et Desk Mail (L 0,59, C 0,13). L'encre est la même teinte, plus sombre (L −0,13). Attribution **validée** (2026-10-28) : Ocre pour Score Board, Bleu pour UrbaSim, Magenta pour Near Pass. Ces couleurs sont calculées, pas encore testées sur une vraie icône. Le Ocre sort un peu olive : à cette luminosité, le jaune ne peut pas être autre chose. **Grand Paname est hors palette** (couleurs de son logo, exception acceptée).

**Réserve** : le milieu exact entre deux couleurs voisines, même luminosité et même intensité, pour de futures apps, **en plus** des couleurs principales (voir la règle d'éloignement ci-dessous). 

| Couleur (teinte) | Fond | Encre |
|---|---|---|
| Orange brûlé (69°) | `#ae6e05` | `#7d4d00` |
| Vert (146°) | `#44924e` | `#2b6833` |
| Cyan (219°) | `#0a8ca9` | `#046378` |
| Violet (288°) | `#7b70c5` | `#574e90` |
| Rose (356°) | `#b85b80` | `#853d5a` |

**Règle d'éloignement** (la luminosité ne compte pas : deux couleurs de même teinte se confondent, claires ou foncées) : **60° de teinte minimum** entre deux couleurs principales, et entre deux couleurs de réserve ; **30° minimum** entre une principale et une réserve (les réserves sont à 35° de leurs voisines : elles passent). On peut donc utiliser les réserves en plus des principales, mais **jamais deux réserves proches** (elles sont à 69° ou plus l'une de l'autre, donc toutes compatibles entre elles). La roue tient ainsi jusqu'à **10 apps**. `python3 scripts/palette.py` vérifie la liste des apps et signale les paires trop proches. **Exception acceptée : Grand Paname** garde le bleu de son logo (228°), proche de Tool Proj et d'UrbaSim ; ce n'est pas un conflit.


**Palette propre de Grand Paname : les couleurs de son logo** (mesurées sur `assets/img/grandpaname.png`) : un fond bleu nuit et les couleurs des lignes du réseau.

| Rôle | Couleur | Valeur |
|---|---|---|
| Fond du logo | bleu nuit | `#041b3b` |
| Ligne | rouge | `#e23f3a` |
| Ligne | jaune | `#f8c607` |
| Ligne | vert | `#33b368` |
| Ligne | bleu | `#0ca8d8` |

Les couleurs des lignes de métro, RER et tram dans l'app viennent des données officielles du réseau, jamais du thème. L'interface de l'app a en plus ses trois thèmes (clair, sombre, OLED), décrits dans son propre guide graphique (`docs/guide-graphique.md`, dépôt `grand-paname-app`) ; police GrandParis. Sur le site vitrine, l'accent de Grand Paname est le bleu de son logo, `#0ca8d8` (texte bleu nuit `#041b3b` sur les boutons pleins, pour la lisibilité).

## 4. L'âme de chaque app (reste libre)

| App | Accent | Matière / ambiance | Police | Plateforme |
|---|---|---|---|---|
| Grand Paname | Couleurs du logo : fond `#041b3b`, lignes rouge `#e23f3a`, jaune `#f8c607`, vert `#33b368`, bleu `#0ca8d8` (accent du site : le bleu du logo `#0ca8d8`) | Carte plein écran, barre de recherche et navigation flottantes, verre dépoli, trois thèmes (clair, sombre, OLED) | GrandParis | Android (Expo) |
| Tool Proj | `#0d7c72` (vert, encre `#0d5c55`) | Papier : post-it colorés légèrement penchés | Système | Web / PWA, bureau + mobile |
| Desk Mail | `#e8604c` (corail, encre `#a63a2b`, icône : deux enveloppes rose et jaune) | Sobre et dense, logiciel de bureau ; accents corail | Segoe UI | Windows |
| Near Pass | Magenta `#a261ac` (encre `#75427c`), couleur de la palette ; l'icône radar violette actuelle reste provisoire | Radar, halos, lumière | Système | Android |
| Score Board (écrit « Score Board » dans l'app) | Ocre `#878300` (encre `#5f5c02`) à terme, couleur de la palette ; aujourd'hui vert `#2fbf8f` (thème app `#1f6f5c`) + jaune | Papier crème, contour épais sombre, ombre pleine ; chaque jeu a sa carte en dégradé (Tarot violet, Skyjo bleu, Aventuriers du Rail rouge, Sushi Go Party corail, 6 qui prend orange) | Système, titres gras | Android + Web / PWA |
| UrbaSim (jeu, bêta) | Bleu `#3f80ca` (encre `#285a93`), couleur de la palette ; aujourd'hui `#3d86f0` (bouton `#2a6ff0`) | Ciel en dégradé, immeubles colorés (rose, jaune, bleu, vert), ton ludique | Système | Web, version bureau (mobile non optimisé) |

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

Légende : ✅ fait · 🟡 partiel · ⬜ à faire · ❌ manque important · ❓ non vérifiable. Audit des dépôts du 2026-10-28 : rapport détaillé dans `branding/audit-depots-2026-10-28.md`.

| App | Contact `@panamedev.fr` | Copyright | Mention Claude | Nom | Bloc charte (consignes) | Page de confidentialité | Requêtes tiers inutiles |
|---|---|---|---|---|---|---|---|
| Grand Paname | ⬜ ancien `grandpaname.fun` (app + page) | ⬜ | 🟡 « Gemini et Claude » → à passer en « Claude » seul | ✅ | ⬜ | ⬜ contact, ©, date | ⬜ Leaflet via unpkg (tuiles CARTO : service nécessaire, à nommer) |
| Tool Proj | ✅ (v0.20.2) | ✅ | ✅ | ✅ | ✅ | ✅ `confidentialite.html` | ✅ polices et supabase-js hébergés |
| Desk Mail | ⬜ ancien (page) | ⬜ | ❓ | ✅ | ❓ | 🟡 éditeur ✅, encore bleue | ✅ (page) / ❓ (app) |
| Near Pass | ⬜ ancien (page) | ⬜ | ❓ | ✅ | ❓ | ⬜ | ✅ (page) / ❓ (app) |
| Score Board | ⬜ champ vide | ⬜ | ⬜ | ❌ « PanaGames » sous l'icône Android | ⬜ | 🟡 contact vide, partage en ligne non décrit | ✅ (aucune trouvée) |
| UrbaSim (jeu) | ⬜ aucun | ⬜ | ⬜ | ✅ | ⬜ | ❌ inexistante | ✅ (tuiles OSM : à nommer) |
| Site Showroom | ✅ | ✅ | ✅ | ✅ | — | — | ✅ polices hébergées, **aucune requête tierce** |

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
- Palette de Grand Paname corrigée : ce sont les **couleurs de son logo** (fond bleu nuit et quatre couleurs de lignes), pas les couleurs de l'interface de l'app.
- Accent de Grand Paname sur le site : le bleu du logo `#0ca8d8` (à la place de `#3aa0ff`), avec un texte bleu nuit `#041b3b` sur les boutons pleins car le blanc y serait peu lisible.
- Liens d'ancre du site (menu, logo, flèche, « Découvrir ») : le défilement se fait sans laisser `#…` dans l'adresse, pour que l'animation d'accueil se rejoue au rechargement. Un lien partagé vers une section (`/#desk-mail`) arrive directement sur la section, sans animation.
- Audit des dépôts d'apps (lecture seule) : rapport dans `branding/audit-depots-2026-10-28.md`. Constats : aucun outil de pub ni de mesure d'audience dans le code, mais « données chez l'utilisateur » n'est pas vrai pour toutes les apps (Tool Proj : Supabase ; Score Board web : Firebase) : à dire seulement « sans pub, sans pistage ». Liens du site corrigés vers `toolproj.panamedev.fr` et `urbasim.panamedev.fr` (bouton « Jouer »).
- **Promesse corrigée** : seule « **sans pub, sans pistage** » est vraie pour toutes les apps ; « données chez l'utilisateur » est retiré (voir section 3). Nouvelles règles d'harmonisation : aucune requête tierce inutile (polices et bibliothèques hébergées avec l'app), page de confidentialité obligatoire, nom unique partout, mention de conception exacte, identifiant `fr.panamedev.<app>` pour les apps non publiées.
- Site vitrine : polices Inter et Bricolage Grotesque hébergées (`assets/fonts/`), plus aucune requête vers Google : vérifié, un seul domaine contacté.
- **Tool Proj 0.20.2 (2026-10-28)** : harmonisé. Polices (Bricolage Grotesque, Figtree, Kalam) et supabase-js hébergés avec l'app (zéro requête tierce mesurée), page `confidentialite.html`, liens + « © 2026 Paname Dev » sur l'écran de connexion et Mon compte, bloc de la charte dans `CLAUDE.md`. Non fait : l'audit mobile complet (`test/mobile-audit.cjs`, demande Supabase local).
- **Palette d'apps (2026-10-28)** : palette calculée à partir de Tool Proj (185°) et Desk Mail (31°), points fixes, avec les autres teintes à écart égal sur la roue (OKLCH). Attribution validée : Ocre → Score Board, Bleu → UrbaSim, Magenta → Near Pass ; Grand Paname hors palette (couleurs de son logo, exception acceptée). 5 couleurs de réserve utilisables en plus. Règle d'éloignement : 60° mini entre deux couleurs du même groupe, 30° entre principale et réserve. `scripts/palette.py` vérifie. Les apps concernées doivent adapter leur icône (Score Board : ocre ; UrbaSim : bleu ; Near Pass : magenta) ; le site vitrine garde les anciennes couleurs tant que les icônes n'ont pas changé.
- **Décisions du 2026-10-28** : copyright **© 2026 Paname Dev** confirmé (pseudo de développeur) ; la mention devient « Pensé par Paname Dev et codé par Claude » (longue) et « Codé par Claude » (courte), pour toutes les apps, parce que l'idée et la conception sont de Paname Dev (Grand Paname : plus aucune trace de Gemini) ; identifiant `fr.panamedev.<app>` adopté pour toute nouvelle app ; sous-domaine = nom de l'app ; icône de Grand Paname inchangée, icônes de Score Board et d'UrbaSim à refaire par leur auteur (couleurs de la palette), à intégrer quand elles seront prêtes ; la charte en HTML est en ligne sur `https://panamedev.fr/branding/charte-paname-dev.html`.
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
- **Aucune requête tierce** : les polices (Inter, Bricolage Grotesque, GrandParis) sont dans `assets/fonts/` (licences OFL jointes) ; ne jamais remettre de lien vers Google Fonts ou un CDN.
- **Rien n'est supprimé** sur le serveur : un fichier retiré du site reste en ligne tant qu'on ne l'enlève pas à la main.
- **Cache** : les fichiers `style.css` et `main.js` sont versionnés dans leur adresse (`?v=…`, calculé par `scripts/build_site.py`), donc une mise à jour est prise en compte tout de suite. Ne jamais publier de CSS ou de JS sans passer par le script.
- **HTTPS forcé** (2026-10-28) : redirection active dans `hosting/.htaccess`. L'adresse `contact@panamedev.fr` existe chez OVH. Les sous-domaines suivent le nom de chaque app.
- **Paquet manuel** : `python3 scripts/package.py` produit `dist/panamedev-site.zip` (à envoyer à la main si besoin).

## 12. Bloc à copier dans le `CLAUDE.md` / `AGENTS.md` de chaque app

```md
## Charte Paname Dev
- La charte commune est dans `MaxPyroli/showroom`, fichier `CHARTE.md` (lien brut, branche de travail actuelle : https://raw.githubusercontent.com/MaxPyroli/showroom/claude/modest-babbage-vp5jts/CHARTE.md ; remplacer par `main` quand la branche sera fusionnée). La lire au début d'une tâche qui touche à l'interface, aux textes, aux pages légales, au README ou au store.
- Identité à utiliser telle quelle : éditeur « Paname Dev », contact `contact@panamedev.fr`, copyright `© 2026 Paname Dev`, mention « Pensé par Paname Dev et codé par Claude » (longue) ou « Codé par Claude » (courte, à côté du ©). Promesse vraie pour toutes les apps : **sans pub, sans pistage** (ne pas écrire « données chez toi » ni « hors-ligne » sauf si c'est exact pour l'app). Aucune requête vers un tiers pour afficher l'app : polices, bibliothèques et scripts hébergés avec l'app ; les services nécessaires (cartes, API, base de données) sont nommés dans la page de confidentialité. Toute app a une page de confidentialité, un seul nom partout et une mention de conception exacte.
- Si l'app s'écarte de la charte, le signaler à l'utilisateur au lieu de corriger en silence ; noter toute nouvelle décision de design dans la section 8 de la charte.
```
