import { test } from 'claude-code/testing'

test('measure проходит без ошибок с обоими лимитами', async ($, on) => {
  on('session.measure', (_$, e) => ({ changed: e.changed }))

  await $.session.measure({
    context: { window: 1000000, tokens: 420000, percent: 42 },
    rateLimits: [
      { kind: 'five_hour', percentUsed: 23.5 },
      { kind: 'seven_day', percentUsed: 90 }
    ],
    changed: ['context', 'rateLimits']
  })

})
