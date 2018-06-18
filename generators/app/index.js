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
      },
      {
        type: 'confirm',
        name: 'scripts',
        message: 'Add scripts to package.json?'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.slugName = to.slug(this.props.projectName);
      if (this.appname === this.props.projectName) this.props.destination = '.';
      else this.props.destination = this.props.slugName;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('core/docs'),
      this.destinationPath(`${this.props.destination}/docs`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('core/docs/.vuepress'),
      this.destinationPath(`${this.props.destination}/docs/.vuepress`),
      this.props
    );
    if (this.props.scripts) {
      const scripts = {
        'docs:dev': 'vuepress dev docs',
        'docs:build': 'vuepress build docs'
      };
      if (
        this.fs.exists(this.destinationPath(`${this.props.destination}/package.json`))
      ) {
        let pack = JSON.parse(this.fs.read(`${this.props.destination}/package.json`));
        if (pack.scripts === undefined) pack.scripts = {};
        pack.scripts = Object.assign(pack.scripts, scripts);
        this.fs.write(
          `${this.props.destination}/package.json`,
          JSON.stringify(pack, null, 2)
        );
      } else {
        this.fs.write(
          `${this.props.destination}/package.json`,
          JSON.stringify(
            {
              scripts: scripts
            },
            null,
            2
          ) + '\n'
        );
      }
    }
  }

  install() {
    this.log('\n\nSuccessfully Generated!!');
    this.log(`Run ${chalk.green(`npm run docs:dev`)} to start.\n`);
  }
};
