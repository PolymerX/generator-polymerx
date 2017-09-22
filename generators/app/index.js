'use strict';

const Generator = require('yeoman-generator');
const pascalize = require('pascalize');
const normalizeUrl = require('normalize-url');
const superb = require('superb');
const humanizeUrl = require('humanize-url');

const validations = require('./../__utils/validations');

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
      name: 'appName',
      message: 'What do you want to name your Polymer Skeleton App?',
      default: 'polymer-skeleton',
      filter: validations.dashName
    }, {
      name: 'appDescription',
      message: 'What is your app description?',
      default: `My ${superb()} PWA`
    }, {
      name: 'githubUsername',
      message: 'What is your GitHub username?',
      store: true,
      validate: x => validations.notEmpty(x, 'GitHub username'),
      when: () => !this.options.org
    }, {
      name: 'website',
      message: 'What is the URL of your website?',
      store: true,
      validate: x => validations.notEmpty(x, 'website url'),
      filter: /* istanbul ignore next */ x => normalizeUrl(x)
    }, {
      name: 'nyc',
      message: 'Do you need code coverage?',
      type: 'confirm',
      default: false
    }, {
      name: 'codecov',
      message: 'Upload coverage to codecov.io?',
      type: 'confirm',
      default: false,
      when: x => x.nyc
    }]).then(props => {
      const repoName = `${this.options.org || props.githubUsername}/${props.appName}`;
      const tpl = {
        appName: props.appName,
        appDescription: props.appDescription,
        pascalModuleName: pascalize(props.appName),
        githubUsername: this.options.org || props.githubUsername,
        repoName,
        name: this.user.git.name(),
        email: this.user.git.email(),
        website: props.website,
        humanizedWebsite: humanizeUrl(props.website),
        nyc: props.nyc,
        codecov: props.nyc && props.codecov
      };

      this.fs.copyTpl(
        [`${this.templatePath()}/**`],
        this.destinationPath(),
        tpl,
        {},
        {globOptions: {dot: true}});
    });
  }
  git() {
    this.spawnCommandSync('git', ['init']);
  }
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
