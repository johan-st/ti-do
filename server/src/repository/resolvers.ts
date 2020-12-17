
// Sample users
const users = [
  {
    id: '6b124930-82eb-49d7-b106-51cdc10ae795',
    name: 'johan',
    hash: '5e2a8e07be7e1b7b5eca28a4af10ee8c0d81233dab0bf2b62c1dc1eb6b528440',
    email: 'johan@styldesign.se'
  }
]
const lists = [
  {
    id: 'bb0d8889-8035-4a9a-9d43-23f77cae3fe5',
    subNodes: null,
    metadata: {
      owner: '6b124930-82eb-49d7-b106-51cdc10ae795',
      readers: null,
      writers: null,
      admins: null

    }
  }
]

// Return a single user
const getUser = (args: { email: string, hash: string }): User | null => {
  const user = users.find(user => user.email === args.email && user.hash === args.hash)
  console.log(user)
  return user ? user : null
}

const getRootNodes = (args: { id: string }): ListNode[] | null => {
  // AUTH HERE? 
  const roots = lists.filter(list => {
    if (list.metadata.owner === args.id) {
      return list
    }
  })
  return roots ? roots : null
}

// Root resolver
export const root = {
  user: getUser,
  rootLists: getRootNodes
}
