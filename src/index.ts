import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, VNode } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'
import { makeStateDriver, streamToActionMiddleware, StateSource } from './utils/state-driver'

import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { State } from './state'
import { reducer } from './state/reducer'
import * as actions from './state/actions'
import { Action } from './state/actions'
import { main } from './view'


export interface Sources {
  DOM: DOMSource,
  state: StateSource<State, Action, typeof actions>,
  keys: KeysSource,
}

type MiddlewareInput = Action | Stream<Action>
export interface Sinks {
  DOM: Stream<VNode>,
  state: Stream<MiddlewareInput>,
}

const initialState = {}

run(main, {
  DOM: makeDOMDriver('#app'),
  state: makeStateDriver(initialState, actions, reducer, streamToActionMiddleware),
  keys: makeKeysDriver(),
})
