import { basename, dirname, join, resolve } from 'path';
import webpack from 'webpack';
import StaticI18nHtmlPlugin from '../index';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default function processTemplates(...pluginOpts) {
  const compiler = webpack({
    entry: join(__dirname, 'index.js'),
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'html/index.html',
        template: resolve(__dirname, 'templates/index.html'),
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
