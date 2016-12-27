import { span } from '@cycle/dom'

const style = {
  'padding': '1px 4px',
  'border': 'solid 2px #4990E2',
  'border-radius': '3px',
  'background-color': '#A7CFFE',
}

export function taskLabel(taskKey: string) {
  return span({ style }, taskKey)
}
