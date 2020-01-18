const webpackMerge = require('webpack-merge')
const projectWebpackConfig = require('../webpack.config')

module.exports = ({ config }) => {
  return webpackMerge(projectWebpackConfig(), config)
}
