import { Url, JiraAvatarUrls } from './common'

export interface JiraUser {
  readonly self: Url,
  readonly name: string,
  readonly key: string,
  readonly avatarUrls: JiraAvatarUrls,
  readonly displayName: string,
  readonly active: boolean,
  readonly emailAddress?: string,
  readonly timeZone?: string,
}
