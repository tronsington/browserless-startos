import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { storeJson } from '../fileModels/store.json'

export const showToken = sdk.Action.withoutInput(
  'show-api-token',
  async () => ({
    name: i18n('Show API Token'),
    description: i18n(
      'Reveal the API token clients must pass as ?token=… to use Browserless',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),
  async ({ effects }) => ({
    version: '1' as const,
    title: i18n('API Token'),
    message: i18n(
      'Clients append this as ?token=… to every Browserless REST call or WebSocket connection.',
    ),
    result: {
      type: 'single' as const,
      value: (await storeJson.read((s) => s.apiToken).once()) || '',
      copyable: true,
      qr: false,
      masked: true,
      launchable: false,
    },
  }),
)
