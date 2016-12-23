const express = require('express')
const proxy = require('http-proxy-middleware')

const config = require('./config')

const app = express()

app.use('/__webpack_hmr', proxy({
  target: config.assets.baseUrl,
  changeOrigin: true,
}))

app.use('/', proxy({
  target: config.assets.fullUrl,
  changeOrigin: true,
}))

app.listen(config.app.port, err => {
  /* eslint-disable no-console */
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening http://localhost:${config.app.port}`)
  /* eslint-enable no-console */
})
