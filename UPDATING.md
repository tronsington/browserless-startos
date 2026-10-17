# Updating the upstream version

Upstream is the prebuilt image `ghcr.io/browserless/chrome`, versioned as
`vX.Y.Z` tags on the registry (and matching GitHub releases on
browserless/browserless). This package pins by **digest**, not tag, so an
install can never pull an image it has not been tested against.

A bump is:

1. Pick the upstream release (https://github.com/browserless/browserless/releases).
2. Resolve its digest: `docker buildx imagetools inspect ghcr.io/browserless/chrome:vX.Y.Z` —
   take the **index digest** (the top `Digest:` line), and confirm `Platform:`
   lines. Also re-check the URL (`chrome` vs `chromium`): if this pin ever
   moves to the multi-arch `chromium` flavour, update `arch` in the manifest
   and `ARCHES :=` in the Makefile in the same commit.
3. Update `dockerTag` in `startos/manifest/index.ts` and the digest noted in
   `README.md`'s table, and set `version` in `startos/versions/current.ts` to
   `X.Y.Z:N` (`N` resets to 0 on an upstream bump; it increments only for a
   package-only change on the same upstream).
4. Update the release notes in `startos/versions/current.ts` (5 locales).
5. Build + install on a test box and hit `/pressure` and a real REST route
   before calling it done.
