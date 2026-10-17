ARCHES := x86
# browserless ships x86_64 only (upstream ghcr.io/browserless/chrome publishes
# amd64 alone); see README.md. overrides to s9pk.mk must precede the include.
include node_modules/@start9labs/start-sdk/s9pk.mk
