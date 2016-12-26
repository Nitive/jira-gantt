import { JiraIssue, FieldName } from './issue'

// /api/2/search

export interface JiraSearchBody {
  readonly jql: string,
  readonly fields?: FieldName[],
}

export interface JiraSearchResponse {
  readonly expand: string,
  readonly startAt: number,
  readonly maxResults: number,
  readonly total: number,
  readonly issues: JiraIssue[],
}
