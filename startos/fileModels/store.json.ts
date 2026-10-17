import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.looseObject({
  // Internal secret, auto-generated at install (see init/seedFiles.ts).
  // Feeds browserless's TOKEN env var; users reveal it via the
  // "Show API Token" action, never read the file directly.
  apiToken: z.string().catch(''),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'store.json' },
  shape,
)
