'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const to = require('to-case');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to ${chalk.green('generator-vuepress')}!`));

    this.appname = this.appname.replace(/\s+/g, '-');

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: 'Awesome description'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.slugName = to.slug(this.props.projectName);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('core/.gitignore'),
      this.destinationPath(`${this.props.slugName}/.gitignore`)
    );

    this.fs.copyTpl(
      this.templatePath('core/docs/.vuepress'),
      this.destinationPath(`${this.props.slugName}/docs/.vuepress`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('core'),
      this.destinationPath(`${this.props.slugName}/.`),
      this.props
    );
  }

  install() {
    process.chdir(this.props.slugName);
    this.npmInstall().then(() => {
      this.log('\n\nSuccessfully Done!!');
      this.log('Run ' + chalk.green('npm run docs:dev') + ' to start.\n');
    });
  }
};
