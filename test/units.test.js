import test from 'ava';

import validations from './../generators/__utils/validations';

const dashNameMsg = 'You have to provide a name with a dash ("-")';

test('validation for "dashName" ("elementWithoutDash")', t => {
  const actual = validations.dashName('elementWithoutDash');
  t.is(dashNameMsg, actual, 'Should return the error message');
});

test('validation for "dashName" ("<empty-name>")', t => {
  const actual = validations.dashName('');
  t.is(dashNameMsg, actual, 'Should return the error message');
});

test('validation for "dashName" ("name with space")', t => {
  const actual = validations.dashName('name with space');
  t.is(dashNameMsg, actual, 'Should return the error message');
});

test('validation for "dashName" ("correct-element")', t => {
  const actual = validations.dashName('correct-element');
  t.true(actual);
});

test('validation for "notEmpty" ("")', t => {
  const actual = validations.notEmpty('');
  t.is(actual, 'You have to provide a valid string');
});

test('validation for "notEmpty" ("", "SOMETHING")', t => {
  const actual = validations.notEmpty('', 'SOMETHING');
  t.is(actual, 'You have to provide a valid SOMETHING');
});

test('validation for "notEmpty" ("something")', t => {
  const actual = validations.notEmpty('something');
  t.true(actual);
});
