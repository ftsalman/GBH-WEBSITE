# Deployment (CI/CD)

GitHub Actions runs [.github/workflows/ci-cd.yml](../.github/workflows/ci-cd.yml):

Keep this as the only deployment workflow; a second `deploy.yml` with the same triggers would upload the site twice.

| When | What happens |
|---|---|
| Every pull request, and every push to `main` | Install, lint, test, build. A pull request cannot deploy. |
| Push to `main` (after the checks pass), or **Run workflow** on `main` in the Actions tab | The tested build is uploaded to Hostinger by FTP, then the live contact endpoint is checked. |

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
| `FTP_SERVER` | FTP hostname or IP from hPanel, without `ftp://`, `https://` or a folder path |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |
| `SMTP_PASS` | Optional for deployment. Mailbox password when managing contact mail settings through Actions (see below) |

**Variables** tab:

| Name | Value |
|---|---|
| `FTP_SERVER_DIR` | Deploy folder from step 1, ending in `/`. Defaults to `./`; use that only if the FTP account opens directly in the site's document root |
| `MAIL_FROM` | `GBH Website <info@gbhgroup.ae>` |
| `CONTACT_TO` | `gulfbusinesshubuae@gmail.com` (comma-separate several) |
| `SMTP_HOST` | `premium312.web-hosting.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@gbhgroup.ae` |
| `SITE_URL` | Optional. Defaults to `https://ads.gbhgroup.ae` |
| `FTP_PROTOCOL` | Optional. Defaults to `ftps`; set `ftp` if Hostinger refuses the secure connection |
| `FTP_PORT` | Optional. Defaults to `21`; use the FTP port supplied by your host |

The three `FTP_*` secrets shown above are sufficient to upload the site. Confirm `FTP_SERVER_DIR` before the first run so files reach the correct site folder.

Contact email has two configuration options:

- **Existing server configuration:** Leave `SMTP_PASS` unset. The workflow preserves `api/contact-config.php` on the server, including when it was uploaded by an earlier run. Configure that file manually using [SMTP setup](smtp-setup.md#php-hosting-adsgbhgroupae-on-hostinger). The `MAIL_*`, `CONTACT_TO` and `SMTP_*` variables are not needed by Actions in this mode.
- **Configuration managed by Actions:** Add the `SMTP_PASS` secret and the `MAIL_FROM`, `CONTACT_TO`, `SMTP_HOST` and `SMTP_USER` variables. `SMTP_PORT` defaults to `465`. The deploy writes `api/contact-config.php` from these values on every run; update mail settings in GitHub in this mode. Incomplete settings fail before the upload.

Mail credentials are excluded from the stored build artifact and are added only in the deploy job. The live endpoint check verifies PHP routing without sending email; it does **not** verify SMTP credentials or delivery. Submit a test enquiry after configuring mail to verify delivery.

### 3. Run it

Push to `main`, or open the **Actions** tab → **CI/CD** → **Run workflow**. The first deploy uploads every file; later ones upload only changes.

To require approval before each deploy, open **Settings** → **Environments** → `production` (created by the first run) and add required reviewers.

## When a deploy fails

- **Missing Actions secret**: add the named FTP secret in the repository settings.
- **Missing mail settings**: `SMTP_PASS` is set but a required mail variable is missing. The log names which.
- **SMTP_PASS is not set** warning: the site still deploys, preserving the server's mail config. Configure that file or add the Actions mail settings above to enable contact email.
- **FTP login or connection error**: check `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. If it mentions TLS, set `FTP_PROTOCOL` to `ftp`.
- **Files land in the wrong place**: fix `FTP_SERVER_DIR`, then delete the stray files over FTP.
- **Contact endpoint check fails**: the upload worked but `/api/contact` does not answer. Check that `.htaccess` and `api/contact.php` exist in the site folder.
