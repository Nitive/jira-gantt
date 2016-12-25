import { Url, NumberAsString, Color } from './common'
import { JiraComponent } from './component'
import { JiraUser } from './user'

export type FieldName
  = 'priority'
  | 'status'
  | 'components'
  | 'creator'
  | 'reporter'
  | 'issuetype'
  | 'description'
  | 'summary'

export interface JiraIssue {
  readonly expand: string,
  readonly id: NumberAsString,
  readonly self: Url,
  readonly key: string,
  readonly fields: JiraIssueFields,
}

export interface JiraIssueFields {
  readonly summary: string,
  readonly issuetype: JiraIssueField.IssueType,
  readonly components: JiraComponent[],
  readonly creator: JiraUser,
  readonly description: string,
  readonly reporter: JiraUser,
  readonly priority: JiraIssueField.Priority,
  readonly status: JiraIssueField.Status,
}

export namespace JiraIssueField {
  export type IssueTypeName = 'Bug' | 'Feature'
  export interface IssueType {
    readonly self: Url,
    readonly id: NumberAsString,
    readonly description: string,
    readonly iconUrl: Url,
    readonly name: IssueTypeName,
    readonly subtask: boolean,
    readonly avatarId: number,
  }

  export type PriorityName = 'Critical' | 'Blocker' | 'Major' | 'Normal' | 'Minor'
  export interface Priority {
    readonly self: Url,
    readonly iconUrl: Url,
    readonly name: PriorityName,
    readonly id: NumberAsString,
  }

  export type StatusName
    = 'Open'
    | 'Reopen'
    | 'Suspended'
    | 'In Progress'
    | 'In Review'
    | 'Ready for Deploy'
    | 'Ready for Test'
    | 'Testing'
    | 'Test - OK'
    | 'Ready For CIAN'
    | 'CIAN - OK'

  export interface StatusCategory {
    readonly self: Url,
    readonly id: NumberAsString,
    readonly key: string,
    readonly colorName: Color,
    readonly name: StatusName,
  }

  export interface Status {
    readonly self: Url,
    readonly description: string,
    readonly iconUrl: Url,
    readonly name: StatusName,
    readonly id: NumberAsString,
    readonly statusCategory: StatusCategory,
  }
}
