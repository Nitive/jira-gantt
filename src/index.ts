import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, VNode } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'
import { makeStateDriver, StateSource } from './utils/state-driver'
import { makeHTTPDriver, HTTPSource, RequestInput } from '@cycle/http'

import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { reducer, State } from './state'
import * as actions from './state/actions'
import main from './view'

export interface Sources {
  DOM: DOMSource,
  HTTP: HTTPSource,
  state: StateSource<State, actions.Action, typeof actions>,
  keys: KeysSource,
}

export interface Sinks {
  DOM: Stream<VNode>,
  state: Stream<actions.Action>,
  HTTP: Stream<RequestInput>,
}

const initialState = {
  clicks: 0,
}

run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  state: makeStateDriver(initialState, actions, reducer),
  keys: makeKeysDriver(),
})
