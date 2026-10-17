# Browserless on StartOS

Browserless runs a headless Chrome as a shared service on your server. Other
apps and automations (yours or an agent's) connect to it to render pages,
take screenshots, generate PDFs, scrape sites and drive real browser
sessions — without installing Chrome anywhere.

## Connecting a client

1. Open the **Browserless** service and run the **Show API Token** action.
   Copy the token.
2. Give your client the address from the service's **Interfaces** section,
   with the token appended:
   `ws://<that-address>?token=<token>` (Puppeteer/Playwright), or
   `https://<that-address>/screenshot?token=<token>` for plain REST routes.
3. The same address in a browser opens the management dashboard (live
   sessions, load).

Without a valid `?token=…` every call is rejected with a 401-style error.
There is no way to run this service token-free through this package; an open
headless browser endpoint is a security hazard.

## Notes

- The service is stateless: closing the app drops everything in flight, and
  there is nothing to back up except this package's own settings.
- Concurrency, timeouts and other browserless tunables are not exposed in
  this version; upstream defaults apply. If you need them, ask for a release
  that surfaces the env vars you want.
- x86_64 servers only, for now — upstream ships this image for x86_64.
