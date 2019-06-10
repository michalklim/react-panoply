const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => ({
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/playground',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Panoply playground',
      hash: true,
      filename: path.join(__dirname, 'playground/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'playground'),
    compress: true,
    hot: true,
    port: 3000,
  },
});
