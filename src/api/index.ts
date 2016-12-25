import xs from 'xstream'
import { JiraProjectResponse } from './project'

export function project(projectKey: string) {
  const promise = fetch(`/jira/api/2/project/${projectKey}`)
    .then(res => res.json<JiraProjectResponse>())
  return xs.fromPromise(promise)
}
