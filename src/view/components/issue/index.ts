import { div } from '@cycle/dom'

import { Issue } from '../../../state/essences/issue'
import { issueLabel } from './label'
import { issueProgressBar } from './progress-bar'

const style = {
  'margin-bottom': '10px',
}

export function issueRow(props: Issue) {
  return div({ style }, [
    issueLabel(props.issueKey),
    issueProgressBar(props.progress),
  ])
}
