import { makeKeysDriver, KeyCode } from '../keys-driver'

type KeyEventType = 'keydown' | 'keyup' | 'keypress'

function keyEvent(type: KeyEventType, keyCode: number) {
  const spaceDown = new KeyboardEvent(type, { keyCode } as any)
  document.dispatchEvent(spaceDown)
}

describe('keysDriver', () => {
  it('down', () => {
    const driver = makeKeysDriver()
    const keys$ = driver()

    return new Promise((resolve, reject) => {
      keys$
        .down(KeyCode.Space)
        .addListener({
          next(event) {
            expect(event.keyCode).toBe(32)
            resolve()
          },
          error: reject,
          complete: () => {
            throw new Error('should not complete')
          },
        })

        keyEvent('keydown', 32)
    })
  })

  it('up', () => {
    const driver = makeKeysDriver()
    const keys$ = driver()

    return new Promise((resolve, reject) => {
      keys$
        .up(KeyCode.Space)
        .addListener({
          next(event) {
            expect(event.keyCode).toBe(32)
            resolve()
          },
          error: reject,
          complete: () => {
            throw new Error('should not complete')
          },
        })

        keyEvent('keyup', 32)
    })
  })

  it('press', () => {
    const driver = makeKeysDriver()
    const keys$ = driver()
    let down = false
    const spy = jest.fn()

    return new Promise((resolve, reject) => {
      keys$
        .press(KeyCode.Space)
        .addListener({
          next(isPressed) {
            spy()
            if (down) {
              expect(isPressed).toBe(true)
            } else {
              expect(isPressed).toBe(false)

              expect(spy).toHaveBeenCalledTimes(2)
              resolve()
            }
          },
          error: reject,
          complete: () => {
            throw new Error('should not complete')
          },
        })

      down = true
      keyEvent('keydown', 32)
      down = false
      keyEvent('keyup', 32)
    })
  })
})
