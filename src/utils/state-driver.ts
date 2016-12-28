import xs, { Stream } from 'xstream'

export class StateSource<State, Action, Actions, MiddlewareInput> {
  public readonly $: Stream<State>
  public readonly actions: Actions

  constructor(
    initialState: State,
    actions: Actions,
    reducer: (state: State, action: Action) => State,
    middleware: (mi: MiddlewareInput) => Stream<Action>,
    actions$: Stream<MiddlewareInput>,
  ) {
    this.$ = actions$
      .map(middleware)
      .flatten()
      .fold(reducer, initialState)
    this.actions = actions
  }
}

export function makeStateDriverWithMiddleware<State, Action, Actions, MiddlewareInput>(
  initialState: State,
  actions: Actions,
  reducer: (state: State, action: Action) => State,
  middleware: (mi: MiddlewareInput) => Stream<Action>,
) {
  return function stateDriver(actions$: Stream<MiddlewareInput>) {
    return new StateSource(initialState, actions, reducer, middleware, actions$)
  }
}

export function makeStateDriver<State, Action, Actions>(
  initialState: State,
  actions: Actions,
  reducer: (state: State, action: Action) => State,
) {
  function defaultMiddleware(action: Action): Stream<Action> {
    return xs.of(action)
  }
  return makeStateDriverWithMiddleware(initialState, actions, reducer, defaultMiddleware)
}


// extra

function isStream<T>(stream: any): stream is Stream<T> {
  return stream instanceof Stream
}

export function streamToActionMiddleware<Action>(actionsStreamOrAction: Action | Stream<Action>): Stream<Action> {
  return isStream(actionsStreamOrAction)
    ? actionsStreamOrAction
    : xs.of(actionsStreamOrAction)
}
