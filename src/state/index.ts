import { Issue } from './essences/issue'

interface IssuesFetching {
  readonly status: 'fetching',
}
interface IssuesFetched {
  readonly status: 'success',
  readonly data: {
    readonly issues: Issue[],
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
