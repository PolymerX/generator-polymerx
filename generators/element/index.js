'use strict';

const Generator = require('yeoman-generator');
const pascalize = require('pascalize');

const validations = require('./utils/validations');

module.exports = class extends Generator {
  constructor(a, b) {
    super(a, b);
    this.option('org', {
      type: 'string',
      desc: 'Publish to a GitHub organization account'
    });
  }

  init() {
    return this.prompt([{
      name: 'elementName',
      message: 'What do you want to name your element?',
      validate: validations.elementName
    }]).then(props => {
      const tpl = {
        elementName: props.elementName,
        pascalElementName: pascalize(props.elementName)
      };

      this.fs.copyTpl(
        [`${this.templatePath()}/**`],
        this.destinationPath(props.elementName),
        tpl);
    });
  }
};
