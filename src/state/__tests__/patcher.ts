import { State } from '..'

import * as actions from '../actions'
import patcher from '../patcher'

const defaultState: State = {
  clicks: 0,
}

describe('Inc', () => {
  it('should inc', () => {
    const state: State = {
      ...defaultState,
      clicks: 0,
    }

    const { clicks } = patcher(state, actions.inc())
    expect(clicks).toBe(1)
  })
})
