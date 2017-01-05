import xs, { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, VNode } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'

import { JiraApi } from './api/'
import { makeStateDriver, flatActionsStreamMiddleware, StateSource, Middleware } from './utils/state-driver'
import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { State, ActionContext } from './state'
import { reducer } from './state/reducer'
import * as actions from './state/actions'
import { Action } from './state/actions'
import { main } from './view'


export interface Sources {
  DOM: DOMSource,
  state: StateSource<State, Action, typeof actions>,
  keys: KeysSource,
}

type FunctionInput = (ctx: ActionContext) => Action | Stream<Action>
type MiddlewareInput = Action | Stream<Action> | FunctionInput
export interface Sinks {
  DOM: Stream<VNode>,
  state: Stream<MiddlewareInput>,
}

const initialState = {}

function createPassContextMiddleware<C>(context: C) {
  return function passContextMiddleware<A>(action: A | ((ctx: C) => A)): Stream<A> {
    return xs.of(typeof action === 'function' ? action(context) : action)
  }
}

interface MergeMiddlewaresSignature {
  <A1, A2, A3>(
    m1: Middleware<A1 | A2 | A3, A2 | A3>,
    m2: Middleware<A2 | A3, A3>,
  ): Middleware<A1 | A2 | A3, A3>

  <A1, A2, A3, A4>(
    m1: Middleware<A1 | A2 | A3 | A4, A2 | A3 | A4>,
    m2: Middleware<A2 | A3 | A4, A3 | A4>,
    m3: Middleware<A3 | A4, A4>,
  ): Middleware<A1 | A2 | A3 | A4, A4>

  <A1, A2, A3, A4, A5>(
    m1: Middleware<A1 | A2 | A3 | A4 | A5, A2 | A3 | A4 | A5>,
    m2: Middleware<A2 | A3 | A4 | A5, A3 | A4 | A5>,
    m3: Middleware<A3 | A4 | A5, A4 | A5>,
    m4: Middleware<A4 | A5, A5>,
  ): Middleware<A1 | A2 | A3 | A4 | A5, A5>

  (...middlewares: Middleware<any, any>[]): Middleware<any, any>
}

const mergeMiddlewares: MergeMiddlewaresSignature = ((...middlewares: Middleware<any, any>[]) => {
  return function middleware(action: any): Stream<any> {
    return middlewares.reduce(
      (acc$, middleware) => acc$.map(middleware).flatten(),
      xs.of(action),
    )
  }
})

const api = new JiraApi()
const context: ActionContext = { api }

const middleware = mergeMiddlewares<FunctionInput, Stream<Action>, Action>(
  createPassContextMiddleware(context),
  flatActionsStreamMiddleware,
)

run(main, {
  DOM: makeDOMDriver('#app'),
  state: makeStateDriver(initialState, actions, reducer, middleware),
  keys: makeKeysDriver(),
})
