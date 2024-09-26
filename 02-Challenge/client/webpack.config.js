const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin'); // Only using InjectManifest
const path = require('path');

module.exports = () => {
  return {
    mode: 'development', // Use 'production' for deployment
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Clean the dist folder before each build
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Ensure this points to your source index.html
        title: 'Just Another Text Editor',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor that works offline',
        background_color: '#000000',
        theme_color: '#b8860b',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),

      // Manually injecting the manifest into your custom service worker
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your custom service worker file
        swDest: 'service-worker.js', // Destination for service worker in the 'dist' folder
      }),
    ],
    
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
