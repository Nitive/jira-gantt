import { Stream } from 'xstream'

import patcher from './patcher'
import { Action } from './actions'

export interface State {
  readonly clicks: number
}

const initialState: State = {
  clicks: 0,
}

function applyPatch(state: State, action: Action) {
  return {
    ...state,
    ...patcher(state, action),
  }
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(applyPatch, initialState)
}
