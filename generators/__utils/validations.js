'use strict';

module.exports = {
  dashName: x => x.length > 0 && x.includes('-') ?
    true : 'You have to provide a name with a dash ("-")',
  notEmpty: (x, name) => x.length > 0 ?
    true : `You have to provide a valid ${name || 'string'}`
};
