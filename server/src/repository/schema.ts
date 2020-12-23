import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'
import * as path from 'path'

export const schema = buildSchema(readFileSync('./src/repository/schema.graphql').toString())
