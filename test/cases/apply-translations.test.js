import processTemplates from '../cases.setup';
import { join, dirname } from 'path';

describe('apply-localizations', () => {
  beforeAll(() => {
    const baseDir = join(__dirname, '..');
    const options = {
      locale: 'fi',
      locales: ['fi', 'sv', 'en'],
      //baseDir: baseDir,  // not supported
      //outputDir: join(baseDir, 'html/'), // not supported
      outputDefault: '__lng__/__file__', // default: '__file__' : overwrites the normal webpack output files
      outputOther: '__lng__/__file__', // default: '__lng__/__file__'
      localesPath: join(baseDir, 'locales/'),
      files: 'html/*.html',
      outputPrefix: 'html', // removed before processing output files, and added back after
      suppressRaw: true,
    };

    return processTemplates(options);
  });

  it('Localize files', () => {
    expect(true);
  });

});
