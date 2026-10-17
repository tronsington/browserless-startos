// The one port StartOS binds, and the port the browserless daemon itself
// listens on (PORT env). Single process, no sidecars, no proxy layer:
// HTTP routes (/screenshot, /pdf, /content, /pressure, ...) and WebSocket
// endpoints (Puppeteer/Playwright) share this one port upstream.
export const BROWSERLESS_PORT = 3000
