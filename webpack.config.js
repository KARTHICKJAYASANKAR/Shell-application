const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: process.env.NODE_ENV || 'development', // Use 'development' as default but allow production mode
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback: true, // This simplifies handling of history API in dev mode
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure files are served correctly
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "MicroFrontend",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button"
      }
    })
  ]
};
