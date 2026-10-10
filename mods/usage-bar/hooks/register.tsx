import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Usage } from '../types'

const usage = atom(
  { plugin: 'usage-bar', key: 'usage' } as const,
  { context: null, fiveHour: null, sevenDay: null } as Usage
)

const find = (limits: readonly { kind: string; percentUsed: number }[], kind: string) =>
  limits.find(l => l.kind === kind)?.percentUsed ?? null

const fmt = (v: number | null) => (v === null ? '—' : `${Math.round(v)}%`)

export const register: Register = on => {
  on('session.measure', async ($, e, next) => {
    await update($, usage, () => ({
      context: e.context.percent ?? null,
      fiveHour: find(e.rateLimits, 'five_hour'),
      sevenDay: find(e.rateLimits, 'seven_day')
    }))

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const u = await read($, usage)

    if (e.props.hasSurvey) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const warn = (v: number | null) => v !== null && v >= 85

    return (
      <Box>
        <Text dimColor>Контекст </Text>
        <Text color={warn(u.context) ? 'red' : undefined}>{fmt(u.context)}</Text>
        <Text dimColor> · 5 ч </Text>
        <Text color={warn(u.fiveHour) ? 'red' : undefined}>{fmt(u.fiveHour)}</Text>
        <Text dimColor> · неделя </Text>
        <Text color={warn(u.sevenDay) ? 'red' : undefined}>{fmt(u.sevenDay)}</Text>
      </Box>
    )
  })
}
