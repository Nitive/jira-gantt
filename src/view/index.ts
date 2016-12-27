import { div, button } from '@cycle/dom'

import { Sinks, Sources } from '..'
import { issueRow } from './components/issue'

export function main(sources: Sources): Sinks {
  const vdom$ = sources.state.$.map(state => {
    return div([
      button('.inc', 'fetch'),
      state.issues && div([
        state.issues.status === 'fetching' && div('fetching...'),
        state.issues.status === 'success' && div(
          state.issues.data.issues.map(issueRow),
        ),
        state.issues.status === 'errored' && div('Error!'),
      ]),
    ])
  })

  const inc$ = sources.DOM
    .select('.inc')
    .events('click')
    .map(() => sources.state.actions.getIssuesForVersion('Mobile S13-1'))
    .flatten()

  return {
    DOM: vdom$,
    state: inc$,
  }
}
