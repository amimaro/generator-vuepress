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
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('core/docs'),
      this.destinationPath('docs'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('core/docs/.vuepress'),
      this.destinationPath('docs/.vuepress'),
      this.props
    );
    if (this.props.scripts) {
      const scripts = {
        'docs:dev': 'vuepress dev docs',
        'docs:build': 'vuepress build docs'
      };
      if (this.fs.exists(this.destinationPath('package.json'))) {
        let pack = JSON.parse(this.fs.read('package.json'));
        if (pack.scripts === undefined) pack.scripts = {};
        pack.scripts = Object.assign(pack.scripts, scripts);
        this.fs.write('package.json', JSON.stringify(pack, null, 2));
      } else {
        this.fs.write(
          'package.json',
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
