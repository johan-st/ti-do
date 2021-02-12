import { UserId } from '.'

export type Authentication = ValidAuthentication | InvalidAuthentication

export type ValidAuthentication =
   {
      isValid: true
      userId: UserId
   }

export type InvalidAuthentication =
   {
      isValid: false
   }