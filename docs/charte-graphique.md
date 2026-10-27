# Charte graphique légère

Principe : **un socle commun très mince, et l'âme de chaque app au-dessus.** Le socle sert à ce qu'on reconnaisse « la même main » ; tout ce qui fait le caractère d'une app (couleur, police, matière) reste le sien.

Ce document décrit ce que le site Showroom applique déjà (`style.css`) et sert de référence pour harmoniser les apps elles-mêmes, au rythme de chacun.

## 1. Le socle commun (ce qui se partage)

| Sujet | Règle |
|---|---|
| Langue et ton | Français, tutoiement, phrases courtes et directes. |
| Icône d'app | Carré arrondi (rayon ≈ 22 % du côté), un seul symbole, 2 à 3 couleurs max, lisible à 48 px. |
| Coins | Cartes 14–22 px, boutons et puces en pilule (999 px). |
| Accent | **Une seule couleur d'accent par app**, utilisée pour les actions et l'état actif. Le rouge est réservé aux problèmes. |
| Thèmes | Clair et sombre pour toute nouvelle couleur (Grand Paname ajoute un sombre OLED). |
| Mouvement | Courbe `cubic-bezier(.2,.8,.2,1)`, 250–400 ms pour les interactions, apparition douce vers le haut. Respect de `prefers-reduced-motion`. |
| Vie privée | Même promesse affichée partout : sans pub, sans pistage, données chez l'utilisateur. |
| Pages légales | Même gabarit sobre (fond neutre, une carte « En résumé » avec filet d'accent à gauche), à l'accent de l'app. |

## 2. L'âme de chaque app (ce qui reste libre)

| App | Accent | Matière / ambiance | Police |
|---|---|---|---|
| Grand Paname | `#3aa0ff` (bleu réseau), fond nuit `#010e26` | Verre dépoli, carte au centre, trois thèmes | GrandParis |
| Tool Proj | `#14b8a6` (teal) | Papier : post-it colorés légèrement penchés | Système |
| Desk Mail | `#396cd8` (bleu Windows) | Sobre et dense, façon logiciel de bureau | Segoe UI |
| Near Pass | `#8a6bff` (violet) | Radar, halos, lumière | Système |
| ScoreBoard | `#2fbf8f` (vert) + jaune | Jeu de société : contour épais, ombre pleine, tampons | Système, titres gras |
| UrbaSim | `#ff9a4d` (orange) | Technique, plans, 3D | Système |

Ces accents sont ceux de `style.css` (`.gp`, `.tp`, `.dm`…) : **dans le site, une app = une variable `--a`**.

## 3. Recette pour une nouvelle app

1. Choisir un accent (contraste ≥ 4,5:1 du texte sur le bouton plein ; sinon texte noir).
2. Dessiner l'icône d'après les règles du socle.
3. Ajouter une section `.app` avec `class="app xx"`, `data-glow="<accent>"` et `.xx{--a:<accent>}` : la lueur du fond, la nav, les puces, les coches et le bouton suivent tout seuls.
4. Fabriquer une maquette dans la matière de l'app (pas une capture brute), avec une ou deux pastilles flottantes.

## 4. À harmoniser dans les apps (pistes)

- Icônes de Desk Mail et Near Pass : à faire d'après les règles ci-dessus (le site utilise des versions provisoires dessinées en SVG).
- Pages de confidentialité de Desk Mail et Near Pass : mêmes structure et ton, accent propre (déjà quasi le cas).
- Contact unique : `contact@grandpaname.fun` partout.
- Un seul vocabulaire pour les états (en cours, terminé, en direct, hors ligne) et les mêmes puces de statut.
- Noms : ScoreBoard (le dépôt dit encore « PanaGames » dans son README).

Les valeurs ci-dessus décrivent l'existant du site ; en cas d'écart avec un dépôt d'app, c'est le code de l'app qui fait foi.
