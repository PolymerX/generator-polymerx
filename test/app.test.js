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
    appName: 'test-name',
    appDescription: 'foo',
    githubUsername: 'username',
    website: 'some.website'
  });

  await pify(generator.run.bind(generator))();

  assert.file([
    'webpack.config.js',
    'package.json',
    'postcss.config.js',
    'wct.conf.js',
    'webpack-module-build.config.js',
    'README.md',
    'LICENSE.md',
    '.stylelintrc.json',
    '.npmrc',
    '.yarnrc',
    '.editorconfig',
    '.gitignore',
    '.travis.yml',
    'src/index.html',
    'src/index.js',
    'src/manifest.json',
    'src/assets/',
    'src/global-style',
    'src/components/containers/test-name/index.js',
    'src/components/containers/test-name/template.html',
    'src/components/containers/test-name/style.postcss',
    'src/components/dumbs/sk-menu',
    'src/components/dumbs/sk-menu-item'
  ]);

  assert.noFile(['src/components/containers/sk-app']);
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
});

test.serial('check content inside src', async () => {
  const generator = helpers.createGenerator(
    'polymerx:app', [PATH_APP_GEN], null, {
      skipInstall: true
    }
  );

  helpers.mockPrompt(generator, {
    appName: 'awesome-app',
    appDescription: 'foo',
    githubUsername: 'username',
    website: 'some.website'
  });

  await pify(generator.run.bind(generator))();

  assert.fileContent(
    'src/components/containers/awesome-app/index.js',
    /AwesomeApp extends PolymerElement/
  );
  assert.fileContent(
    'src/components/containers/awesome-app/index.js',
    /('awesome-app', AwesomeApp)/
  );
  assert.fileContent(
    'src/index.html',
    /<awesome-app unresolved name="awesome-app">/
  );
  assert.fileContent(
    'src/index.html',
    /<\/awesome-app>/
  );
});
