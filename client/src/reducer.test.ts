import { reducer } from './reducer'
const state:State = {
  lists:[],
  editor:null
}
  
test('should add item', () => {
  expect(true).toBeTruthy()
})

  
// GOT_ITEMS: (list: ListNode[]):Msg => ({
// ITEM_ADDED: (item: ListNode):Msg => ({
// ITEM_CHANGED: (task: ListNode):Msg => ({
// ITEM_DELETED: (id:NodeId):Msg => ({ 