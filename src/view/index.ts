import { div, button } from '@cycle/dom'

import { Sinks, Sources } from '..'

export default function view(sources: Sources): Sinks {
  const vdom$ = sources.state.$.map(state => {
    return div([
      button('.inc', '+'),
      div(`Gantt Jira: ${state.clicks}`),
    ])
  })

  const incClick$ = sources.DOM
    .select('.inc')
    .events('click')
    .mapTo(sources.state.actions.inc())

  return {
    DOM: vdom$,
    state: incClick$,
  }
}
