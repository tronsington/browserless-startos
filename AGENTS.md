# AGENTS.md — browserless-startos

StartOS service-package repository wrapping the official
`ghcr.io/browserless/chrome` image (pinned release tag; multi-arch amd64-only
— see README's "Image pin policy"). One daemon, one port (3000, shared
HTTP+WebSocket), no sidecars, no proxy. **Start every task at the SDK recipe
index** (`../start-technologies/projects/start-sdk/docs/src/recipes.md` or
docs.start9.com/packaging) — same discipline as the sibling packages.

## State

- `main` volume holds only `store.json` (`apiToken`, generated at install in
  `init/seedFiles.ts`). The service is stateless — sessions die with their
  pod. Backups = `ofVolumes('main')` only; nothing else is worth capturing.
- There is **one** `storeJson` full-write hazard to carry: any new store
  field must be threaded through every existing write site. Today there is
  exactly one storage call (`init/seedFiles.ts`'s conditional merge); adding
  fields means auditing as you go.

## What not to "fix"

- **Auth is `TOKEN` env + `?token=` query string**, not headers and not a
  login page. That's upstream's model; the proxy does not add anything.
- **The `/pressure?…` health check** in `main.ts` is upstream's own
  documented readiness probe (their k8s guide). Don't replace it with a port
  check — a bound-but-wedged Chromium passes a port check.
- **x86_64 only.** The chrome flavour is amd64-only; the aarch64 path goes
  through `ghcr.io/browserless/chromium` (multi-arch), not through hacking
  this pin. See UPDATING.md.
- **No tuning env vars** (MAX_CONCURRENT_SESSIONS etc.) are set — upstream
  defaults apply on purpose for v1. Adding them means an action with real
  validation, not a comment-filled error.
- `version` in `current.ts` moves with upstream's release tag (see
  UPDATING.md). The `:N` suffix is the package build number.

## REST route prefix (verified on a real install, 2026-11-06)
- This image mounts its REST handlers under **`/chrome/…`** (`build/routes/chrome/http/*.post.js`,
  each `path = HTTPRoutes.chromeContent` etc.), so `/chrome/content`, `/chrome/screenshot`,
  `/chrome/pdf`, `/chrome/function`, `/chrome/playwright`, `/chrome/scrape`, `/chrome/download`,
  `/chrome/performance` work and the bare `/content`, `/screenshot` from browserless's public docs
  return 404. The root URL is also 404 — the docs page is `/docs/`. Live proof on the box:
  `/chrome/content {url: example.com}` → 200 with real HTML, `/chrome/screenshot` → 200 image/png,
  `/json/version` → `Chrome/155.0.8059.84`, `/pressure` → `isAvailable: true`.
- Keep `instructions.md` in step with that: a 404 here reads like a broken package, not a path.
