import * as dotenv from 'dotenv'
import { graphqlHTTP } from 'express-graphql'
import { schema, root } from './repository'

dotenv.config()
const PORT = process.env.PORT || 80
const BUILD_DIR = process.env.BUILD_DIR || '../client/build'


import * as express from 'express'
const app = express()

// Create an express server and a GraphQL endpoint
app.use('/gql', graphqlHTTP({
  schema: schema,  // Must be provided
  rootValue: root,
  graphiql: true,  // Enable GraphiQL when server endpoint is accessed in browser
}))


app.get('/test', (_, res) => { res.json({ ...process.env }) })
app.use(express.static(BUILD_DIR))

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})

