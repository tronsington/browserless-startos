# browserless-startos

A [StartOS](https://start9.com) service package for
[browserless](https://www.browserless.io) (`ghcr.io/browserless/chrome`) —
headless Chromium exposed as a service: REST + WebSocket APIs for Puppeteer,
Playwright and plain-HTTP automation (screenshots, PDFs, scraping, scripted
sessions), plus its built-in management dashboard.

```bash
git clone https://github.com/tronsington/browserless-startos
cd browserless-startos
npm ci
make x86   # produces browserless_x86_64.s9pk
```

## What this package is

| | |
| --- | --- |
| Upstream image | `ghcr.io/browserless/chrome@sha256:830357995d37c2cee7441d5ba640c426cc8e0112aaba05ce742ea5ecabbc69da` (v2.57.1, digest-pinned) |
| Architectures | **x86_64 only** — upstream's chrome flavour publishes amd64 alone. The sibling `ghcr.io/browserless/chromium` flavour *is* multi-arch; if this package ever ships aarch64 it switches image at the manifest, nothing else. |
| Interface | single HTTP interface on port 3000 (API + dashboard), `browserless.<box>.local` |
| Auth | browserless's own `TOKEN` env, fed from an install-generated random token in `store.json`; every request needs `?token=…`. Reveal the token with the **Show API Token** action. |
| State | none — browserless is fully stateless. The `main` volume holds only the package's own `store.json`. |

There is no Dockerfile: the package wraps the upstream image directly (same
recipe as `buzz-relay`'s dockerTag pinning). The whole package is the manifest
pin, one daemon on the image's own entrypoint, one interface, one
token-reveal action.

## Wiring a client

Any client that speaks Puppeteer/Playwright takes the connection URL:

```
ws://browserless.<your-box>.local:3000?token=<from the Show API Token action>
```

Plain REST (no token in code): `POST http://<addr>/screenshot?token=…` with a
JSON body — see https://www.browserless.io/docs/rest-apis for routes.

## Repo layout

- `startos/manifest/index.ts` — image pin (digest), single x86_64 arch
- `startos/main.ts` — one daemon on the image's own entrypoint, `/pressure` health check
- `startos/interfaces.ts` — one HTTP interface, port 3000
- `startos/actions/showApiToken.ts` — reveals the install-generated token
- `UPDATING.md` — how to bump the pin intentionally
