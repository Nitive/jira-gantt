import { a } from '@cycle/dom'

const style = {
  'padding': '1px 4px',
  'border': 'solid 2px #4990E2',
  'border-radius': '3px',
  'background-color': '#A7CFFE',
}

export function issueLabel(issueKey: string) {
  const href = `https://cianru.atlassian.net/browse/${issueKey}`
  const attrs = { href, target: '_blank' }
  return a({ style, attrs }, issueKey)
}
