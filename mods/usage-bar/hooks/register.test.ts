import { expect, test } from 'claude-code/testing'

test('полоса показывает контекст и оба лимита', async ($, on) => {
  on('session.measure', (_$, e) => ({ changed: e.changed }))
  await $.session.measure({
    context: { window: 1000000, tokens: 420000, percent: 42 },
    rateLimits: [
      { kind: 'five_hour', percentUsed: 23.5 },
      { kind: 'seven_day', percentUsed: 7 }
    ],
    changed: ['context', 'rateLimits']
  })

  const ui = await $.ui.mount({
    plugin: 'usage-bar',
    surface: 'desktop',
    component: 'AbovePrompt',
    props: { hasSurvey: false } as never
  })
  const bar = await ui.find({ type: 'Text', text: /42%/ })
  expect(bar).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /24%/ })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /7%/ })).toBeDefined()
  await ui.unmount()
})
