# Mettre le site sur l'hébergement OVH

Le site est statique : `python3 scripts/package.py` produit `dist/site/` et `dist/panamedev-site.zip`
(à envoyer à la racine de l'hébergement, dossier `www`). Le fichier `hosting/.htaccess` est inclus.

## Déploiement automatique (GitHub Actions)

Le workflow `.github/workflows/deploy-ovh.yml` publie le site à chaque modification, **si** les secrets
ci-dessous existent. À créer sur GitHub : dépôt `showroom` → Settings → Secrets and variables → Actions →
New repository secret. Ne jamais écrire ces valeurs dans une conversation, un fichier ou un commit.

### Option FTP (toutes les offres OVH)

| Secret | Valeur |
|---|---|
| `FTP_SERVER` | le serveur FTP indiqué dans l'espace client OVH (ex. `ftp.cluster0xx.hosting.ovh.net`) |
| `FTP_USER` | l'identifiant FTP |
| `FTP_PASSWORD` | son mot de passe |
| `FTP_DIR` *(optionnel)* | dossier distant, par défaut `./www/` |
| `FTP_PROTOCOL` *(optionnel)* | `ftps` (par défaut, chiffré) ou `ftp` si le serveur n'accepte pas le chiffrement |

### Option SSH (offres Pro et Performance)

| Secret | Valeur |
|---|---|
| `SSH_HOST` | le serveur SSH de l'hébergement |
| `SSH_USER` | l'identifiant |
| `SSH_KEY` | la clé privée dédiée au déploiement (créer une clé spéciale, jamais la clé personnelle) |
| `SSH_PATH` *(optionnel)* | dossier distant, par défaut `www/` |

Si les deux jeux existent, les deux envois ont lieu. Le déploiement n'efface rien sur le serveur :
un fichier supprimé du site reste en ligne tant qu'on ne le supprime pas à la main.

## Domaine, certificat, mail

- Rattacher `panamedev.fr` et `www.panamedev.fr` à l'hébergement (multisite, dossier racine `www`).
- Activer le certificat SSL (Let's Encrypt) dans l'espace client, puis décommenter la redirection HTTPS du `.htaccess`.
- Créer l'adresse `contact@panamedev.fr` chez OVH (ou une redirection vers une boîte existante).
