# GBH landing page

Responsive React/Vite landing page for GBH Group, with Tailwind CSS and local page styles.

## Run

```sh
npm install
npm --prefix server install
```

For a new setup, copy `.env.example` to `.env`. If `.env` already exists, update it without replacing existing secrets. Set `SMTP_PASS` to the password for `info@gbhgroup.ae`. The SMTP host is `premium312.web-hosting.com`, port `465` (TLS), with `SMTP_USER=info@gbhgroup.ae` and `CONTACT_TO=info@gbhgroup.ae`. Keep these credentials on the server; do not prefix them with `VITE_`.

```sh
npm run dev
npm run build
npm run lint
npm test
```

`npm run dev` starts both Vite and the contact API (port 3001 by default). Vite proxies `/api` to the API. For separate terminals, use `npm run dev:client` and `npm run dev:server`.

See [SMTP setup](docs/smtp-setup.md) for verification and troubleshooting. Restart the API after changing `.env`. `CONTACT_TO` accepts comma-separated recipients.

Resend remains available by explicitly setting `MAIL_PROVIDER=resend`, `RESEND_API_KEY`, and a `MAIL_FROM` address on a verified Resend domain. SMTP does not require Resend verification.

## Deployment

Pushes to `main` deploy automatically to Hostinger through GitHub Actions after lint, tests and build pass. See [Deployment](docs/deployment.md) for the one-time setup of secrets and variables.

On PHP hosting such as Hostinger (the live ads.gbhgroup.ae site), the build includes a PHP contact endpoint; see [SMTP setup](docs/smtp-setup.md#php-hosting-adsgbhgroupae-on-hostinger). Otherwise, run the contact API with `npm run server` on a Node host with the mail environment variables configured. Deploy `server/` together with `src/features/home/components/Contact/contactFormConfig.js`. Configure the website host to proxy `/api` to the API, or set `VITE_API_URL` to the API's origin **before building** the frontend and set `CORS_ORIGIN` on the API to the site's exact origin (comma-separated for multiple origins). `PORT` optionally changes the API port.

The homepage is assembled in `src/features/home/page/Homepage.jsx`. Section components are in `src/features/home/components/`, shared business details are in `src/features/home/constants/homeData.js`, and the shared footer is in `src/components/footer/`.

The hero rotates between business setup, offices, visa services and financial consulting. Its small slide controls let visitors switch or pause scenes. The office gallery switches between three illustrative room photographs with subtle pointer tilt; it is a 3D-style preview, not a panoramic scan of a specific GBH location. It respects reduced-motion preferences.

Both contact forms submit to `/api/contact`, which sends an enquiry through the configured mail provider (SMTP by default in `.env.example`). Emails include the visitor's name, email, phone, planned start and message, with the visitor's email as Reply-To. Success is shown only after the API confirms acceptance; failures keep the visitor's details available for retry. Phone links dial GBH's published number. Replace the illustrative office photography with approved location-specific imagery if the page is deployed as an official property.

Business details and customer names come from [GBH's website](https://www.gbhgroup.ae/) and [office listings](https://www.gbhgroup.ae/office-space). The booking process copy describes the enquiry journey on this page; it does not promise a processing time.
