const path = require('path');
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'web',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'chatbotWidget',
      filename: 'remoteEntry.js',
      exposes: {
        './ChatbotWidget': './src/ChatbotWidget',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    port: 3001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};