var Generator = require('yeoman-generator');
const pdf = require('html-pdf');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'confirm',
        name: 'toPdf',
        message: 'Convert to pdf?'
      }
    ]).then(props => {
      this.props = props;
      this.log('\n\n');
    });
  }

  writing() {
    if (this.props.toPdf) {
      const self = this;
      const html = this.fs.read('docs/.vuepress/dist/index.html');
      const options = { format: 'Letter' };
      pdf.create(html, options).toFile(`./output.pdf`, function(err, res) {
        if (err) return console.log(err);
        self.log(`${res.filename} - Generated Successfully!!`);
      });
    }
  }
};
