import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store.json'
import { BROWSERLESS_PORT } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Browserless'))

  // Mapped read: only the token feeds daemon env, so nothing else can ever
  // re-run setupMain and bounce the daemon.
  const store = await storeJson.read((s) => ({ apiToken: s.apiToken })).const(effects)
  const apiToken = store?.apiToken ?? ''

  /**
   * ======================== Browserless (single daemon) ========================
   * One process, no sidecars. The official image's own entrypoint starts the
   * service; PORT matches the interface binding in interfaces.ts, and TOKEN
   * gates every endpoint (browserless rejects unauthenticated API and
   * WebSocket connections when it is set).
   *
   * Deliberately *not* configurable in v1: concurrency/queue/memory knobs
   * (MAX_CONCURRENT_SESSIONS, QUEUE_LENGTH, WORKSPACE_* etc. — upstream's own
   * defaults apply). Add them as actions if real use demands it.
   */
  const browserlessSub = sdk.SubContainer.of(
    effects,
    { imageId: 'browserless' },
    // No volume mount: the service is stateless. store.json lives on the
    // 'main' volume at the platform layer, which never touches the container.
    sdk.Mounts.of(),
    'browserless',
  )

  return sdk.Daemons.of(effects).addDaemon('browserless', {
    subcontainer: browserlessSub,
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        PORT: String(BROWSERLESS_PORT),
        TOKEN: apiToken,
      },
    },
    ready: {
      display: i18n('Browserless API'),
      fn: () =>
        // /pressure is upstream's own documented readiness endpoint (their
        // Kubernetes deployment guide health-checks against it). It answers
        // 401 without the token, so the check carries it as a query param —
        // the same auth shape clients use.
        sdk.healthCheck.checkWebUrl(
          effects,
          `http://127.0.0.1:${BROWSERLESS_PORT}/pressure?token=${apiToken}`,
          {
            successMessage: i18n('Browserless is ready'),
            errorMessage: i18n('Browserless is not ready'),
          },
        ),
      // Chromium startup plus any preboot work happens before the port
      // accepts connections; give the first poll room or it crash-loops.
      gracePeriod: 30_000,
    },
    requires: [],
  })
})
