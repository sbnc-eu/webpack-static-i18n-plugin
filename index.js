'use strict';

const staticI18n = require('static-i18n');
const minimatch = require('minimatch');
const path = require('path');
const { RawSource } = require('webpack-sources');

class StaticI18nHtmlPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('WebpackStaticI18NPlugin', async (compilation, callback, stats) => {

      let globPattern = this.options.files;

      let assetsToTranslate = minimatch.match(Object.keys(compilation.assets), globPattern)

      for (let i in assetsToTranslate ) {
        let filename = assetsToTranslate[i];
        let translatedSources = await staticI18n.process( compilation.assets[filename].source(), this.options );

        if ( this.options.suppressRaw ) {
          delete compilation.assets[filename];
        }

        for (let locale in translatedSources) {
          let filenameNew = this.getTranslatedFileName(filename, locale );
          compilation.assets[filenameNew] = new RawSource(translatedSources[locale]);
        }
      }
      callback();
    });
  }

  getTranslatedFileName( file, locale ) {
    let output = '';
    if ( this.options.outputPrefix ) {
      file = path.relative(this.options.outputPrefix, file);
    }
    if ( locale === this.options.locale ) {
      output = this.options.outputDefault || '__file__'
    }
    else {
      output = this.options.outputOther || '__lng__/__file__'
    }
    let outputFile = output
      .replace('__lng__', locale)
      .replace('__file__', file)
      .replace('__basename__', path.basename(file, path.extname(file)));

    if ( this.options.outputPrefix ) {
      outputFile = path.join( this.options.outputPrefix + '/', outputFile );
    }
    return outputFile;
  }
}

module.exports = StaticI18nHtmlPlugin;
