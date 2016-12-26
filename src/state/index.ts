import { Action } from './actions'
import patcher from './patcher'

import { JiraSearchResponse } from '../api/search'

interface IssuesFetching {
  readonly status: 'fetching',
}
interface IssuesFetched {
  readonly status: 'success',
  readonly data: JiraSearchResponse
}
interface IssuesErrored {
  readonly status: 'errored',
  readonly error: any,
}

type Issues = IssuesFetching | IssuesFetched | IssuesErrored

export interface State {
  readonly clicks: number,
  readonly issues?: Issues,
}

export function reducer(state: State, action: Action): State {
  return {
    ...state,
    ...patcher(state, action),
  }
}
