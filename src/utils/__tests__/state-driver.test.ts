import xs from 'xstream'
import { makeStateDriver } from '../state-driver'

describe('stateDriver', () => {
  it('should apply actions', () => {
    const driver = makeStateDriver({ clicks: 0 })
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
