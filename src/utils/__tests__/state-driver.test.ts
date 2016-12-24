import xs from 'xstream'
import { makeStateDriver } from '../state-driver'

describe('stateDriver', () => {
  it('should apply actions', () => {
    interface State {
      clicks: number,
    }

    const st: State = { clicks: 0 }
    type Action = { type: 'Inc' }
    const actions = {
      inc: (): Action => ({ type: 'Inc' }),
    }
    function reducer(state: State, action: Action): State {
      switch (action.type) {
        case 'Inc': {
          return {
            ...state,
            clicks: state.clicks + 1,
          }
        }
      }
    }

    const driver = makeStateDriver(st, actions, reducer)
    const actions$ = xs.fromArray([
      { type: 'Inc' },
      { type: 'Inc' },
      { type: 'Inc' },
    ] as { type: 'Inc' }[])
    const state = driver(actions$)

    let clicks = 0
    return new Promise((resolve, reject) => {
      state.$
        .addListener({
          next(state) {
            expect(state.clicks).toEqual(clicks)
            clicks++
            if (clicks === 4) {
              resolve()
            }
          },
          error: reject,
          complete: () => {
            reject('should resolve before complete')
          },
        })
    })
  })
})
