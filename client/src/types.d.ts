type GlobalContext = {
  state: State,
  actions: Record<string, Cmd>,
  dispatch: (msg: Msg, state: State) => State
}

type State = {
  lists: Item[]
}

type Item = {
  id: string,
  text: string,
  created: Date,
  completed: Date | null
}

type Msg = { type: string, payload: unknown }

type Cmd = (any) => void