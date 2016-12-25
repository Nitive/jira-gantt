import xs, { Stream } from 'xstream'

export type Inc = { type: 'Inc' }
export function inc(): Inc {
  return { type: 'Inc' }
}
export function incAsync(): Stream<Inc> {
  return xs.merge(
    xs.periodic(1000).take(2).mapTo({ type: 'Inc' } as Inc),
    xs.of({ type: 'Inc' } as Inc),
  )
}

export type Action
  = Inc
