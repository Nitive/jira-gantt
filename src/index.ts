import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, VNode } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'
import { makeStateDriver, StateSource } from './utils/state-driver'

import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { State } from './state'
import { reducer } from './state/reducer'
import * as actions from './state/actions'
import { main } from './view'

export interface Sources {
  DOM: DOMSource,
  state: StateSource<State, actions.Action, typeof actions>,
  keys: KeysSource,
}

export interface Sinks {
  DOM: Stream<VNode>,
  state: Stream<actions.Action>,
}

const initialState = {}

run(main, {
  DOM: makeDOMDriver('#app'),
  state: makeStateDriver(initialState, actions, reducer),
  keys: makeKeysDriver(),
})
