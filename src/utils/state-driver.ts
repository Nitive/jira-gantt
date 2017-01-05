import xs, { Stream } from 'xstream'

export type MiddlewareInput = any
export type Middleware<MI, A> = (middlewareInput: MI) => Stream<A>
export type Reducer<S, A> = (state: S, action: A) => S

export class StateSource<State, Action, Actions> {
  public readonly $: Stream<State>
  public readonly actions: Actions

  constructor(
    initialState: State,
    actions: Actions,
    reducer: (state: State, action: Action) => State,
    middleware: Middleware<MiddlewareInput, Action>,
    actions$: Stream<MiddlewareInput>,
  ) {
    this.actions = actions
    this.$ = actions$
      .map(middleware)
      .flatten()
      .fold(reducer, initialState)
  }
}

export function makeStateDriver<State, Action, Actions>(
  initialState: State,
  actions: Actions,
  reducer: Reducer<State, Action>,
  middleware: Middleware<MiddlewareInput, Action> = (action: Action) => xs.of(action),
) {
  return function stateDriver(actions$: Stream<MiddlewareInput>) {
    return new StateSource(initialState, actions, reducer, middleware, actions$)
  }
}


// extra

function isStream<T>(stream: any): stream is Stream<T> {
  return stream instanceof Stream
}

export function flatActionsStreamMiddleware<A>(action: A | Stream<A>): Stream<A> {
  return isStream(action)
    ? action
    : xs.of(action)
}
