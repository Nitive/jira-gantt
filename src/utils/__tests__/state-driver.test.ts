import xs, { Stream } from 'xstream'
import { makeStateDriver } from '../state-driver'

describe('stateDriver', () => {
  interface State {
    clicks: number,
  }

  const st: State = { clicks: 0 }
  type Action = { type: 'Inc' }
  const action: Action = { type: 'Inc' }
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

  it('should apply actions', () => {
    const driver = makeStateDriver(st, actions, reducer)
    const actions$ = xs.fromArray([ action, action, action ])
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

  it('should apply middleware', () => {
    function middleware(streamOfActions: Stream<Action>): Stream<Action> {
      return streamOfActions
    }

    const driver = makeStateDriver(st, actions, reducer, middleware)
    const actions$ = xs.fromArray([ xs.of(action), xs.of(action) ])
    const state = driver(actions$)

    let clicks = 0
    return new Promise((resolve, reject) => {
      state.$
        .addListener({
          next(state) {
            expect(state.clicks).toEqual(clicks)
            clicks++
            if (clicks === 3) {
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
