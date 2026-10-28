# Audit des dépôts d'apps — 28 octobre 2026

Objectif : savoir, app par app, ce qui est déjà conforme à la [charte](../CHARTE.md) (contact, copyright, mention Claude, nom, icône, consignes) et ce qui reste à corriger. **Rien n'a été modifié dans les dépôts des apps** : lecture seule.

## Périmètre

| App | Dépôt audité | Branche / date | Remarque |
|---|---|---|---|
| Grand Paname | `grand-paname-app` | `main`, 3 oct. | La branche `4.0.0` (juillet) est plus ancienne |
| Tool Proj | `Tool-Proj` | branche par défaut, 27 oct. | |
| Desk Mail | `panamail-pages` | `master`, 27 oct. | **Seulement la page de confidentialité.** Le code de l'app (dossier `NewMail` sur ton PC) n'est pas accessible d'ici |
| Near Pass | `nearpass-site` | `main`, 26 oct. | **Seulement la page de confidentialité.** Le code de l'app n'est pas accessible d'ici |
| Score Board | `Score-Board` | `claude/board-game-scoring-app-pzw3tx`, 11 oct. | `main` (7 oct.) est plus ancien : la fusion reste à faire |
| UrbaSim (jeu) | `UrbasimGame` | `claude/blissful-lovelace-0tlrkm`, 28 oct. | `main` ne contient que la passation ; le jeu est sur la branche |
| UrbaSim (outil d'origine) | `urbasim` | branche par défaut, 14 oct. | Gardé comme archive |

## Synthèse

| App | Contact `@panamedev.fr` | Copyright `© … Paname Dev` | Mention Claude | Nom | Consignes (bloc charte) | Page de confidentialité |
|---|---|---|---|---|---|---|
| Grand Paname | ⬜ ancien `grandpaname.fun` (app + page) | ⬜ « © 2026 Grand Paname » | 🟡 « Gemini et Claude » | ✅ | ⬜ aucune ne cite la charte | ⬜ contact, ©, date « juillet 2026 » |
| Tool Proj | ⬜ aucun contact affiché | ⬜ aucun | ⬜ aucune | ✅ | ⬜ `CLAUDE.md` sans bloc | ❌ **inexistante** (alors qu'il y a des comptes e-mail) |
| Desk Mail | ⬜ ancien `grandpaname.fun` | ⬜ aucun | ❓ app non auditée | ✅ | ❓ | 🟡 « Éditeur : Paname Dev » déjà présent ; page encore bleue |
| Near Pass | ⬜ ancien `grandpaname.fun` | ⬜ aucun | ❓ app non auditée | ✅ | ❓ | ⬜ contact ancien, pas d'éditeur ni de © |
| Score Board | ⬜ adresse **à compléter** (champ vide) | ⬜ aucun | ⬜ aucune | ❌ **« PanaGames »** sous l'icône Android | ⬜ `CLAUDE.md` sans bloc | 🟡 existe, contact vide ; décrit seulement le partage Bluetooth |
| UrbaSim (jeu) | ⬜ aucun | ⬜ aucun | ⬜ aucune | ✅ | ⬜ aucun fichier (il y a `PASSATION.md`) | ❌ **inexistante** |

Légende : ✅ conforme · 🟡 partiel · ⬜ à faire · ❌ manque important · ❓ non vérifiable d'ici.

## Constats transversaux

### 1. Le contact : un seul remplacement, à cinq endroits
`contact@grandpaname.fun` est encore affiché dans l'app Grand Paname, dans sa page de confidentialité, et dans les pages de Desk Mail et de Near Pass. Score Board a un champ vide à remplir. Les autres apps n'affichent aucun contact.

### 2. La promesse « sans pub, sans pistage » : vérifiée, avec des nuances
J'ai cherché dans tout le code les outils de publicité et de mesure d'audience (Google Analytics, gtag, Firebase Analytics, Sentry, AdMob, Mixpanel, Amplitude, PostHog, Plausible, Matomo, Facebook, Crashlytics…) : **aucun trouvé** dans les six dépôts. La promesse « sans pub, sans pistage » est donc vraie.

Trois nuances à connaître avant de l'écrire partout :
- **« Données chez l'utilisateur » n'est pas vrai pour toutes les apps.** Tool Proj stocke comptes et projets sur Supabase. Le partage en ligne de Score Board (version web) passe par Firebase Realtime Database. Grand Paname interroge l'API d'Île-de-France Mobilités. Je recommande de ne dire partout que **« sans pub, sans pistage »**, et de ne parler de « données chez toi » que pour les apps où c'est exact (Desk Mail, Near Pass).
- **Des requêtes vers des tiers existent** : Tool Proj charge ses polices depuis Google Fonts (`public/index.html:17-19`) et une bibliothèque depuis jsDelivr ; Grand Paname charge la carte Leaflet depuis `unpkg.com` (`app/MapWebView.tsx:23-24`). Ce n'est pas du pistage voulu, mais ces services voient l'adresse IP du visiteur. Pour que « sans pistage » soit irréprochable : héberger ces fichiers soi-même.
- **Le site vitrine chargeait lui aussi Google Fonts** : **corrigé** (28 oct.). Les polices sont hébergées dans `assets/fonts/` ; mesure faite avec un navigateur : un seul domaine contacté, le site lui-même.

### 3. Les domaines panamedev.fr existent déjà pour deux apps
`toolproj.panamedev.fr` et `urbasim.panamedev.fr` répondent (HTTP 200). Le site vitrine pointait encore vers les anciennes adresses `github.io` : **corrigé** dans cette mise à jour du site (Tool Proj, et un bouton « Jouer » pour le jeu UrbaSim).

### 4. Grand Paname : l'identifiant de l'app reste sur l'ancien domaine
`fun.grandpaname.app` (`app/app.config.js:17`) est l'identifiant Android. S'il est publié sur le Play Store, il **ne peut plus changer**. Seule l'adresse de contact doit passer à `panamedev.fr`.

### 5. Deux apps ont leur travail récent sur une branche non fusionnée
Score Board (`claude/board-game-scoring-app-pzw3tx`) et UrbaSim jeu (`claude/blissful-lovelace-0tlrkm`) : `main` est en retard. À clarifier pour savoir quelle branche fait foi.

## Détail par app (avec les lignes à modifier)

### Grand Paname
- `app/App.tsx:415` : `mailto:contact@grandpaname.fun` → `mailto:contact@panamedev.fr`.
- `app/App.tsx:830` (pied de page des réglages) : `© 2026 Grand Paname. Données : API IDFM, OpenStreetMap.` → `© 2026 Paname Dev · Données : API IDFM, OpenStreetMap.` *(si le titulaire du copyright est bien Paname Dev : décision à confirmer)*.
- `app/App.tsx:512` : « ✨ Réalisé à l'aide de Gemini et Claude ». La charte dit « Conçu et codé avec Claude ». **À trancher** : si Gemini a vraiment contribué, garder les deux est plus honnête ; sinon, aligner sur la charte.
- `docs/confidentialite.html:131` et `:135` : contact et ligne de © ; `:85` : « Dernière mise à jour : juillet 2026 » à changer au moment de la modification. La page utilise un accent bleu (`#0d3b6e` / `#5ab3f5`) cohérent avec l'app.
- `AGENTS.md`, `app/CLAUDE.md`, `app/AGENTS.md` : aucun ne cite la charte → ajouter le bloc de la section 12.
- À ne pas toucher : `fun.grandpaname.app` (identifiant de package).

### Tool Proj
- **Aucune page de confidentialité**, alors que l'app collecte des adresses e-mail (connexion par lien ou code) : à créer, c'est la priorité de cette app.
- Aucun contact, ©, ni mention Claude dans l'interface : ajouter une ligne de crédit dans « Mon compte ».
- `CLAUDE.md` : cite le domaine mais pas la charte → ajouter le bloc.
- `public/index.html:17-19` : polices Google Fonts, à héberger soi-même.
- Conforme : couleur du thème `#0d7c72` (`manifest.webmanifest`), domaine `toolproj.panamedev.fr`.

### Desk Mail (page de confidentialité uniquement)
- `index.html:252` : contact ancien → `contact@panamedev.fr`.
- `index.html:251` : « Éditeur : Paname Dev » ✅ déjà conforme. Ajouter une ligne de © et la mention de conception en pied de page.
- La page est en bleu (`#396cd8`) alors que l'app est corail (`#e8604c`) : passer l'accent au corail.
- Le dépôt s'appelle encore `panamail-pages` (renommer est optionnel, mais l'adresse GitHub Pages changerait).
- **L'app elle-même** (écran « À propos », fiche de store, README, consignes) : à faire vérifier par la conversation qui travaille sur Desk Mail, avec la charte.

### Near Pass (page de confidentialité uniquement)
- `index.html:66` : contact ancien → `contact@panamedev.fr`.
- Pas d'éditeur ni de © : ajouter « Éditeur : Paname Dev » et la ligne de crédit.
- Le pied de page affiche « Near Pass · app.nearpass » (identifiant) : à garder ou remplacer par la ligne de crédit.
- **L'app elle-même** : même remarque que Desk Mail.

### Score Board (branche `claude/board-game-scoring-app-pzw3tx`)
- **Nom** : `app/src/main/res/values/strings.xml:3` → `app_name` = « PanaGames » : c'est le nom affiché sous l'icône du téléphone. À passer à « Score Board ». Aussi `README.md:1` (`# PanaGames`), le thème `Theme.PanaGames`, `settings.gradle.kts` (`panagames`). L'interface web affiche déjà « Score Board » (`web/index.html:9`).
- **Identifiant** `com.panagames.app` marqué « provisoire, à définir avant publication » (`README.md:85`) : c'est le bon moment de choisir l'identifiant définitif, avant la première publication.
- `PRIVACY.md` : la rubrique Contact contient `[ADRESSE E-MAIL DE CONTACT À COMPLÉTER]` → `contact@panamedev.fr`. Le texte dit qu'aucune donnée n'est envoyée à un serveur : exact pour l'app Android (partage Bluetooth/Wi-Fi), **inexact pour la version web**, dont le partage en direct passe par Firebase. À préciser.
- Crédits dans l'interface : seule la mention de l'icône « Meeple » (`web/src/ui/ChangelogSheet.tsx:44`) → y ajouter la ligne de crédit et le contact.
- `CLAUDE.md` : ajouter le bloc de la charte.

### UrbaSim (jeu, branche `claude/blissful-lovelace-0tlrkm`)
- Aucun contact, ©, licence ni **page de confidentialité**. Le jeu enregistre la partie dans le navigateur ; une page courte suffirait.
- L'écran « Crédits et données » existe (`jeu/src/main.ts`, `openCredits`) → y ajouter la ligne de crédit et le contact.
- Aucun `CLAUDE.md` / `AGENTS.md` (il y a `PASSATION.md`) → créer le fichier avec le bloc de la charte.
- Conforme : domaine `urbasim.panamedev.fr` (`jeu/public/CNAME`).
- L'outil d'origine (dépôt `urbasim`) : rien à faire, c'est une archive.

## Supprimer les requêtes vers des tiers (marche à suivre)

Principe retenu dans la charte : **aucune requête tierce inutile** (polices, bibliothèques, scripts hébergés avec l'app). Les services nécessaires (tuiles de carte, API, base de données) restent, mais sont nommés dans la page de confidentialité.

**Site vitrine** : fait.

**Tool Proj** (testable dans un navigateur, sans build) :
1. Polices : télécharger Bricolage Grotesque et Figtree en `.woff2` (paquets `@fontsource-variable/bricolage-grotesque` et `@fontsource-variable/figtree`, licence OFL), les mettre dans `public/fonts/`, ajouter les `@font-face` dans `public/styles.css`, **supprimer les trois lignes `public/index.html:17-19`**, et ajouter les fichiers à la liste `SHELL` de `public/sw.js` (pour le hors-ligne).
2. Supabase : `public/data.js:2` importe la bibliothèque depuis `cdn.jsdelivr.net`. La copier dans `public/vendor/supabase-js.js` (même version `2.117.2`), changer l'import, l'ajouter à `SHELL`, puis retirer `cdn.jsdelivr.net`, `fonts.googleapis.com` et `fonts.gstatic.com` de `CACHEABLE_HOSTS` (`public/sw.js:7`).
3. Créer la page de confidentialité (e-mails collectés pour la connexion, base Supabase nommée).
Je peux appliquer ces trois points moi-même et les tester dans un navigateur, **si tu m'autorises à écrire dans le dépôt `Tool-Proj`**.

**Grand Paname** (à tester sur un téléphone) :
- `app/MapWebView.tsx:23-24` charge Leaflet (feuille de style et script) depuis `unpkg.com`, dans la page HTML de la carte. Il faut embarquer ces deux fichiers avec l'app (les inclure dans la page HTML ou les livrer comme ressources) : c'est un changement natif qu'on ne peut vérifier que sur un appareil, donc plutôt pour la conversation qui travaille sur l'app.
- Les tuiles de carte (CARTO) et l'API Île-de-France Mobilités sont nécessaires : à nommer dans `docs/confidentialite.html`.

## Ordre conseillé

1. **Contact** : remplacer partout par `contact@panamedev.fr` (5 endroits, une ligne chacun).
2. **Score Board** : renommer « PanaGames » en « Score Board » et choisir l'identifiant définitif.
3. **Pages de confidentialité manquantes** : Tool Proj (urgent : e-mails collectés) puis UrbaSim.
4. **Blocs de consignes** dans les dépôts (section 12 de la charte) pour que les prochaines conversations Claude appliquent la charte.
5. **Copyright et mention de conception** dans les écrans « À propos » et les pages légales.
6. **Promesse** : « sans pub, sans pistage » (vrai) partout ; pas « données chez toi » sauf là où c'est exact. **Charte mise à jour en conséquence.** Héberger polices et bibliothèques soi-même : site vitrine ✅ fait, Tool Proj et Grand Paname à faire.

## Limites de l'audit

- Je n'ai lu que le code accessible. Desk Mail et Near Pass (les apps) ne sont pas auditées.
- Je n'ai pas lancé les apps : les textes affichés viennent du code, pas de captures.
- Les fiches de store (Play Store) ne sont pas consultables d'ici : à vérifier à la main (e-mail du développeur, description, lien de confidentialité).
- Les recherches de pistage portent sur les noms de services courants ; un service inhabituel pourrait m'échapper.
