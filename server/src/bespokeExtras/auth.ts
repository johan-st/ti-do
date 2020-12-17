import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
const secret = process.env.JWT_SECRET ?? 'dev-secret'

export const authenticator = (req: Request): AuthStatus => {

  console.log(req.headers)
  const token = req.cookies['x-auth-token']
  const authStatus: AuthStatus = { isValid: false }
  if (token) {
    try {
      const verifiedToken: unknown = jwt.verify(token, secret)
      authStatus.userId = verifiedToken ? verifiedToken.userId || undefined : undefined
    } catch (error) {
      console.log(error)

    }
  }
  console.log('token')
  return authStatus
}