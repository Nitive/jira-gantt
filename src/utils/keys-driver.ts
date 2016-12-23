import xs, { Stream } from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'

export const enum KeyCode {
  Space = 32,
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
}

export class KeysSource {
  down(code: KeyCode): Stream<KeyboardEvent> {
    return fromEvent(document, 'keydown')
      .filter(event => event.keyCode === code)
  }

  up(code: KeyCode): Stream<KeyboardEvent> {
    return fromEvent(document, 'keyup')
      .filter(event => event.keyCode === code)
  }

  press(code: KeyCode): Stream<boolean> {
    return xs.merge(
      this.down(code).mapTo(true),
      this.up(code).mapTo(false),
    )
  }
}

export function makeKeysDriver () {
  return function keysDriver() {
    return new KeysSource()
  }
}
