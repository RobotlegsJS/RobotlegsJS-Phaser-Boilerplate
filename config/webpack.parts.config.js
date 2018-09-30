const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
})

exports.cleanup = paths => ({
  plugins: [
    new CleanWebpackPlugin(paths, { root: process.cwd(), verbose: false }),
  ],
})

exports.loadJs = ({ options }) => ({
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: ['/node_modules/', '/lib/'],
        use: [
          {
            loader: 'ts-loader',
            options: options,
          },
        ],
      },

      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
    ],
  },
})

exports.sourceMaps = method => ({
  devtool: method,
})

exports.envVar = env => ({
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env),
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
})

exports.analyze = () => ({
  plugins: [new BundleAnalyzerPlugin()],
})

exports.injectVersion = version => ({
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(version),
    }),
  ],
})
