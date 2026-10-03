# Репозиторий GafarovMaxim/Claude

Личный маркетплейс `max-marketplace` с плагином `max-kit` (агенты, скиллы, правило пула). Единственный источник правды для агентов и скиллов Максима. Подробности: `docs/WORKSPACE.md`.

## Порядок правок плагина

1. Агент: `plugins/max-kit/agents/<имя>.md`. Скилл: `plugins/max-kit/skills/<имя>/SKILL.md`.
2. Поднять `version` в `plugins/max-kit/.claude-plugin/plugin.json`.
3. Проверить: `claude plugin validate .`
4. Если нужен вызов агента по умолчанию, добавить строку в `plugins/max-kit/hooks/agent-pool.md`.
5. Обновить таблицу в `docs/WORKSPACE.md` и README плагина.

## Договорённости

- Общаться по-русски, коротко, без жаргона.
- Ничего на компьютере и в аккаунте Максима не менять без его согласия.
- Правки идут через PR из треда проекта «Рабочее пространство».
