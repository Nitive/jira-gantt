import xs, { Stream } from 'xstream'

export type MiddlewareInput = any

export class StateSource<State, Action, Actions> {
  public readonly $: Stream<State>
  public readonly actions: Actions

  constructor(
    initialState: State,
    actions: Actions,
    reducer: (state: State, action: Action) => State,
    middleware: (middlewareInput: MiddlewareInput) => Stream<Action>,
    actions$: Stream<MiddlewareInput>,
  ) {
    this.$ = actions$
      .map(middleware)
      .flatten()
      .fold(reducer, initialState)
    this.actions = actions
  }
}

export function makeStateDriver<State, Action, Actions>(
  initialState: State,
  actions: Actions,
  reducer: (state: State, action: Action) => State,
  middleware?: (middlewareInput: MiddlewareInput) => Stream<Action>,
) {
  function defaultMiddleware(action: Action): Stream<Action> {
    return xs.of(action)
  }
  return function stateDriver(actions$: Stream<MiddlewareInput>) {
    return new StateSource(initialState, actions, reducer, middleware || defaultMiddleware, actions$)
  }
}


// extra

function isStream<T>(stream: any): stream is Stream<T> {
  return stream instanceof Stream
}

export function flatActionsStreamMiddleware<Action>(actionsStreamOrAction: Action | Stream<Action>): Stream<Action> {
  return isStream(actionsStreamOrAction)
    ? actionsStreamOrAction
    : xs.of(actionsStreamOrAction)
}
