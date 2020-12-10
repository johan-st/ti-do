import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 80
const BUILD_PATH = process.env.BUILD_PATH || '../client/build'


import express from 'express'
const app = express()

app.get('/test', (_, res) => { res.json({ PORT, BUILD_PATH }) })
app.use(express.static(BUILD_PATH))

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})

