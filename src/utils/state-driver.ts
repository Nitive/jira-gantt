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

export function makeStateDriver<State, Action, Actions>(
  initialState: State,
  actions: Actions,
  reducer: (state: State, action: Action) => State,
): StateSource<State, Action, Actions, Action>
export function makeStateDriver<State, Action, Actions, MiddlewareInput>(
  initialState: State,
  actions: Actions,
  reducer: (state: State, action: Action) => State,
  middleware: (mi: MiddlewareInput) => Stream<Action>,
): StateSource<State, Action, Actions, MiddlewareInput> {
  if (middleware) {
    return function stateDriverWithMiddleware(actions$: Stream<MiddlewareInput>) {
      return new StateSource(initialState, actions, reducer, middleware, actions$)
    }
  }

  function defaultMiddleware(action: Action): Stream<Action> {
    return xs.of(action)
  }

  return function stateDriver(actions$: Stream<Action>) {
    return new StateSource(initialState, actions, reducer, defaultMiddleware, actions$)
  }
}
