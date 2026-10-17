import { sdk } from './sdk'

// Only the package's own 'main' volume exists (it holds store.json with the
// generated API token); browserless itself is stateless and never mounts it.
export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.ofVolumes('main'),
)
