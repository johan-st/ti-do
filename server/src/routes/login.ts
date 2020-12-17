import { Router } from 'express'
import * as sha512 from 'crypto-js/sha512'
import fetch from 'node-fetch'
import { Request, Response } from 'express'
const route = Router()


const loginHandler = (req: Request, res: Response) => {
  const email = req.body.email
  const pw = req.body.password
  const query = `
  query userByEmail ($email: String!) {
    userByEmail(email:$email) {
      userId
      fullName
      email
      passwordHash
      hashSalt
      tagline
      avatar
    }
  }`
  fetch('http://localhost:3001/gql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { email },
    })
  })
    .then(r => r.json())
    .then(r => {
      const user = r.data.userByEmail
      if (sha512(user.hashSalt + pw).toString() === user.passwordHash) {
        res.json({
          userId: user.userId,
          fullName: user.fullName,
          email: user.email,
          tagline: user.tagline,
          avatar: user.avatar
        })
      }
    })
    .catch(e => console.log(e))
}
route.post('/login', loginHandler)
export { route }