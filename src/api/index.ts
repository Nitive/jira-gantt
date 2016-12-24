import xs, { Stream } from 'xstream'
import { RequestInput } from '@cycle/http'

export function project(projectKey: string): Stream<RequestInput> {
  return xs.of({
    url: `/jira/api/2/project/${projectKey}`,
    category: 'project',
  })
}
