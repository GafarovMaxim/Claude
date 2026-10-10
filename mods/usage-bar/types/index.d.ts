export type Usage = {
  context: number | null
  fiveHour: number | null
  sevenDay: number | null
}

declare module 'claude-code' {
  interface PluginState {
    'usage-bar': { usage: Usage }
  }
}
