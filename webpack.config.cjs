const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();
const autoprefixer = require('autoprefixer');
const ESLintPlugin = require('eslint-webpack-plugin');

const entryFileName = 'index.tsx';
const outputFileName = 'bundle.js';
const sourceDirectoryName = 'src';
const outputDirectoryName = 'dist';
const mode = 'development';

const { PORT: port } = process.env;

const typescriptRule = {
  loader: 'ts-loader',
  test: /\.tsx?$/,
  exclude: /node_modules/,
};

const cssRule = {
  test: /\.(sass|less|css)$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
};

const eslintOptions = {
  fix: false,
};

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, sourceDirectoryName, entryFileName),
    output: {
      path: path.resolve(__dirname, outputDirectoryName),
      filename: outputFileName,
      publicPath: '/',
    },
    mode,
    module: {
      rules: [typescriptRule, cssRule],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
      open: true,
      port,
      client: {
        progress: true,
      },
      static: {
        directory: path.resolve(__dirname, outputDirectoryName),
      },
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      autoprefixer,
      new ESLintPlugin(eslintOptions),
    ],
  };
};
