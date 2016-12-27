// tslint:disable:no-switch-case-fall-through
// see https://github.com/palantir/tslint/issues/1538#issuecomment-253700633

import { State } from '.'
import { Action } from './actions'

import { JiraIssue } from '../api/issue'
import { JiraUser } from '../api/user'
import { Issue, UserIssues } from './essences/issue'
import { User } from './essences/user'
import * as R from 'ramda'

function getUser(user: JiraUser): User {
  return {
    key: user.key,
    name: user.displayName,
    avatar: user.avatarUrls['48x48'],
  }
}

function getIssueInfo(issue: JiraIssue): Issue {
  return {
    issueKey: issue.key,
    assignee: getUser(issue.fields.assignee),
    progress: {
      originalEstimate: issue.fields.timeoriginalestimate,
      remainingEstimate: issue.fields.timeestimate,
      spended: issue.fields.progress.progress,
    },
  }
}

const getUserIssues = R.pipe(
  R.map(getIssueInfo),
  R.groupBy<Issue>((issue: Issue) => issue.assignee.key),
  R.values,
  R.map((userIssues: Issue[]): UserIssues => {
    return {
      user: userIssues[0].assignee,
      issues: userIssues,
    }
  }),
)

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
            issues: getUserIssues(action.data.issues),
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
