import { Stream } from 'xstream'
import { div, button, VNode } from '@cycle/dom'

import { State } from '../state'

export default function view(state$: Stream<State>): Stream<VNode> {
  return state$.map(state => {
    return div([
      button('.inc', '+'),
      div(`Gantt Jira: ${state.clicks}`),
    ])
  })
}
