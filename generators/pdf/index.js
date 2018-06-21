var Generator = require('yeoman-generator');
const pdf = require('html-pdf');
const glob = require('glob');

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
      let html = '';
      let style = '';
      const htmlFiles = glob.sync(process.cwd() + '/docs/.vuepress/dist/**/*.html');
      const styleFiles = glob.sync(process.cwd() + '/docs/.vuepress/dist/**/*.css');
      for (let file of styleFiles) {
        style += this.fs.read(file);
      }
      for (let file of htmlFiles) {
        html += this.fs
          .read(file)
          .replace(/<link rel="stylesheet" href=".*/g, `<style>${style}</style>`)
          .replace(/<div class="page-nav">.*<\/div>/gs, '')
          .replace(
            /<header class="navbar">(.*)<div class="page">/gs,
            '<div class="page">'
          );
      }
      const options = { format: 'A4' };
      pdf.create(html, options).toFile(`./output.pdf`, function(err, res) {
        if (err) return console.log(err);
        self.log(`${res.filename} - Generated Successfully!!`);
      });
    }
  }
};
