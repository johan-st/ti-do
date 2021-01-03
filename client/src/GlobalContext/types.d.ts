type GlobalContext = {
  state: State,
  commands: Record<string, Cmd>,
  updateState: (msg: Msg, state: State) => State
}

type State = {
  lists: List[]
}

type List = Item[]

type Item = {
  text: string
}

type Msg = { type: string, payload: unknown }

type Cmd = (any) => void