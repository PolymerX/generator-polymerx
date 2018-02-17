'use strict';

const Generator = require('yeoman-generator');
const pascalize = require('pascalize');

const validations = require('./../__utils/validations');

module.exports = class extends Generator {
  init() {
    return this.prompt([{
      name: 'elementName',
      message: 'What do you want to name your element?',
      validate: validations.dashName
    }]).then(props => {
      const tpl = {
        elementName: props.elementName,
        pascalElementName: pascalize(props.elementName)
      };

      this.fs.copyTpl(
        [`${this.templatePath()}/**`],
        this.destinationPath(props.elementName),
        tpl
      );
    });
  }
};
