const { join } = require('path')
const express = require('express')
const app = express()

app.use(express.static(join(__dirname, 'docs')))

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log('listening at http://%s:%s', host, port)
})
