const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const modeConfig = mode => require(`./webpack.${mode}.js`)(mode)

module.exports = ({ mode } = { mode: 'development' }) => {
  return webpackMerge(
    {
      mode,
      plugins: [new webpack.ProgressPlugin()],
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          },
        ],
      },
      resolve: { extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'] },
    },
    modeConfig(mode),
  )
}
