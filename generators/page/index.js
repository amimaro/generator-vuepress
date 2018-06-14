var Generator = require('yeoman-generator');
const to = require('to-case');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'pageName',
        message: 'Page name:'
      }
    ]).then(props => {
      this.props = props;
      this.props.pageSlug = to.slug(this.props.pageName);
      this.log('\n\n');
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath(`docs/${this.props.pageSlug}/.`),
      this.props
    );
  }

  install() {
    this.log(`Page Successfully Generated!!`);
  }
};
