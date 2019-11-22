const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 9000;

module.exports = (env) => {
  return {
    mode: env,
    devtool: env === 'development' ? 'cheap-module-source-map' : 'source-map',
    entry: {
      portal: './src/portal.js'
    },
    output: {
      publicPath: env === 'development' ? 'http://localhost:' + PORT + '/' : '',
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash:8].js',
      path: path.resolve(__dirname, './release')
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    resolve: {
      modules: [__dirname, 'node_modules']
    },
    plugins: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        },
        canPrint: true
      }),
      new webpack.DefinePlugin({
        __DEV__: true,
        STATIC_URL: JSON.stringify(
          'https://e-static.oss-cn-shanghai.aliyuncs.com'
        ),
        _URL_: JSON.stringify('http://api.qiyizhuan.com.cn/backend'), //api.mizhuanba.com
        TOKEN_KEY: JSON.stringify('token_key')
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.ejs'),
        templateParameters: {
          title: 'test'
        }
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    ],
    externals: [],
    devServer: {
      port: PORT,
      contentBase: './release',
      historyApiFallback: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
};
