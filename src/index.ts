import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, VNode } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'

import { JiraApi } from './api/'
import { makeStateDriver, flatActionsStreamMiddleware, StateSource } from './utils/state-driver'
import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { State } from './state'
import { reducer } from './state/reducer'
import * as actions from './state/actions'
import { Action, Context } from './state/actions'
import { main } from './view'


export interface Sources {
  DOM: DOMSource,
  state: StateSource<State, Action, typeof actions>,
  keys: KeysSource,
}

type FunctionInput = ({ api }: Context) => Action | Stream<Action>
type MiddlewareInput = Action | Stream<Action> | FunctionInput
export interface Sinks {
  DOM: Stream<VNode>,
  state: Stream<MiddlewareInput>,
}

const initialState = {}

import xs from 'xstream'

function createPassContextMiddleware<C>(context: C) {
  return function passContextMiddleware<A>(action: A | ((ctx: C) => A)): Stream<A> {
    return typeof action === 'function'
      ? xs.of(action(context))
      : xs.of(action)
  }
}

const api = new JiraApi('user:pass')
const context: Context = { api }

function middleware(action: MiddlewareInput): Stream<Action> {
  return createPassContextMiddleware(context)(action)
    .map(flatActionsStreamMiddleware)
    .flatten()
}

run(main, {
  DOM: makeDOMDriver('#app'),
  state: makeStateDriver(initialState, actions, reducer, middleware),
  keys: makeKeysDriver(),
})
