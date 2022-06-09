const path = require('path');
const resolve = require('resolve');
// const paths = require('./paths');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { optimize } = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { join } = require('path');
let prodPlugins = [];
var publicUrl = ''

if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin()
  );
}
// console.log(path.resolve(__dirname))

module.exports = {
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'public'),
  //   },
  //   compress: true,
  //   port: process.env.PORT,
  // },
  stats: {
    errorDetails: true,
  },
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    // main: join(__dirname, 'src/index.tsx'),
    // background: path.resolve(__dirname + '/src/chrome/background.ts'),

    // main: path.resolve(__dirname + '/src/index.tsx'),
    // background: path.resolve(__dirname + '/src/chrome/background.ts'),

    main: '/src/index.tsx',
    background: '/src/chrome/background.ts',
  },
  output: {
    // path: path.resolve(__dirname + '/build'),
    path: 'C:/OpenServer/domains/extension/build',
    filename: 'static/js/[name].js',
    publicPath: '/',
    assetModuleFilename: "static/media/[name].[hash][ext]"
  },
  optimization: {
    runtimeChunk: false,
  },
  // optimization: {
  //   runtimeChunk: false,
  //   minimizer: [new OptimizeCSSAssetsPlugin({})],
  // },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // <-- !!ВАЖНО!!
            }
          }

        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: 'asset/inline'
      },
    ],
  },
  plugins:
    [
      new CheckerPlugin(),
      ...prodPlugins,
      new MiniCssExtractPlugin({
        filename: "static/css/main.css",
        chunkFilename: "static/css/[name].chunk.css",
      }),

      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve('public/index.html'),
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: publicUrl,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "public", to: "",
            globOptions: {
              ignore: [
                // Ignore all `txt` files
                "**/index.html",
              ],
            },
          }
        ],
      }),
    ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      fonts: path.resolve(__dirname, 'src/fonts')
    }
  },
};
