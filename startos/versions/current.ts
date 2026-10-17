import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.57.1:0',
  releaseNotes: {
    en_US:
      'Initial StartOS package of browserless v2.57.1 (ghcr.io/browserless/chrome, digest-pinned, x86_64-only upstream image). Exposes the REST/WebSocket automation API and dashboard, authenticated with an install-generated API token.',
    es_ES:
      'Paquete inicial para StartOS de browserless v2.57.1 (ghcr.io/browserless/chrome, fijado por digest, imagen upstream solo x86_64). Expone la API de automatización REST/WebSocket y el panel, autenticados con un token de API generado en la instalación.',
    de_DE:
      'Erstes StartOS-Paket für browserless v2.57.1 (ghcr.io/browserless/chrome, per Digest angepinnt, Upstream-Image nur x86_64). Stellt die REST/WebSocket-Automatisierungs-API und das Dashboard bereit, abgesichert mit einem bei der Installation erzeugten API-Token.',
    pl_PL:
      'Pierwszy pakiet StartOS dla browserless v2.57.1 (ghcr.io/browserless/chrome, przypięty po digeście, obraz upstream tylko x86_64). Udostępnia API automatyzacji REST/WebSocket oraz panel, zabezpieczone wygenerowanym przy instalacji tokenem API.',
    fr_FR:
      'Premier paquet StartOS pour browserless v2.57.1 (ghcr.io/browserless/chrome, épinglé par digest, image amont x86_64 uniquement). Expose l’API d’automatisation REST/WebSocket et le tableau de bord, protégés par un jeton d’API généré à l’installation.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
