import runWebPackCompiler from '../webpack.setup';
import path from 'path';
import fs from 'fs';

const webpackOutputPath = path.join(__dirname, '../dist/');

const commonOptions = {
  locale     : 'fi',
  locales    : ['fi', 'sv', 'en'],
  localesPath: path.join(__dirname, '..', 'locales/'),
}

const fileExistsSync = (file) => {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

describe('Translate HTML files processed by webpack', () => {
  beforeAll(() => {
  });

  it('Default', async () => {
    const options = {
      ...commonOptions,
      files: '**/*.html',
    };

    await runWebPackCompiler(options)

    const index_fi = fs.readFileSync(path.join(webpackOutputPath, '/index.html'), 'utf8');
    expect(index_fi).not.toContain('<title data-t="head.title"></title>');
    expect(index_fi).toContain('<title>Kauppa</title>');
    expect(index_fi).not.toContain('<title>Dealership</title>');
    expect(index_fi).not.toContain('<title>Butik</title>');
    expect(index_fi).not.toContain('<script src="../bundle.js"></script>');
    expect(index_fi).toContain('<script src="bundle.js"></script>');

    const index_en = fs.readFileSync(path.join(webpackOutputPath, '/en/index.html'), 'utf8');
    expect(index_en).not.toContain('<title data-t="head.title"></title>');
    expect(index_en).not.toContain('<title>Kauppa</title>');
    expect(index_en).toContain('<title>Dealership</title>');
    expect(index_en).not.toContain('<title>Butik</title>');
    expect(index_en).toContain('<script src="../bundle.js"></script>');
    expect(index_en).not.toContain('<script src="bundle.js"></script>');

    const index_sv = fs.readFileSync(path.join(webpackOutputPath, '/sv/index.html'), 'utf8');
    expect(index_sv).not.toContain('<title data-t="head.title"></title>');
    expect(index_sv).not.toContain('<title>Kauppa</title>');
    expect(index_sv).not.toContain('<title>Dealership</title>');
    expect(index_sv).toContain('<title>Butik</title>');
    expect(index_sv).toContain('<script src="../bundle.js"></script>');
    expect(index_sv).not.toContain('<script src="bundle.js"></script>');

  });

  it('Each language in separate sub-folder', async () => {
    const options = {
      ...commonOptions,
      files: '**/*.html',
      outputDefault: '__lng__/__file__',
      outputOther: '__lng__/__file__',
    };

    await runWebPackCompiler(options)

    const index_raw = fs.readFileSync(path.join(webpackOutputPath, '/index.html'), 'utf8');
    expect(index_raw).toContain('<title data-t="head.title"></title>');
    expect(index_raw).not.toContain('<title>Kauppa</title>');
    expect(index_raw).not.toContain('<title>Dealership</title>');
    expect(index_raw).not.toContain('<title>Butik</title>');
    expect(index_raw).not.toContain('<script src="../bundle.js"></script>');
    expect(index_raw).toContain('<script src="bundle.js"></script>');

    const index_fi = fs.readFileSync(path.join(webpackOutputPath, '/fi/index.html'), 'utf8');
    expect(index_fi).not.toContain('<title data-t="head.title"></title>');
    expect(index_fi).toContain('<title>Kauppa</title>');
    expect(index_fi).not.toContain('<title>Dealership</title>');
    expect(index_fi).not.toContain('<title>Butik</title>');
    expect(index_fi).toContain('<script src="../bundle.js"></script>');
    expect(index_fi).not.toContain('<script src="bundle.js"></script>');

    const index_en = fs.readFileSync(path.join(webpackOutputPath, '/en/index.html'), 'utf8');
    expect(index_en).not.toContain('<title data-t="head.title"></title>');
    expect(index_en).not.toContain('<title>Kauppa</title>');
    expect(index_en).toContain('<title>Dealership</title>');
    expect(index_en).not.toContain('<title>Butik</title>');
    expect(index_en).toContain('<script src="../bundle.js"></script>');
    expect(index_en).not.toContain('<script src="bundle.js"></script>');

    const index_sv = fs.readFileSync(path.join(webpackOutputPath, '/sv/index.html'), 'utf8');
    expect(index_sv).not.toContain('<title data-t="head.title"></title>');
    expect(index_sv).not.toContain('<title>Kauppa</title>');
    expect(index_sv).not.toContain('<title>Dealership</title>');
    expect(index_sv).toContain('<title>Butik</title>');
    expect(index_sv).toContain('<script src="../bundle.js"></script>');
    expect(index_sv).not.toContain('<script src="bundle.js"></script>');

  });

  it('Each language in separate sub-folder, suppress raw file', async () => {
    const options = {
      ...commonOptions,
      files: '**/*.html',
      outputDefault: '__lng__/__file__',
      outputOther: '__lng__/__file__',
      suppressRaw: true,
    };

    await runWebPackCompiler(options)

    expect(fileExistsSync(path.join(webpackOutputPath, '/index.html'))).toEqual(false);

    const index_fi = fs.readFileSync(path.join(webpackOutputPath, '/fi/index.html'), 'utf8');
    expect(index_fi).not.toContain('<title data-t="head.title"></title>');
    expect(index_fi).toContain('<title>Kauppa</title>');
    expect(index_fi).not.toContain('<title>Dealership</title>');
    expect(index_fi).not.toContain('<title>Butik</title>');
    expect(index_fi).toContain('<script src="../bundle.js"></script>');
    expect(index_fi).not.toContain('<script src="bundle.js"></script>');

    const index_en = fs.readFileSync(path.join(webpackOutputPath, '/en/index.html'), 'utf8');
    expect(index_en).not.toContain('<title data-t="head.title"></title>');
    expect(index_en).not.toContain('<title>Kauppa</title>');
    expect(index_en).toContain('<title>Dealership</title>');
    expect(index_en).not.toContain('<title>Butik</title>');
    expect(index_en).toContain('<script src="../bundle.js"></script>');
    expect(index_en).not.toContain('<script src="bundle.js"></script>');

    const index_sv = fs.readFileSync(path.join(webpackOutputPath, '/sv/index.html'), 'utf8');
    expect(index_sv).not.toContain('<title data-t="head.title"></title>');
    expect(index_sv).not.toContain('<title>Kauppa</title>');
    expect(index_sv).not.toContain('<title>Dealership</title>');
    expect(index_sv).toContain('<title>Butik</title>');
    expect(index_sv).toContain('<script src="../bundle.js"></script>');
    expect(index_sv).not.toContain('<script src="bundle.js"></script>');

  });

});
