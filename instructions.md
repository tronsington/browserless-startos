# Browserless on StartOS

Browserless runs a headless Chrome as a shared service on your server. Other
apps and automations (yours or an agent's) connect to it to render pages,
take screenshots, generate PDFs, scrape sites and drive real browser
sessions — without installing Chrome anywhere.

## Connecting a client

1. Open the **Browserless** service and run the **Show API Token** action.
   Copy the token.
2. Give your client the address from the service's **Interfaces** section,
   with the token appended.

**Puppeteer / Playwright, or any CDP client:**

```
ws://<that-address>?token=<token>
```

**REST calls — note the `/chrome/` prefix.** This image (browserless 2.57.1)
mounts its REST routes under `/chrome/`, so the paths in browserless's public
docs (`/screenshot`, `/content`, …) answer **404** here. The working form is:

```
POST https://<that-address>/chrome/screenshot?token=<token>
POST https://<that-address>/chrome/content?token=<token>
```

Available routes: `/chrome/content`, `/chrome/screenshot`, `/chrome/pdf`,
`/chrome/function`, `/chrome/playwright`, `/chrome/scrape`, `/chrome/download`,
`/chrome/performance`. Body and options match the upstream route docs.

**Checks that are useful when wiring a client:**

```
GET https://<that-address>/pressure?token=<token>      # load / availability
GET https://<that-address>/json/version?token=<token>  # Chrome version
GET https://<that-address>/docs/?token=<token>         # route docs served by the image
```

The root URL is **not** a dashboard on this build (it returns 404); use the
routes above.

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
