import { Action } from './actions'
import patcher from './patcher'

export interface State {
  readonly clicks: number
}

export function reducer(state: State, action: Action): State {
  return {
    ...state,
    ...patcher(state, action),
  }
}
