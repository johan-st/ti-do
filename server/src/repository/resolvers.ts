import { User, ListNode } from '../types'
// Sample users
const users = [
  {
    userId: 'dc79214a-25f5-441c-a527-02a2ba38c4f4',
    fullName: 'Johan Strand',
    email: 'johan@styldesign.se',
    passwordHash: '72d0585274e2780a551e154eef8217121cf3b35ef2bd65efc9695580fdc51695576ba38f5846d039fbfa97994e0f56b048466d073e52a3c169fee63844e0c00d',
    hashType: 'SHA512',
    hashSalt: 'rYFmMHFM3oCWMETL',
    tagline: 'first man on the baloon',
    avatar: 'https://avatars.dicebear.com/4.1/api/avataaars/jayMan.svg'
  }
]
const lists = [
  {
    id: 'bb0d8889-8035-4a9a-9d43-23f77cae3fe5',
    subNodes: null,
    metadata: {
      owner: 'dc79214a-25f5-441c-a527-02a2ba38c4f4',
      readers: null,
      writers: null,
      admins: null

    }
  }
]

// Return a single user
const getUser = (args: { email?: string, userId?: string }): User | null => {
  if (args.userId) {
    // TODO can this be made neater?
    const user = users.find(user => {
      return user.userId === args.userId
    })
    return user ? user : null
  }
  if (args.email) {
    const user = users.find(user => user.email === args.email)
    return user ? user : null
  }
  return null
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
  userByEmail: getUser,
  rootNodes: getRootNodes
}
