# GBH landing page

Responsive React/Vite landing page for GBH Group, with Tailwind CSS and local page styles.

## Run

```sh
npm install
npm --prefix server install
```

Copy `.env.example` to `.env` and set `RESEND_API_KEY`, `MAIL_FROM` (an address on your verified Resend domain), and `CONTACT_TO`. Keep these credentials on the server; do not prefix them with `VITE_`.

```sh
npm run dev
npm run build
npm run lint
npm test
```

`npm run dev` starts both Vite and the contact API (port 3001 by default). Vite proxies `/api` to the API. For separate terminals, use `npm run dev:client` and `npm run dev:server`.

If the API reports a Resend delivery error, check its terminal output. The `onboarding@resend.dev` sender can only send to the email associated with your Resend account. To deliver enquiries to GBH, [verify a sender domain in Resend](https://resend.com/docs/dashboard/domains/introduction), then update `MAIL_FROM` in `.env` to an address on that verified domain and restart the API. Keep `CONTACT_TO` set to the intended enquiry inbox.

## Deployment

The `dist` folder alone cannot send email. Run the contact API with `npm run server` on a Node host with the mail environment variables configured. Deploy `server/` together with `src/features/home/components/Contact/contactFormConfig.js`. Configure the website host to proxy `/api` to the API, or set `VITE_API_URL` to the API's origin **before building** the frontend and set `CORS_ORIGIN` on the API to the site's exact origin (comma-separated for multiple origins). `PORT` optionally changes the API port.

The homepage is assembled in `src/features/home/page/Homepage.jsx`. Section components are in `src/features/home/components/`, shared business details are in `src/features/home/constants/homeData.js`, and the shared footer is in `src/components/footer/`.

The hero rotates between business setup, offices, visa services and financial consulting. Its small slide controls let visitors switch or pause scenes. The office gallery switches between three illustrative room photographs with subtle pointer tilt; it is a 3D-style preview, not a panoramic scan of a specific GBH location. It respects reduced-motion preferences.

Both contact forms submit to `/api/contact`, which sends an enquiry through Resend. Success is shown only after the API confirms acceptance; failures keep the visitor's details available for retry. Phone links dial GBH's published number. Replace the illustrative office photography with approved location-specific imagery if the page is deployed as an official property.

Business details and customer names come from [GBH's website](https://www.gbhgroup.ae/) and [office listings](https://www.gbhgroup.ae/office-space). The booking process copy describes the enquiry journey on this page; it does not promise a processing time.
