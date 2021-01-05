
type State = {
  lists: Item[]
}

type Item = {
  id: string,
  text: string,
  created: Date,
  completed?: Date
}

type Action = { type: string, payload: unknown }
