const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // for move something from dev to dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimisation = () => {
  const config = {
    splitChunks: { // if you import a librabry in 2 entry files use this option
      chunks: 'all'
    },
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return config;
}
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
}
const babelOptions = option => {
  const options = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
  if (option) {
    options.presets.push(option);
  }
  return options;
}
const jsLoaders = x => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  console.log(loaders);
  return loaders ;
}
const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      // title: "Webpack Course", // if object has key template the title will be ignored
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/favicon.ico'),
    //     to: path.resolve(__dirname, 'dist')
    //   }
    // ])
    new MiniCssExtractPlugin({
      // filename: '[name].[contenthash].css',
      filename: filename('css'),
    })
  ];
  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }
  return base;
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  // entry: './src/index.js',
  entry: {
    // main: './index.js',
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.js'
  },
  devtool: isDev ? 'source-map' : '', // look webpack/docs/devtool
  // this config is for save source file in chrome as .scss .ts in dev mode
  output: {
    // PATTERNS
    // filename: 'bundle.js',
    // [name] is a pattern which takes the key from entry and create files
    // like : main.bundle.js and analytics.bundle.js
    // filename: '[name].bundle.js',
    // filename: '[name].[contenthash].js', // this is for fix cache for your website
    filename: filename('js'), // this is for fix cache for your website
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.ts'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  devServer: {
    port: 4300,
    hot: isDev,
  },
  optimization: optimisation(),
  plugins: plugins(),
  module: {
    rules: [
      { // you should import style.css in index.js
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: [{
        //   loader: MiniCssExtractPlugin.loader,
        //   options: {
        //     hmr: isDev,
        //     reloadAll: true
        //   }
        // },
        //   'css-loader'
        // ],
        use: cssLoaders(),
      },
      { // you should import style.scss in index.js
        test: /\.s[ac]ss$/,
        // use: ['style-loader', 'css-loader'],
        // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: [{
        //   loader: MiniCssExtractPlugin.loader,
        //   options: {
        //     hmr: isDev,
        //     reloadAll: true
        //   }
        // },
        //   'css-loader',
        //   'sass-loader'
        // ],
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpeg|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: 'babel-loader'
        // loader: {
        //   loader: 'babel-loader',
        //   options: babelOptions()
        // },
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        // loader: 'babel-loader'
        // loader: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       '@babel/preset-env',
        //       '@babel/preset-typescript'
        //     ],
        //     plugins: [
        //       '@babel/plugin-proposal-class-properties'
        //     ]
        //   }
        // }
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        },
      }
    ],
  },
}
