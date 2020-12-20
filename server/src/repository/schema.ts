import { buildSchema } from 'graphql'
import { readFileSync } from 'fs'
import * as path from 'path'
const schemaPath = path.resolve('./scheme.ts')
console.log(schemaPath)

export const schema = buildSchema(readFileSync('./src/repository/schema.graphql').toString())
