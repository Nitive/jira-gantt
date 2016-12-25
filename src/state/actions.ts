import xs, { Stream } from 'xstream'

export type Inc = { type: 'Inc' }
export function inc(): Inc {
  return { type: 'Inc' }
}
export function incAsync(): Stream<Inc> {
  return xs.merge(
    xs.periodic(1000).take(2).mapTo(inc()),
    xs.of(inc()),
  )
}

export type Action
  = Inc
