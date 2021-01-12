
export const isMsg = (x: Msg | Cmd): x is Msg => {
  return (x as Msg).type !== undefined && (x as Msg).payload !== undefined }
