# max-kit

Личный плагин Максима для Claude.

| Что | Тип | Как вызвать |
|---|---|---|
| web-researcher | агент (Haiku, только поиск) | вызывается сам через скилл web-search; вручную: «найди через web-researcher …» |
| web-search | скилл | срабатывает сам на любой запрос, где нужен интернет; вручную `/max-kit:web-search` |
| health-tracker | скилл | «запиши вес 66,5», «сводка за неделю», «составь меню»; вручную `/max-kit:health-tracker` |

Правило пула: `hooks/agent-pool.md` подгружается при старте каждой сессии в Claude Code, Cowork и тредах проектов, поэтому новые проекты сразу знают про агентов. Новый агент: положить `.md` в `agents/` с описанием «MUST BE USED proactively for …».

Где работает: чат claude.ai (только скиллы), Cowork, Claude Code на компьютере (после `/reload-plugins`), треды проектов.

Обновление: поменять файлы, поднять `version` в `.claude-plugin/plugin.json`, заново упаковать zip и загрузить в claude.ai → Customize → Plugins.
