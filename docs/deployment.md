# Deployment (CI/CD)

GitHub Actions runs [.github/workflows/ci-cd.yml](../.github/workflows/ci-cd.yml):

| When | What happens |
|---|---|
| Every pull request, and every push to `main` | Install, lint, test, build. A pull request cannot deploy. |
| Push to `main` (after the checks pass), or **Run workflow** in the Actions tab | The tested build is uploaded to Hostinger by FTP, then the live contact endpoint is checked. |

Only files that changed since the last deploy are uploaded. The deploy keeps a small `.ftp-deploy-sync-state.json` file on the server for this; leave it there.

## One-time setup

### 1. Get FTP details from Hostinger

hPanel → **Files** → **FTP Accounts**. Note the FTP host (an IP or `ftp.gbhgroup.ae`), the username and the password. Reset the password there if you do not have it.

Find the folder that serves `ads.gbhgroup.ae`: hPanel → **Domains** → **Subdomains** shows each subdomain's folder, usually `public_html/ads`. The deploy folder is that path as seen by the FTP account, ending in `/`, for example `/public_html/ads/` or `/domains/gbhgroup.ae/public_html/ads/`. Log in with an FTP client such as FileZilla to check: the folder holds the current `index.html` and `assets/`.

### 2. Add secrets and variables in GitHub

Repository → **Settings** → **Secrets and variables** → **Actions**.

**Secrets** tab (encrypted, never shown in logs):

| Name | Value |
|---|---|
| `FTP_SERVER` | FTP host from hPanel |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `SMTP_PASS` | Password of the `info@gbhgroup.ae` mailbox |

**Variables** tab:

| Name | Value |
|---|---|
| `FTP_SERVER_DIR` | Deploy folder from step 1, ending in `/` |
| `MAIL_FROM` | `GBH Website <info@gbhgroup.ae>` |
| `CONTACT_TO` | `gulfbusinesshubuae@gmail.com` (comma-separate several) |
| `SMTP_HOST` | `premium312.web-hosting.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@gbhgroup.ae` |
| `SITE_URL` | Optional. Defaults to `https://ads.gbhgroup.ae` |
| `FTP_PROTOCOL` | Optional. Defaults to `ftps`; set `ftp` if Hostinger refuses the secure connection |

The deploy writes `api/contact-config.php` from these values on every run, so change the recipient or the password here, not on the server.

### 3. Run it

Push to `main`, or open the **Actions** tab → **CI/CD** → **Run workflow**. The first deploy uploads every file; later ones upload only changes.

To require approval before each deploy, open **Settings** → **Environments** → `production` (created by the first run) and add required reviewers.

## When a deploy fails

- **Missing mail settings**: a variable or `SMTP_PASS` is not set. The log names which.
- **FTP login or connection error**: check `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. If it mentions TLS, set `FTP_PROTOCOL` to `ftp`.
- **Files land in the wrong place**: fix `FTP_SERVER_DIR`, then delete the stray files over FTP.
- **Contact endpoint check fails**: the upload worked but `/api/contact` does not answer. Check that `.htaccess` and `api/contact.php` exist in the site folder.
