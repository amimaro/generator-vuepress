var Generator = require('yeoman-generator');
const to = require('to-case');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name:'
      }
    ]).then(props => {
      this.props = props;
      this.props.destination = this.props.componentName.replace('-', '/') + '.vue';
      this.props.componentSlug = to.slug(this.props.componentName);
      this.log('\n\n');
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('Demo.vue'),
      this.destinationPath(`docs/.vuepress/components/${this.props.destination}`),
      this.props
    );
  }

  install() {
    this.log(`Component Successfully Generated!!`);
  }
};
