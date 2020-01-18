const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = () => ({
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
})
