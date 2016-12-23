import { Stream } from 'xstream'

import { Sources } from '..'

import * as actions from './actions'

export function intent(sources: Sources): Stream<actions.Action> {
  return sources.DOM.select('.inc').events('click').mapTo(actions.inc())
}
