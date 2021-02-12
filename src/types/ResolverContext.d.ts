import { ValidAuthentication } from '.'
import { DataWrapper } from '../repository'
// import { DataWrapper as MockDataWrapper } from '../repository/mock-db'

export type ResolverContext =
   { auth: ValidAuthentication, db: DataWrapper }