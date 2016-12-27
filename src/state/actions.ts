import xs, { Stream } from 'xstream'

import * as api from '../api'
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

export function getIssuesForVersion(version: string): Stream<GetIssuesForVersion> {
  const pending: GetIssuesForVersionPending = {
    type: 'GetIssuesForVersionPending',
  }
  return xs.merge(
    xs.of(pending),
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
