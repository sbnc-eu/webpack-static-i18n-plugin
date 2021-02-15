import path from 'path';
import webpack from 'webpack';
import StaticI18nHtmlPlugin from '../index';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default function runWebPackCompiler(...pluginOpts) {
  const compiler = webpack({
    entry: path.join(__dirname, 'index.js'),
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!.gitkeep'],
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'templates/index.html'),
      }),
      new StaticI18nHtmlPlugin(...pluginOpts),
    ],
  });

  return new Promise((resolve, reject) => {
    compiler.run((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
