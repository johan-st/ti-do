import { Request } from 'express'
import { InvalidAuthentication, Authentication, AuthToken, ValidAuthentication } from '../types'

import * as jwt from 'jsonwebtoken'
const secret: jwt.Secret = process.env.JWT_SECRET ?? 'dev-secret'


export const authenticator = (req: Request): Authentication => {

  const token = req.cookies['x-auth-token']
  if (process.env.DEBUG) {
    const validAuth: ValidAuthentication = { isValid: true, userId: 'ffffffff-ffff-ffff-ffff-ffffffffffff' }
    console.log('REQUEST BLINDLY AUTHENTICADED IN DEBUG MODE')
    return validAuth
  }
  if (token) {
    try {
      const verifiedToken = jwt.verify(token, secret)
      if ((verifiedToken as AuthToken).userId) {
        const validAuth: ValidAuthentication = {
          isValid: true, userId: (verifiedToken as AuthToken).userId
        }
        return validAuth
      }
    } catch (error) {
      console.log(error)
      const invalidAuth: InvalidAuthentication = { isValid: false }
      return invalidAuth

    }
  }
  const invalidAuth: InvalidAuthentication = { isValid: false }
  return invalidAuth
}
