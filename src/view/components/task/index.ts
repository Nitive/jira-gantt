import { div } from '@cycle/dom'
import { taskLabel } from './label'

const style = {
  'margin-bottom': '10px',
}

export function taskRow(taskKey: string) {
  return div({ style }, [
    taskLabel(taskKey),
  ])
}
