const path = require('path')
const express = require('express')
const proxy = require('http-proxy-middleware')

const config = require('./config')

const app = express()

app.set('x-powered-by', false)

// jira api docs https://docs.atlassian.com/jira/REST/cloud/
app.use('/jira', proxy({
  target: 'https://cianru.atlassian.net/',
  pathRewrite: { '^/jira': '/rest' },
  headers: { 'User-Agent': 'Node.js' },
  changeOrigin: true,
}))


// assets server for development
if (config.isDev) {
  app.use('/__webpack_hmr', proxy({
    target: config.assets.baseUrl,
    changeOrigin: true,
  }))

  app.use('/', proxy({
    target: config.assets.fullUrl,
    changeOrigin: true,
  }))
}

// serve static for production
if (config.isProd) {
  const distPath = path.join(__dirname, '../dist')
  app.use(`/${config.assets.pathname}`, express.static(distPath))
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: distPath })
  })
}


app.get('/_/info', (req, res) => {
  res.send(`
    <pre>
      <code>
        <br>${JSON.stringify(config, null, 2)}
      <code>
    </pre>
  `)
})


app.listen(config.app.port, err => {
  /* eslint-disable no-console */
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening http://localhost:${config.app.port}`)
  /* eslint-enable no-console */
})
