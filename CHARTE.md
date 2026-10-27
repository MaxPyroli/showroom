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
| Grand Paname | `#3aa0ff`, fond nuit `#010e26` | Carte plein écran, barre de recherche et navigation flottantes, verre dépoli, trois thèmes (clair, sombre, OLED) | GrandParis | Android (Expo) |
| Tool Proj | `#14b8a6` (teal `#0d7c72`) | Papier : post-it colorés légèrement penchés | Système | Web / PWA |
| Desk Mail | `#396cd8` | Sobre et dense, logiciel de bureau | Segoe UI | Windows |
| Near Pass | `#8a6bff` (dégradé `#5b7bff` → `#8a4dff`) | Radar, halos, lumière | Système | Android |
| ScoreBoard (écrit « Score Board » dans l'app) | `#2fbf8f` (thème app `#1f6f5c`) + jaune | Papier crème, contour épais sombre, ombre pleine ; chaque jeu a sa carte en dégradé (Tarot violet, Skyjo bleu, Aventuriers du Rail rouge, Sushi Go Party corail, 6 qui prend orange) | Système, titres gras | Android + Web / PWA |
| UrbaSim (jeu, bêta) | `#3d86f0` (bouton `#2a6ff0`) | Ciel en dégradé, immeubles colorés (rose, jaune, bleu, vert), ton ludique | Système | Web (navigateur) |

Sur le site : une app = une variable `--a`.

## 5. Ton éditorial

- On parle à l'utilisateur (« tu »), on va droit au but, on dit ce que l'app fait avant comment.
- Une promesse n'est affichée que si elle est vraie dans le code (ex. « aucun serveur » seulement pour une app sans serveur).
- **L'histoire de la marque** : des apps que l'auteur a toujours voulu avoir et qui n'existaient pas, donc il les a créées. « Par un utilisateur, pour les utilisateurs. » On ne dit jamais « fait à la main » (les apps sont codées avec Claude) ni « fait en France » sans preuve.
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

- 2026-10-27 : UrbaSim est désormais le **jeu** « Le Monopoly de l'immobilier réel » (bêta). L'outil de pré-faisabilité d'origine reste en ligne mais n'est plus la vitrine. Son accent passe de l'orange au bleu du jeu.
- 2026-10-27 : le site vitrine utilise de vraies captures d'écran dans des cadres de téléphone (plus de maquettes dessinées pour Grand Paname, ScoreBoard, UrbaSim).
- 2026-10-27 : slogan du site remplacé par l'histoire réelle : « Des apps faites pour l'utilisateur, par un utilisateur. » (titre d'accueil ; le paragraphe d'intro raconte l'histoire : des apps que l'auteur voulait, qui n'existaient pas, donc il les a créées). « Fait à la main » retiré (faux, les apps sont codées avec Claude). Les promesses « hors-ligne », « sans pub », « sans pistage » ne se disent que page par page, jamais pour tout le site.
- 2026-10-27 : création de la charte. Socle léger, une couleur d'accent par app, tutoiement. Domaine `panamedev.fr`, contact unique `contact@panamedev.fr`. Copyright et mention de conception à poser partout.
- *(à compléter à chaque décision, avec la date et l'app concernée)*

## 9. Captures d'écran et pages détaillées

Chaque app a une page sur le site vitrine : `apps/<slug>/`. Le contenu vient de `data/apps.json` ; la page se génère avec `python3 scripts/build_pages.py`.

- **Captures** : à déposer dans `assets/shots/<slug>/` sous les noms `01.jpg`, `02.jpg`… (`.png` et `.webp` acceptés). `01` = écran principal, puis une par fonctionnalité dans l'ordre de la page, puis la galerie. Un emplacement sans fichier affiche un cadre pointillé qui indique le fichier attendu et l'écran à montrer ; aucune régénération n'est nécessaire.
- **Format** : capture d'écran brute du téléphone (portrait) ; Desk Mail en fenêtre (16:10). Largeur 1000 à 1300 px, JPEG qualité ≈ 85.
- **Contenu** : pas de données personnelles (vrais noms, e-mails, positions). Mettre des données de démonstration.
- **Nouvelle fonctionnalité d'une app** : ajouter une entrée dans `features` de `data/apps.json`, relancer le script, déposer la capture suivante.
- **Faits** : ne décrire que ce que l'app fait vraiment ; en cas de doute, demander à l'utilisateur.

## 10. Bloc à copier dans le `CLAUDE.md` / `AGENTS.md` de chaque app

```md
## Charte Paname Dev
- La charte commune est dans `MaxPyroli/showroom`, fichier `CHARTE.md` (lien brut : https://raw.githubusercontent.com/MaxPyroli/showroom/main/CHARTE.md). La lire au début d'une tâche qui touche à l'interface, aux textes, aux pages légales, au README ou au store.
- Identité à utiliser telle quelle : éditeur « Paname Dev », contact `contact@panamedev.fr`, copyright `© 2026 Paname Dev`, mention « Conçu et codé avec Claude ».
- Si l'app s'écarte de la charte, le signaler à l'utilisateur au lieu de corriger en silence ; noter toute nouvelle décision de design dans la section 8 de la charte.
```
