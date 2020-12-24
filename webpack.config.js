const path = require('path');
const dotenv = require('dotenv');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const webpackConfig = {
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
    ],
};

module.exports = webpackConfig;

module.exports = {

  entry: './src/index.js',
 output: {
   path: path.resolve(__dirname, './dist'),
   filename: 'index_bundle.js'
 },





  devServer: {
contentBase: require('path').join(__dirname, 'dist'),
compress: true,
port: 8080
},

devtool: 'inline-source-map',



module: {
rules: [{
  test: /\.(woff|woff2|eot|ttf|otf|svg|jpg)$/,
  use: {
          loader: 'url-loader',
          options: {
            limit: 100000,


          }
        }
}]
},

module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
      test: /\.(woff|woff2|eot|ttf|otf|svg|jpe?g|png)$/i,
      loader: 'file-loader',
    }
    ]
  },

plugins: [
    // ...
    new webpack.DefinePlugin({
       'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
    }),
    new HtmlWebpackPlugin(),

    new webpack.ProvidePlugin({
               $: "jquery",
               jQuery: "jquery",
               "window.jQuery": "jquery"

           }),
    // ...
  ]


};
