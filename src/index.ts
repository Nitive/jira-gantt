import { Stream } from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver, DOMSource, VNode } from '@cycle/dom'
import { makeKeysDriver, KeysSource } from './utils/keys-driver'
import { model } from './state'
import { intent } from './state/intent'
import view from './view'

export interface Sources {
  DOM: DOMSource,
  keys: KeysSource,
}

export interface Sinks {
  DOM: Stream<VNode>,
}

function main(sources: Sources): Sinks {
  return {
    DOM: view(model(intent(sources))),
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  keys: makeKeysDriver(),
})
