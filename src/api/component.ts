import { Url, NumberAsString } from './common'

export interface JiraComponent {
  readonly self: Url,
  readonly id: NumberAsString,
  readonly name: string,
  readonly isAssigneeTypeValid?: boolean,
}
