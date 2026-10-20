# Contact-form email using the existing mailbox

The main contact form and popup both send enquiries to `info@gbhgroup.ae` through the Node contact API.

Set these variables in the root `.env` file or in the API host's environment:

```dotenv
MAIL_PROVIDER=smtp
MAIL_FROM="GBH Website <info@gbhgroup.ae>"
CONTACT_TO=info@gbhgroup.ae
SMTP_HOST=premium312.web-hosting.com
SMTP_PORT=465
SMTP_USER=info@gbhgroup.ae
SMTP_PASS="your actual mailbox password"
```

Replace the password placeholder locally. Use the email account's password, not the hosting account password. Keep `.env` out of version control and do not use a `VITE_` prefix for credentials.

The SMTP hostname has no trailing slash. Port 465 uses TLS with certificate verification. IMAP and POP3 settings are not needed to send form submissions. See [Nodemailer's SMTP configuration](https://nodemailer.com/smtp).

## Start and verify

1. Run `npm --prefix server install`.
2. Set the mailbox password in `SMTP_PASS`.
3. Check SMTP connectivity and authentication without sending email:

   ```sh
   node --env-file=.env --input-type=module -e "import { createMailer } from './server/mail.js'; await createMailer(process.env).verify(); console.log('SMTP login verified');"
   ```

4. Restart the website and API with `npm run dev`.
5. Submit a test enquiry. Check the inbox and spam folder at `info@gbhgroup.ae`.

The email includes the name, email, phone, planned start and message. Replying addresses the visitor. Success means the SMTP server accepted the message; it does not guarantee inbox placement.

The Gmail address is not configured as a recipient. To receive a copy there too, set:

```dotenv
CONTACT_TO=info@gbhgroup.ae,gulfbusinesshubuae@gmail.com
```

For authentication failures, confirm the mailbox password and username. For connection errors, confirm the API host permits outgoing SMTP on port 465. The API terminal logs delivery errors; the form retains the submission for retry.

## Production

### PHP hosting (ads.gbhgroup.ae on Hostinger)

Hostinger web hosting serves the static `dist` folder and cannot run the Node API. `public/api/contact.php` sends enquiries over the same SMTP mailbox instead, and `public/.htaccess` routes `/api/contact` to it.

1. Copy `public/api/contact-config.example.php` to `public/api/contact-config.php` and fill in the mailbox password. The file is git-ignored.
2. Run `npm run build`. `dist/` now contains `.htaccess`, `api/contact.php` and `api/contact-config.php`.
3. Upload the **contents** of `dist/` to the subdomain's document root, including the hidden `.htaccess` file.
4. Submit a test enquiry. Delivery errors are written to the PHP error log in hPanel.

### Node hosting

Configure the same variables on the deployed Node API and restart it. Proxy `/api` to that API, or configure `VITE_API_URL` and `CORS_ORIGIN` as described in the README.

The previous [Resend DNS instructions](resend-dns-setup.md) are only needed if switching back to `MAIL_PROVIDER=resend`.
