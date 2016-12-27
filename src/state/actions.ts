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
function getIssuesForVersionSuccess(data: JiraSearchResponse): GetIssuesForVersionSuccess {
  return { type: 'GetIssuesForVersionSuccess', data }
}
interface GetIssuesForVersionErrored {
  type: 'GetIssuesForVersionErrored',
  error: any,
}
function getIssuesForVersionErrored(error: any) {
  const action: GetIssuesForVersionErrored = { type: 'GetIssuesForVersionErrored', error }
  return xs.of(action)
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
      .map<GetIssuesForVersion>(getIssuesForVersionSuccess)
      .replaceError(getIssuesForVersionErrored),
  )
}

export type Action
  = GetIssuesForVersion
