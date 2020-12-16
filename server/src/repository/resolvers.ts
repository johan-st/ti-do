
// Sample users
const users = [
  {
    id: '1',
    name: 'Brian',
  },
  {
    id: '2',
    name: 'Kim',
  },
  {
    id: '3',
    name: 'Faith',
  },
  {
    id: '4',
    name: 'Joseph',
  },
  {
    id: '5',
    name: 'Joy',
  }
]

// Return a single user
const getUser = function (args: Record<'id', string>): User {
  const userID = args.id
  return users.filter(user => user.id == userID)[0]
}


// Root resolver
export const root = {
  user: getUser
}