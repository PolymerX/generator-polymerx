import test from 'ava';
import pify from 'pify';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import {
  beforeEach,
  after
} from './helpers';

const PATH_APP_GEN = '../../generators/app';

test.beforeEach(beforeEach);
test.after.always(after);

test.serial('generates expected files', async () => {
  const generator = helpers.createGenerator(
    'polymerx:app', [PATH_APP_GEN], null, {
      skipInstall: true
    }
  );

  helpers.mockPrompt(generator, {
    appName: 'test name',
    appDescription: 'some description',
    githubUsername: 'username',
    website: 'some.website'
  });

  await pify(generator.run.bind(generator))();

  assert.file([
    'webpack.config.js',
    'package.json',
    'postcss.config.js',
    'wct.conf.js'
  ]);
});

test.serial('prompts for name, description, username, website, reponame', async () => {
  const generator = helpers.createGenerator(
    'polymerx:app', [PATH_APP_GEN], null, {
      skipInstall: true
    }
  );

  helpers.mockPrompt(generator, {
    appName: 'test-name',
    appDescription: 'foo',
    githubUsername: 'username',
    website: 'some.website'
  });

  await pify(generator.run.bind(generator))();

  assert.fileContent('package.json', /"name": "test-name",/);
  assert.fileContent('package.json', /"description": "foo",/);
  assert.fileContent('package.json', /"repository": "username\/test-name",/);
  // assert.fileContent('README.md', /> foo/);
});
