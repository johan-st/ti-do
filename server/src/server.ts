import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import cors = require('cors')
import { graphqlHTTP } from 'express-graphql'
import { schema, root } from './repository'
import { loginRoute, mainRoute } from './routes'
import { authenticator } from './bespokeExtras'
import { DataWrapper, MockDataWrapper } from './repository'


const PORT = process.env.PORT || 80
const BUILD_DIR = process.env.BUILD_DIR || '../client/build'

let db: DataWrapper
if (process.env.MOCK_DATA) {
  console.log('USING MOCK DB')
  db = new MockDataWrapper()
} else {
  console.log('USING PROD DB')
  db = new DataWrapper()
}
db.connect()
process.on('beforeExit', () => { db.close() })

const app = express()
// TODO: be more selecvtive when handling cors
// TODO: typechecking for cors module
app.use(cors() as express.RequestHandler)
// TODO:  body parser is deprecated
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/test', (req, res) => { res.json(req) })
app.post('/test', (req, res) => { res.json(req.body) })

// Protected routes 
app.use((req, res, next) => {
  const auth = authenticator(req)
  if (auth.isValid) {
    console.log(auth)
    app.get('/login', mainRoute)
    app.use('/gql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
      context: { auth, db }
    }))
  }
  next()
})

app.post('/login', loginRoute)
app.use(express.static(BUILD_DIR))
app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})