import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common';

const config: webpack.Configuration = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss|css)?$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'style.css' })],
};

export default merge(commonConfig, config);
