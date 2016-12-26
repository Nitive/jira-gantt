import xs from 'xstream'
import { JiraProjectResponse } from './project'
import { JiraSearchBody, JiraSearchResponse } from './search'

function checkStatus(res: Response): Response {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  throw new Error(res.statusText)
}

function get<ResponseBody>(url: string) {
  const promise = fetch(url)
    .then(checkStatus)
    .then(res => res.json<ResponseBody>())
  return xs.fromPromise(promise)
}

function post<ResponseBody>(url: string, data: Object) {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }
  const promise = fetch(url, params)
    .then(checkStatus)
    .then(res => res.json<ResponseBody>())
    .catch(err => console.log(err))
  return xs.fromPromise(promise)
}

export function getProject(projectKey: string) {
  return get<JiraProjectResponse>(`/jira/api/2/project/${projectKey}`)
}

export function getIssuesForVersion(version: string) {
  const data: JiraSearchBody = {
    jql: `fixVersion = '${version}'`,
    fields: [
      'priority',
      'status',
      'components',
      'creator',
      'reporter',
      'issuetype',
      'description',
      'summary',
    ],
  }

  return post<JiraSearchResponse>('/jira/api/2/search/', data)
}
