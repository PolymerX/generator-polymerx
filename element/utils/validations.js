'use strict';

module.exports = {
  elementName: x => x.length > 0 && x.includes('-') ?
                true : 'You have to provide a name with a dash ("-")'
};
