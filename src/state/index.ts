import { Action } from './actions'
import patcher from './patcher'
import { Issue } from './essences/issue'

interface IssuesFetching {
  readonly status: 'fetching',
}
interface IssuesFetched {
  readonly status: 'success',
  readonly data: {
    issues: Issue[],
  }
}
interface IssuesErrored {
  readonly status: 'errored',
  readonly error: any,
}

type Issues = IssuesFetching | IssuesFetched | IssuesErrored

export interface State {
  readonly issues?: Issues,
}

export function reducer(state: State, action: Action): State {
  return {
    ...state,
    ...patcher(state, action),
  }
}
