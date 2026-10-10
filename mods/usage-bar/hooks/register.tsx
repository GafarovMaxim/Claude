import type { Register } from 'claude-code'

const words = {
  ru: { context: 'Контекст', five: '5 ч', week: 'неделя' },
  en: { context: 'Context', five: '5h', week: 'week' },
  de: { context: 'Kontext', five: '5 Std', week: 'Woche' },
  fr: { context: 'Contexte', five: '5 h', week: 'semaine' },
  es: { context: 'Contexto', five: '5 h', week: 'semana' }
} as const

type Lang = keyof typeof words

// Язык берём из настройки language (язык ответов Claude), иначе из LANG/LC_ALL; по умолчанию английский.
const pickLang = (raw: unknown): Lang => {
  const s = String(raw ?? '').toLowerCase()
  const code = (Object.keys(words) as Lang[]).find(
    l => s === l || s.startsWith(l + '_') || s.startsWith(l + '-') || s.startsWith(l === 'ru' ? 'рус' : l === 'en' ? 'english' : '\0')
  )

  return code ?? 'en'
}

const find = (limits: readonly { kind: string; percentUsed: number }[], kind: string) =>
  limits.find(l => l.kind === kind)?.percentUsed ?? null

const fmt = (v: number | null) => (v === null ? '—' : `${Math.round(v)}%${v >= 85 ? '!' : ''}`)

export const register: Register = on => {
  let lang: Lang = 'en'

  on('session.start', async ($, e, next) => {
    const { language } = (await $.settings.read()) as { language?: string }
    const env = language ?? (await $.env.get('LC_ALL')) ?? (await $.env.get('LANG'))
    lang = pickLang(env)

    return next(e)
  })

  // Строка под окном ввода: $.ui.status закрепляет текст под строкой ввода.
  on('session.measure', async ($, e, next) => {
    const w = words[lang]
    const ctx = fmt(e.context.percent ?? null)
    const five = fmt(find(e.rateLimits, 'five_hour'))
    const week = fmt(find(e.rateLimits, 'seven_day'))
    $.ui.status(`${w.context} ${ctx} · ${w.five} ${five} · ${w.week} ${week}`)

    return next(e)
  })
}
