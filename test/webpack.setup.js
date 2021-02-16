import path from 'path';
import webpack from 'webpack';
import WebpackStaticI18NPlugin from '../index';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default function runWebPackCompiler(...pluginOpts) {
  const compiler = webpack({
    entry: path.resolve(__dirname, 'index.js'),
    output: {
      // path should match `webpackOutputPath` in test/cases/apply-translations.test.js
      path: path.resolve(__dirname, 'dist'),
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
      new WebpackStaticI18NPlugin(...pluginOpts),
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
