import { div } from '@cycle/dom'

import { IssueProgress } from '../../../state/essences/issue'

function px(num: number) {
  return `${num / 200}px`
}

export function issueProgressBar(props: IssueProgress) {
  const style = {
    'display': 'inline-block',
  }

  const cellStyle = {
    'display': 'inline-block',
    'height': '20px',
  }

  const originalStyle = {
    'height': '2px',
    'width': px(props.originalEstimate),
    'background-color': 'purple',
  }

  const spendedStyle = {
    ...cellStyle,
    'background-color': 'green',
    'width': px(props.spended),
  }

  const remainingStyle = {
    ...cellStyle,
    'background-color': 'red',
    'width': px(props.remainingEstimate),
  }

  return div({ style }, [
    div({ style: originalStyle }),
    div({ style: spendedStyle }),
    div({ style: remainingStyle }),
  ])
}
