import path from 'path';
import fs from 'fs-extra';
import pify from 'pify';
import helpers from 'yeoman-test';

async function beforeEach() {
  await pify(helpers.testDirectory)(path.join(__dirname, '../temp'));
}

async function after() {
  await fs.remove(path.join(__dirname, '../temp'));
}

export {beforeEach, after};
