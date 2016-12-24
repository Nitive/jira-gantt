import { Stream } from 'xstream'

export class StateSource<State, Action, Actions> {
  public readonly $: Stream<State>
  public readonly actions: Actions

  constructor(
    initialState: State,
    actions: Actions,
    reducer: (state: State, action: Action) => State,
    actions$: Stream<Action>,
  ) {
    this.$ = actions$.fold(reducer, initialState)
    this.actions = actions
  }
}

export function makeStateDriver<State, Action, Actions>(
  initialState: State,
  actions: Actions,
  reducer: (state: State, action: Action) => State,
) {
  return function stateDriver(actions$: Stream<Action>) {
    return new StateSource(initialState, actions, reducer, actions$)
  }
}
