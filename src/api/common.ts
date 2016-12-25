export type Url = string
export type NumberAsString = string
export type DateAsString = string // '2016-12-20'
export type UserFormattedDate = string // '20.12.2016'
export type Color = string

export interface JiraAvatarUrls {
  readonly '16x16': Url,
  readonly '24x24': Url,
  readonly '32x32': Url,
  readonly '48x48': Url,
}
