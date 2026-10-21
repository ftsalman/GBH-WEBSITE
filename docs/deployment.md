# Deployment (CI/CD)

GitHub Actions runs [.github/workflows/ci-cd.yml](../.github/workflows/ci-cd.yml):

Keep this as the only deployment workflow; a second `deploy.yml` with the same triggers would upload the site twice.

| When | What happens |
|---|---|
| Every pull request, and every push to `main` | Install, lint, test, build. A pull request cannot deploy. |
| Push to `main` (after the checks pass), or **Run workflow** on `main` in the Actions tab | The tested build is uploaded to Hostinger by FTP, then the live contact endpoint is checked. |

Only files that changed since the last deploy are uploaded. The deploy keeps a small `.ftp-deploy-sync-state.json` file on the server for this; leave it there.

The upload runs [scripts/ftp-deploy/deploy.mjs](../scripts/ftp-deploy/deploy.mjs) rather than `SamKirkland/FTP-Deploy-Action`. Before uploading, the script creates an empty `.ftp-deploy-sync-state.json` on the server if none exists. Without it, the first deploy fails with `ECONNRESET (data socket)`: Hostinger's FTP server drops the connection when the missing state file is requested. The script also keeps `basic-ftp` at a version that works with FTPS on Node 24; leave the override in [scripts/ftp-deploy/package.json](../scripts/ftp-deploy/package.json).

## One-time setup

### 1. Get FTP details from Hostinger

hPanel → **Files** → **FTP Accounts**. Note the FTP host (an IP or `ftp.gbhgroup.ae`), the username and the password. Reset the password there if you do not have it.

`FTP_SERVER_DIR` is the folder that `ads.gbhgroup.ae` serves, written **relative to the folder the FTP account logs in to**. The workflow has no default for it, because a wrong value still uploads successfully, just to a folder nobody visits.

The failed run on 21 October 2026 logged in at `/public_html`, with an `ads/` subfolder, but used `FTP_SERVER_DIR=/ads/`. The leading slash sends the FTP library back to `/`, so that value uploads to `/ads/`, not `/public_html/ads/`. The previous claim here that the subdomain must be outside this FTP account was not established by that mismatch.

hPanel confirms the document root for `ads.gbhgroup.ae` is `/home/u449961891/domains/gbhgroup.ae/public_html/ads`. With the current FTP login at `/public_html`, set **`FTP_SERVER_DIR=ads/`**. Do not use `/ads/` (absolute FTP path) or `public_html/ads/` (duplicates `public_html` under this login folder). The script now rejects absolute paths and parent traversal instead of guessing their meaning.

To find the right values:

1. In hPanel, open the **ads.gbhgroup.ae** website (or **Domains → Subdomains**) and note its folder in **File Manager**: the folder holding the live `index.html` and `assets/`.
2. Open **Files → FTP Accounts** *for that website*. Use an FTP account whose login folder contains that folder, or create one whose directory *is* that folder.
3. Set `FTP_SERVER_DIR` to the existing site folder relative to the account's login folder: `ads/` for login `/public_html` and document root `/public_html/ads`; `./` when the account logs in directly to the site folder. Every deploy logs the login folder, its contents and the resolved destination to help check this. Create the document root through hPanel first if it does not exist.
4. Never point it at the main site's folder: the build's `.htaccess` and `index.html` would replace the main site's.

Before changing website files or the sync state, the deploy uploads a temporary, randomly named text probe to the destination and checks that `SITE_URL` returns its exact contents. It removes the probe on success or failure. A wrong folder, inaccessible URL or redirect stops the deploy before the build upload. Set `SITE_URL` to the canonical URL that serves the site directly. The verified absolute FTP path is then used for the upload connection. After uploading, the workflow still checks the live build, static files and contact endpoint.

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
| `FTP_SERVER_DIR` | **Required: `ads/` for the current FTP account**, which logs in at `/public_html`. Use `./` only if switching to an account that logs in directly to the subdomain folder (see step 1) |
| `MAIL_FROM` | `GBH Website <info@gbhgroup.ae>` |
| `CONTACT_TO` | `gulfbusinesshubuae@gmail.com` (comma-separate several) |
| `SMTP_HOST` | `premium312.web-hosting.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `info@gbhgroup.ae`. Can also be an Actions secret; the secret takes precedence over the variable |
| `SITE_URL` | Optional. Defaults to `https://ads.gbhgroup.ae` |
| `FTP_PROTOCOL` | Optional. Defaults to `ftps`; set `ftp` if Hostinger refuses the secure connection |
| `FTP_PORT` | Optional. Defaults to `21`; use the FTP port supplied by your host |

The three `FTP_*` secrets and the `FTP_SERVER_DIR` variable are required to upload the site.

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
- **`ECONNRESET (data socket)`**: a file transfer was dropped. Re-run with the Actions variable `FTP_LOG_LEVEL` set to `verbose` to log the full FTP conversation (passwords are masked), and check that `npm ls basic-ftp --prefix scripts/ftp-deploy` shows 6.2.3 or later.
- **Missing Actions variable FTP_SERVER_DIR**: set it as described in step 1.
- **FTP_SERVER_DIR must be relative**: for the current login `/public_html` and confirmed document root `public_html/ads`, change `/ads/` to `ads/`. Check repository and `production` environment variables for overrides.
- **FTP destination could not be verified**: no website files were uploaded. Check the document root, FTP account and canonical `SITE_URL`; also check whether a CDN or access rule blocks the probe. Do not bypass this check to force a deploy.
- **"serves …, but this deploy uploaded …"**: with the new destination probe, check stale HTML/CDN caching, index-file precedence and other deployments overwriting the site. Older runs without the probe can also mean a wrong FTP folder. Do not delete stray files until you have confirmed their location and ownership.
- **Contact endpoint check fails**: the error names the HTTP status. 404: `api/contact.php` or the `.htaccess` rewrite is missing from the served folder. 405: a redirect turned the POST into a GET. 5xx: see the PHP error log in hPanel.
