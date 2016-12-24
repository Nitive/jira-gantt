import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, VNode } from '@cycle/dom'
import { DOMSource } from '@cycle/dom/xstream-typings'
import { makeStateDriver, StateSource } from './utils/state-driver'

import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { Action } from './state/actions'
import view from './view'

export interface Sources {
  DOM: DOMSource,
  state: StateSource,
  keys: KeysSource,
}

export interface Sinks {
  DOM: Stream<VNode>,
  state: Stream<Action>,
}

function main(sources: Sources): Sinks {
  return view(sources)
}

const initialState = {
  clicks: 0,
}

run(main, {
  DOM: makeDOMDriver('#app'),
  state: makeStateDriver(initialState),
  keys: makeKeysDriver(),
})
