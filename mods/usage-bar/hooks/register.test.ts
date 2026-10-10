import { expect, test } from 'claude-code/testing'

test('подсказка под вводом показывает три значения', async ($, on) => {
  on('session.usage', () => ({ value: {
    startedAt: 0,
    context: { window: 1000000, tokens: 420000, percent: 42 },
    rateLimits: [
      { kind: 'five_hour', percentUsed: 23.5 },
      { kind: 'seven_day', percentUsed: 90 }
    ]
  } }))

  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await $.ui.mount({
      plugin: 'usage-bar',
      surface,
      component: 'PromptHint',
      props: { isDraft: false, isWorking: false, hint: '' } as never
    })
    expect(await ui.find({ type: 'Text', text: /42%.*24%.*90%/ })).toBeDefined()
    await ui.unmount()
  }
})
