var webpack = require('webpack')
var path = require('path');
var autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://127.0.0.1:8081',
    './src/client/index.js',
    
  ],
  output: {
    publicPath: 'http://127.0.0.1:8081/dist/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["es2015", "stage-0", "react"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
       test: /\.scss$/,
       use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']

      },
      {
       test: /\.(png|jpg|jpeg|gif|woff)$/,
       use: {
         loader: 'url-loader',
         options: {
           limit: 10000
         }
       }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        "process.env": {
            BROWSER: JSON.stringify(true)
        }
    })
  ],
  devServer: {
    hot: true,
    inline: false,
    historyApiFallback: true
  }
};