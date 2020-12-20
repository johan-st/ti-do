import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { graphqlHTTP } from 'express-graphql'
import { schema, root } from './repository'
import { loginRoute, mainRoute } from './routes'
import { authenticator } from './bespokeExtras'


const PORT = process.env.PORT || 80
const BUILD_DIR = process.env.BUILD_DIR || '../client/build'

const app = express()
// TODO:  body parser is deprecated
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/test', (_, res) => { res.json({ ...process.env, up: true }) })

// Protected routes 
app.use((req, res, next) => {
  const auth = authenticator(req)
  if (auth.isValid) {
    app.get('/login', mainRoute)
    app.use('/gql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
      context: auth
    }))
  }
  next()
})

app.post('/login', loginRoute)
app.use(express.static(BUILD_DIR))
app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})