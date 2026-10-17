export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Browserless': 0,
  'Browserless API': 1,
  'Browserless is ready': 2,
  'Browserless is not ready': 3,
  // interfaces.ts
  Browserless: 4,
  'Headless Chromium automation API (REST + WebSocket) and its management dashboard': 5,
  // actions/showApiToken.ts
  'Show API Token': 6,
  'Reveal the API token clients must pass as ?token=… to use Browserless': 7,
  'API Token': 8,
  'Clients append this as ?token=… to every Browserless REST call or WebSocket connection.': 9,
} as const

export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
