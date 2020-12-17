import * as dotenv from 'dotenv'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'


import { graphqlHTTP } from 'express-graphql'
import { schema, root } from './repository'
import { loginRoute } from './routes'
import { authenticator } from './bespokeExtras'

dotenv.config()
const PORT = process.env.PORT || 80
const BUILD_DIR = process.env.BUILD_DIR || '../client/build'

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.post('/login', loginRoute)

// Protected routes 
app.use((req, res, next) => {
  const auth = authenticator(req)
  app.use('/gql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }))
})
app.get('/test', (_, res) => { res.json({ ...process.env, up: true }) })
app.use(express.static(BUILD_DIR))


app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})

