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

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GetIssuesForVersionPending': {
      return {
        ...state,
        issues: {
          status: 'fetching',
        },
      }
    }

    case 'GetIssuesForVersionSuccess': {
      return {
        ...state,
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
        ...state,
        issues: {
          status: 'errored',
          error: action.error,
        },
      }
    }
  }
}
