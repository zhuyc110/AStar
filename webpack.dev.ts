import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)?$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};

export default merge(commonConfig, config);
