type Inc
  = { type: 'Inc' }

export function inc(): Inc {
  return { type: 'Inc' }
}

export type Action
  = Inc
