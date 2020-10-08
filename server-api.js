const express = require('express')
const bodyParser = require('body-parser')
const { OAuth2Client } = require('google-auth-library')

const CLIENT_ID = '{CLIENT_ID}'
const host = 'localhost'
const port = 8081

const app = express()
const client = new OAuth2Client(CLIENT_ID)

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  const { idToken } = req.body

  await verify(idToken).catch(console.error)

  res.send('OK')
})

app.listen(port, host, () => {
  console.log('listening at http://%s:%s', host, port)
})

const verify = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  })
  const payload = ticket.getPayload()
  const userid = payload['sub']
  const email = payload['email']
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  console.log(userid)
  console.log(email)
}
