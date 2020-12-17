import * as dotenv from 'dotenv'
import * as express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema, root } from './repository'

dotenv.config()
const PORT = process.env.PORT || 80
const BUILD_DIR = process.env.BUILD_DIR || '../client/build'

const app = express()

app.use('/gql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

app.get('/test', (_, res) => { res.json({ ...process.env }) })
app.use(express.static(BUILD_DIR))

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})

