// tslint:disable:no-switch-case-fall-through
// see https://github.com/palantir/tslint/issues/1538#issuecomment-253700633

import { State } from '.'
import { Action } from './actions'

import { JiraIssue } from '../api/issue'
import { Issue } from './essences/issue'

function getIssueInfo(issue: JiraIssue): Issue {
  return {
    issueKey: issue.key,
    progress: {
      originalEstimate: issue.fields.timeoriginalestimate,
      remainingEstimate: issue.fields.timeestimate,
      spended: issue.fields.progress.progress,
    },
  }
}

export default function patcher(_: State, action: Action): Partial<State> {
  switch (action.type) {
    case 'GetIssuesForVersionPending': {
      return {
        issues: {
          status: 'fetching',
        },
      }
    }

    case 'GetIssuesForVersionSuccess': {
      return {
        issues: {
          status: 'success',
          data: {
            issues: action.data.issues.map(getIssueInfo),
          },
        },
      }
    }

    case 'GetIssuesForVersionErrored': {
      return {
        issues: {
          status: 'errored',
          error: action.error,
        },
      }
    }
  }
}
