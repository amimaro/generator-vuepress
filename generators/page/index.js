var Generator = require('yeoman-generator');
const to = require('to-case');
const updateConfigs = require('../../utils/updateConfigs');

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
    const configs = this.fs.read('docs/.vuepress/config.js');
    const navOutput = updateConfigs({
      props: this.props,
      configs: configs,
      option: 'nav'
    });
    const sidebarOutput = updateConfigs({
      props: this.props,
      configs: navOutput,
      option: 'sidebar'
    });
    const output = sidebarOutput
      .replace(/{\n {8}text:/g, '{ text:')
      .replace(/\/"\n {6}}/g, '/" }')
      .replace(/"/g, "'")
      .replace(/,\n {8}link:/g, ', link:');
    this.fs.write('docs/.vuepress/config.js', output);
  }

  install() {
    this.log(`Page Successfully Generated!!`);
  }
};
