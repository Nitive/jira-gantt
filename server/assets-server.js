/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const webpack = require('webpack')
const config = require('./config')
const dotsReporter = require('webpack-dots-reporter')

// init app
const app = express()


// compile static through webpack middlewares
const webpackConfig = require('../webpack.config')

webpackConfig.entry = [
  'webpack-hot-middleware/client?reload=true',
].concat(webpackConfig.entry)
const compiler = webpack(webpackConfig)

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  reporter: dotsReporter(),
}))
app.use(require('webpack-hot-middleware')(compiler, { log: () => {} }))

app.get('/_/info', (req, res) => {
  res.send(`
    <pre>
      <code>
        <br>${JSON.stringify(config, null, 2)}
      <code>
    </pre>
  `)
})


app.listen(config.assets.port, err => {
  /* eslint-disable no-console */
  if (err) {
    console.error(err)
    return
  }
  console.log('Assets server is started')
  /* eslint-enable no-console */
})
