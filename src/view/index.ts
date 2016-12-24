import { div, button } from '@cycle/dom'
import * as api from '../api'

import { Sinks, Sources } from '..'

export default function main(sources: Sources): Sinks {
  const vdom$ = sources.state.$.map(state => {
    return div([
      button('.inc', '+'),
      div(`Gantt Jira: ${state.clicks}`),
    ])
  })

  const inc$ = sources.DOM
    .select('.inc')
    .events('click')
    .mapTo(sources.state.actions.inc())

  return {
    DOM: vdom$,
    HTTP: api.project('CSSSR'),
    state: inc$,
  }
}
