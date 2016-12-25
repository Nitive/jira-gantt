import { Url, NumberAsString, DateAsString, UserFormattedDate, JiraAvatarUrls } from './common'
import { JiraComponent } from './component'
import { JiraIssueField } from './issue'
import { JiraUser } from './user'

// /api/2/project/:project

export interface JiraProjectResponse {
  readonly expand: string,
  readonly self: Url,
  readonly id: NumberAsString,
  readonly key: string,
  readonly description: string,
  readonly lead: JiraUser,
  readonly components: JiraComponent[],
  readonly issueTypes: JiraIssueField.IssueType[],
  readonly assigneeType: string,
  readonly versions: JiraVersion[],
  readonly name: string,
  readonly roles: JiraRoles,
  readonly avatarUrls: JiraAvatarUrls,
  readonly projectTypeKey: string,
}

export interface JiraVersion {
  readonly self: Url,
  readonly id: NumberAsString,
  readonly description: string, // 'Новые карточки'
  readonly name: string, // 'Mobile S12-1'
  readonly archived: boolean,
  readonly released: boolean,
  readonly releaseDate: DateAsString,
  readonly userReleaseDate: UserFormattedDate,
  readonly projectId: number, // 11000
}

export interface JiraRoles {
  readonly 'QA': Url,
  readonly 'atlassian-addons-project-access': Url,
  readonly 'Developers': Url,
  readonly 'Project Managers': Url,
  readonly 'Administrators': Url,
  readonly 'Users': Url,
}
