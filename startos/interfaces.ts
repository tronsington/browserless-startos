import { T } from '@start9labs/start-sdk'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { BROWSERLESS_PORT } from './utils'

// One host, one binding, one interface — the browserless daemon's own port.
// HTTP (REST endpoints like /screenshot and /pdf) and WebSocket
// (Puppeteer/Playwright connect) share the same port upstream, so there is
// exactly one address to expose or tunnel.
export const hostId = 'browserless'
export const browserlessInterfaceId = 'api'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const multi = sdk.MultiHost.of(effects, hostId)
  const origin = await multi.bindPort(BROWSERLESS_PORT, {
    protocol: 'http',
    preferredExternalPort: BROWSERLESS_PORT,
  })

  const api = sdk.createInterface(effects, {
    name: i18n('Browserless'),
    id: browserlessInterfaceId,
    description: i18n(
      'Headless Chromium automation API (REST + WebSocket) and its management dashboard',
    ),
    type: 'api',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  return [await origin.export([api])]
})
