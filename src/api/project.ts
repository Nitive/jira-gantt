import { Url, NumberAsString, DateAsString, UserFormattedDate } from './common'

export interface JiraProjectResponse {
  readonly expand: string,
  readonly self: Url,
  readonly id: NumberAsString,
  readonly key: string,
  readonly description: string,
  readonly lead: JiraLead,
  readonly components: JiraComponent[],
  readonly issueTypes: JiraIssueType[],
  readonly assigneeType: string,
  readonly versions: JiraVersion[],
  readonly name: string,
  readonly roles: JiraRoles,
  readonly avatarUrls: JiraAvatarUrls,
  readonly projectTypeKey: string,
}

export interface JiraLead {
  readonly self: Url,
  readonly key: string, // 'markov',
  readonly name: string, // 'markov',
  readonly avatarUrls: JiraAvatarUrls,
  readonly displayName: string, // 'Марков Пётр',
  readonly active: boolean,
}

export interface JiraComponent {
  readonly self: Url,
  readonly id: NumberAsString,
  readonly name: string, // 'addForm',
  readonly isAssigneeTypeValid: boolean,
}

export interface JiraIssueType {
  readonly self: Url,
  readonly id: NumberAsString,
  readonly description: string, // 'A task that needs to be done.'
  readonly iconUrl: Url,
  readonly name: string, // 'Task'
  readonly subtask: boolean,
  readonly avatarId: number, // 10318
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

export interface JiraAvatarUrls {
  readonly '16x16': Url,
  readonly '24x24': Url,
  readonly '32x32': Url,
  readonly '48x48': Url,
}
