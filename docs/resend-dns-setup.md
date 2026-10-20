# Restore contact-form email delivery

Checked on 20 October 2026:

- The local website at `http://localhost:5173` reaches `/api/contact`.
- Both the website proxy and the API return the expected HTTP 400 JSON response for an empty enquiry.
- The Resend API key successfully authenticates read-only domain requests.
- `MAIL_FROM` is `GBH Website <website@gbhgroup.ae>`.
- `CONTACT_TO` is `Info@gbhgroup.ae`.
- Resend reports `gbhgroup.ae` as `not_started`.
- All three required DNS names below returned `ENOTFOUND` in the public DNS check.
- No email was sent during these checks.

## Where to add the records

Although the domain is registered with GoDaddy, its current nameservers are:

```text
hyperion.dns-parking.com
atlas.dns-parking.com
```

These indicate that DNS is likely managed through Hostinger. Confirm this in your hosting account. Add the records in the DNS zone served by those nameservers. Records added to an inactive GoDaddy DNS zone will not verify the domain.

Keep the current nameservers and existing website/mail records in place.

## Records required by your Resend account

Add these to the `gbhgroup.ae` DNS zone using the provider's default TTL. Names below are relative to `gbhgroup.ae`; if the provider requires a full name, append `.gbhgroup.ae` once.

| Type | Name / Host | Value / Target |
| --- | --- | --- |
| TXT | `resend._domainkey` | Copy the complete DKIM value below |
| CNAME | `rsend` | `rsend-apne1.forge.rmta.net` |
| CNAME | `send` | `send.forge.rmta.net` |

DKIM TXT value (one continuous line):

```text
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAaO6VghuRaCcoInHrljS2aZqM52a7mptEbnHbVm+PGzv99R8+vwraYrBVhaFrAwtcO1J93C9nEPrOgKDB5J6hhtccHArKbcXSWzWKXD00WBwaSNtyPruGVYE9tfH4RUDHjU6uGxTnhrm1vJNykBvL9W0ATsJVIS3aD0+/mwRPSwIDAQAB
```

These values were read directly from the current Resend domain configuration. If the domain is deleted and recreated in Resend, use the newly displayed records instead.

## Finish verification

1. Save the three DNS records.
2. Open [Resend Domains](https://resend.com/domains), select `gbhgroup.ae`, and start verification.
3. Wait until the domain shows `Verified`.
4. Stop the existing website and API processes, then run `npm run dev` from the project root so the API reloads `.env`.
5. Submit a test enquiry and check `Info@gbhgroup.ae`. If delivery fails, inspect the API terminal's `Contact enquiry delivery failed:` message.

The root `.env` already has the intended sender and recipient; a separate `server/.env` is unnecessary.

References:

- [GoDaddy: Manage DNS records](https://www.godaddy.com/en/help/manage-dns-records-680)
- [Hostinger: Look up domain nameservers](https://www.hostinger.com/support/8671230-how-to-look-up-domain-nameservers-at-hostinger/)
- [Resend: Verified domains](https://resend.com/docs/dashboard/domains/introduction)
