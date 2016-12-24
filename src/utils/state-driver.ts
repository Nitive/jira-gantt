import { Stream } from 'xstream'

import { State } from '../state'
import patcher from '../state/patcher'
import * as actions from '../state/actions'

function applyPatch(state: State, action: actions.Action) {
  return {
    ...state,
    ...patcher(state, action),
  }
}

export class StateSource {
  public readonly $: Stream<State>
  public readonly actions = actions

  constructor(initialState: State, actions$: Stream<actions.Action>) {
    this.$ = actions$.fold(applyPatch, initialState)
  }
}

export function makeStateDriver(initialState: State) {
  return function stateDriver(actions$: Stream<actions.Action>) {
    return new StateSource(initialState, actions$)
  }
}
