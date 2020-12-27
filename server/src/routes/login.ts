import { Router } from 'express'
import * as sha512 from 'crypto-js/sha512'
import { Request, Response } from 'express'
import { DataWrapper } from '../repository'
import { MockDataWrapper } from '../repository'
const route = Router()

// TODO: login doesn't need access to lists. Which it has in the current implementation
let db: DataWrapper | MockDataWrapper
if (process.env.MOCK_DATA) {
  db = new MockDataWrapper()
} else { db = new DataWrapper() }

const handler = async (req: Request, res: Response) => {
  console.log('login handler')
  const email = req.body.email
  const pw = req.body.password
  const user = await db.userByEmail(email)
  if (sha512(user.hashSalt + pw).toString() === user.passwordHash) {
    res.json({
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      tagline: user.tagline,
      avatar: user.avatar
    })
  }
  res.json({ status: 'invalid login credentials' })
}
route.post('/login', handler)
export { route }