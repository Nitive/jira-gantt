import { Url, NumberAsString, DateAsString, UserFormattedDate } from './common'

export interface JiraProjectResponse {
  expand: string,
  self: Url,
  id: NumberAsString,
  key: string,
  description: string,
  lead: JiraLead,
  components: JiraComponent[],
  issueTypes: JiraIssueType[],
  assigneeType: string,
  versions: JiraVersion[],
  name: string,
  roles: JiraRoles,
  avatarUrls: JiraAvatarUrls,
  projectTypeKey: string,
}

export interface JiraLead {
  self: Url,
  key: string, // 'markov',
  name: string, // 'markov',
  avatarUrls: JiraAvatarUrls,
  displayName: string, // 'Марков Пётр',
  active: boolean,
}

export interface JiraComponent {
  self: Url,
  id: NumberAsString,
  name: string, // 'addForm',
  isAssigneeTypeValid: boolean,
}

export interface JiraIssueType {
  self: Url,
  id: NumberAsString,
  description: string, // 'A task that needs to be done.'
  iconUrl: Url,
  name: string, // 'Task'
  subtask: boolean,
  avatarId: number, // 10318
}

export interface JiraVersion {
  self: Url,
  id: NumberAsString,
  description: string, // 'Новые карточки'
  name: string, // 'Mobile S12-1'
  archived: boolean,
  released: boolean,
  releaseDate: DateAsString,
  userReleaseDate: UserFormattedDate,
  projectId: number, // 11000
}

export interface JiraRoles {
  'QA': Url,
  'atlassian-addons-project-access': Url,
  'Developers': Url,
  'Project Managers': Url,
  'Administrators': Url,
  'Users': Url,
}

export interface JiraAvatarUrls {
  '16x16': Url,
  '24x24': Url,
  '32x32': Url,
  '48x48': Url,
}
