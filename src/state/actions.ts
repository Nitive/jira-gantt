import xs from 'xstream'

import { JiraApi } from '../api'
import { JiraSearchResponse } from '../api/search'


interface GetIssuesForVersionPending {
  type: 'GetIssuesForVersionPending',
}

interface GetIssuesForVersionSuccess {
  type: 'GetIssuesForVersionSuccess',
  data: JiraSearchResponse,
}

interface GetIssuesForVersionErrored {
  type: 'GetIssuesForVersionErrored',
  error: any,
}

type GetIssuesForVersion = GetIssuesForVersionPending | GetIssuesForVersionSuccess | GetIssuesForVersionErrored

export interface Context {
  api: JiraApi,
}

export function getIssuesForVersion(version: string) {
  return ({ api }: Context) => xs.merge(
    xs.of<GetIssuesForVersionPending>({ type: 'GetIssuesForVersionPending' }),
    api
      .getIssuesForVersion(version)
      .map<GetIssuesForVersion>(data => ({ type: 'GetIssuesForVersionSuccess', data }))
      .replaceError(error => (
         xs.of<GetIssuesForVersion>({ type: 'GetIssuesForVersionErrored', error })
      )),
  )
}


export type Action
  = GetIssuesForVersion
