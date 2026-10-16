# max-marketplace

Личный маркетплейс плагинов Максима для Claude. Плагины: `max-kit`, `design-kit`, мод `usage-bar`.

- `plugins/max-kit/`: агенты, скиллы и правило пула (описание в `plugins/max-kit/README.md`)
- `plugins/design-kit/`: агенты для дизайна, сейчас card-reviewer (описание в `plugins/design-kit/README.md`)
- Подключение: claude.ai → Customize → Plugins → Add → Add marketplace → `GafarovMaxim/Claude`, включить Sync automatically
- Новый агент: файл в `plugins/max-kit/agents/`, поднять `version` в `plugins/max-kit/.claude-plugin/plugin.json`, закоммитить в main
