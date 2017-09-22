import test from 'ava';
import pify from 'pify';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import {beforeEach, after} from './helpers';

const PATH_APP_GEN = '../../generators/app';

test.beforeEach(beforeEach);
test.after.always(after);

test.serial('generates expected files', async () => {
  const generator = helpers.createGenerator(
    'polymerx:app', [PATH_APP_GEN], null, {skipInstall: true}
  );

  helpers.mockPrompt(generator, {
    appName: 'test name',
    appDescription: 'some description',
    githubUsername: 'username',
    website: 'some.website',
    nyc: true,
    codecov: true
  });

  await pify(generator.run.bind(generator))();

  assert.file([
    'webpack.config.js'
  ]);
});
