name: notification
version: 1.0.0
type: module

backend: true
frontend: false

entry:
  backend: module.go
  frontend: index.ts

dependencies: []

routes:
  - /notification

events:
  publish: []
  subscribe: []

permissions:
  - public

config:
  env: []