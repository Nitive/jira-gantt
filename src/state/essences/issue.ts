export interface IssueProgress {
  readonly originalEstimate: number,
  readonly spended: number
  readonly remainingEstimate: number,
}

export interface Issue {
  readonly issueKey: string,
  readonly progress: IssueProgress,
}
