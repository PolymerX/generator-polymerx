import test from 'ava';

import validations from './../generators/element/utils/validations';

test('validation for "elementName" ("elementWithoutDash")', t => {
  const expected = 'You have to provide a name with a dash ("-")';
  const actual = validations.elementName('elementWithoutDash');
  t.is(expected, actual, 'Should return the error message');
});

test('validation for "elementName" ("<empty-name>")', t => {
  const expected = 'You have to provide a name with a dash ("-")';
  const actual = validations.elementName('');
  t.is(expected, actual, 'Should return the error message');
});

test('validation for "elementName" ("correct-element")', t => {
  const actual = validations.elementName('correct-element');
  t.true(actual);
});
