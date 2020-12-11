import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 80
const BUILD_DIR = process.env.BUILD_DIR || '../client/build'


import express from 'express'
const app = express()

app.get('/test', (_, res) => { res.json({ ...process.env }) })
app.use(express.static(BUILD_DIR))

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`)
})

