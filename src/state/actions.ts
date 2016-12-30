import xs from 'xstream'

import { ActionContext } from '.'
import { JiraSearchResponse } from '../api/search'


export type Action
  = { type: 'GetIssuesForVersionPending' }
  | { type: 'GetIssuesForVersionSuccess', data: JiraSearchResponse }
  | { type: 'GetIssuesForVersionErrored', error: any }

export function getIssuesForVersion(version: string, auth: string) {
  return ({ api }: ActionContext) => xs.merge(
    xs.of<Action>({ type: 'GetIssuesForVersionPending' }),
    api.getIssuesForVersion(version, auth)
      .map<Action>(data => ({ type: 'GetIssuesForVersionSuccess', data }))
      .replaceError(error => xs.of<Action>({ type: 'GetIssuesForVersionErrored', error })),
  )
}
