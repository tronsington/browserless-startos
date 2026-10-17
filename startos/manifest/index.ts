import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'browserless',
  title: 'Browserless',
  // Upstream (github.com/browserless/browserless) is dual-licensed:
  // SSPL-1.0 OR the browserless commercial license.
  license: 'SSPL-1.0',
  packageRepo: 'https://github.com/tronsington/browserless-startos',
  upstreamRepo: 'https://github.com/browserless/browserless',
  marketingUrl: 'https://www.browserless.io',
  donationUrl: null,
  description: { short, long },
  // 'main' carries only this package's own store.json (the generated API
  // token) — it is never mounted into the browserless container itself.
  volumes: ['main'],
  images: {
    // ghcr.io/browserless/chrome v2.57.1, pinned by digest (kit-verified):
    // index sha256:830357…, amd64 child sha256:8677f2cb….
    // Upstream publishes the chrome flavor x86_64-only; the chromium flavor
    // (ghcr.io/browserless/chrome -> 'browserless/chromium') is multi-arch —
    // an arm64 package later = switch image, do not re-litigate.
    browserless: {
      source: {
        dockerTag:
          'ghcr.io/browserless/chrome@sha256:830357995d37c2cee7441d5ba640c426cc8e0112aaba05ce742ea5ecabbc69da',
      },
      arch: ['x86_64'],
    },
  },
  // One Chromium tab is heavyweight; 2 GiB headroom matches the relay
  // package's precedent and keeps a couple of concurrent sessions safe.
  hardwareRequirements: {
    ram: 2 * 1024 ** 3,
  },
})
