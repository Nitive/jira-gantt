// tslint:disable:no-switch-case-fall-through
// see https://github.com/palantir/tslint/issues/1538#issuecomment-253700633

import { State } from '.'
import { Action } from './actions'

export default function patcher(state: State, action: Action): Partial<State> {
  switch (action.type) {
    case 'Inc': {
      return {
        clicks: state.clicks + 1,
      }
    }

    case 'GetIssuesForVersionPending': {
      return {
        issues: {
          status: 'fetching',
        },
      }
    }

    case 'GetIssuesForVersionSuccess': {
      return {
        issues: {
          status: 'success',
          data: action.data,
        },
      }
    }

    case 'GetIssuesForVersionErrored': {
      return {
        issues: {
          status: 'errored',
          error: action.error,
        },
      }
    }
  }
}
