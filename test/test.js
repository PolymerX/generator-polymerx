import test from 'ava';
import pify from 'pify';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import {beforeEach, after} from './helpers';

test.beforeEach(beforeEach);
test.after.always(after);

test.serial('generates expected files', async () => {
  const generator = helpers.createGenerator(
    'polymerx:element', ['../../element'], null, {skipInstall: true}
  );
  helpers.mockPrompt(generator, {
    elementName: 'test-element'
  });

  await pify(generator.run.bind(generator))();

  assert.file([
    'test-element/index.js',
    'test-element/template.html',
    'test-element/style.postcss'
  ]);
});

test.serial('Correct PascalCaseName on class', async () => {
  const generator = helpers.createGenerator(
    'polymerx:element', ['../../element'], null, {skipInstall: true}
  );

  helpers.mockPrompt(generator, {
    elementName: 'test-element'
  });
  await pify(generator.run.bind(generator))();
  assert.fileContent('test-element/index.js', /class TestElement/);
});

test.serial('polymerx:app not implemented yet', async () => {
  const generator = helpers.createGenerator(
    'polymerx:app', ['../../app'], null, {skipInstall: true}
  );

  helpers.mockPrompt(generator);
  await pify(generator.run.bind(generator))();
  assert.noFile([
    'test-element/index.js',
    'test-element/template.html',
    'test-element/style.postcss'
  ]);
});
