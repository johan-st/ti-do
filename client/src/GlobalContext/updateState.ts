export const updateState = (msg: Msg, state: State): State => {
  switch (msg.type) {
    case 'GotLists':
      break

    default:
      throw new Error('UPDATE FUNCTION RECIEVED UNKNOWN MESSEGE')
  }
  return state
}
