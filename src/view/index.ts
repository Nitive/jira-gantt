import sampleCombine from 'xstream/extra/sampleCombine'
import { form, input, img, div, button } from '@cycle/dom'

import { Sinks, Sources } from '..'
import { issueRow } from './components/issue'

export function main(sources: Sources): Sinks {
  const vdom$ = sources.state.$.map(state => {
    return form('.form', [
      input('.auth', { attrs: { type: 'text'} }),
      button('fetch'),
      state.issues && div([
        state.issues.status === 'fetching' && div('fetching...'),
        state.issues.status === 'success' && div(
          state.issues.data.issues.map(userIssues => {
            return div([
              div([
                img({ src: userIssues.user.avatar }),
                div(userIssues.user.name),
              ]),
              div(userIssues.issues.map(issueRow)),
            ])
          }),
        ),
        state.issues.status === 'errored' && div('Error!'),
      ]),
    ])
  })

  const auth$ = sources.DOM
    .select('.auth')
    .events('input')
    .map(e => (e.target as HTMLInputElement).value)

  const submit$ = sources.DOM
    .select('.form')
    .events('submit')
    .map(ev => ev.preventDefault())
    .compose(sampleCombine(auth$))
    .map(([_, auth]) => auth)

  const fetchIssues$ = submit$
    .map(auth => sources.state.actions.getIssuesForVersion('Mobile S1-1', auth))

  return {
    DOM: vdom$,
    state: fetchIssues$,
  }
}
