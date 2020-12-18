import { Request } from 'express'
import { AuthStatus, AuthToken } from '../types'

import * as jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET ?? 'dev-secret'


export const authenticator = (req: Request): AuthStatus => {

  const token = req.cookies['x-auth-token']
  const authStatus: AuthStatus = { isValid: false }
  if (process.env.DEBUG) {
    authStatus.isValid = true
    console.log('AUTHENTICATOR IN DEBUG MODE')

  } else if (token) {
    try {
      const verifiedToken = jwt.verify(token, secret)
      if ((verifiedToken as AuthToken).userId) {
        authStatus.userId = (verifiedToken as AuthToken).userId
      }
    } catch (error) {
      console.log(error)

    }
  }
  console.log(authStatus)

  return authStatus
}