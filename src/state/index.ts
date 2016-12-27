import { UserIssues } from './essences/issue'


interface IssuesFetching {
  readonly status: 'fetching',
}

interface IssuesFetched {
  readonly status: 'success',
  readonly data: {
    readonly issues: UserIssues[],
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
