import { UserId } from './'

export type AuthToken =
   {
      userId: UserId,
      exp: number
   }