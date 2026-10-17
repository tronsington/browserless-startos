import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  // Same shape for every kind the way the relay package's later-generation
  // fixes established after 1.0.0:0 — 'install' alone misses upgrades of
  // installs created before a field existed. This file ships with the token
  // since v1, but write only if absent so a restore/reinstall never rotates
  // a token clients may already hold.
  const current = await storeJson.read((s) => s.apiToken).once()
  if (current && current.length > 0) {
    void kind
    return
  }

  await storeJson.merge(effects, {
    apiToken: utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 40 }),
  })
})
