import xs, { Stream } from 'xstream'

export type MiddlewareInput = any
export type Middleware<Action, State> = (middlewareInput: MiddlewareInput, state: Stream<State>) => Stream<Action>
export type Reducer<S, A> = (state: S, action: A) => S

export class StateSource<State, Action, Actions> {
  public readonly $: Stream<State>
  public readonly actions: Actions

  constructor(
    initialState: State,
    actions: Actions,
    reducer: (state: State, action: Action) => State,
    middleware: Middleware<Action, State>,
    actions$: Stream<MiddlewareInput>,
  ) {
    this.actions = actions
    this.$ = actions$
      .map(action => middleware(action, this.$))
      .flatten()
      .fold(reducer, initialState)
  }
}

export function makeStateDriver<State, Action, Actions>(
  initialState: State,
  actions: Actions,
  reducer: Reducer<State, Action>,
  middleware: Middleware<Action, State> = (action: Action) => xs.of(action),
) {
  return function stateDriver(actions$: Stream<MiddlewareInput>) {
    return new StateSource(initialState, actions, reducer, middleware, actions$)
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
