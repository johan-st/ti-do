import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'

export const schema = buildSchema(readFileSync('./src/repository/schema.graphql').toString())
