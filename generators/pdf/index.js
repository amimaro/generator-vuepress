var Generator = require('yeoman-generator');
const pdf = require('html-pdf');
const glob = require('glob');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'confirm',
        name: 'toPdf',
        message: 'Generate PDF?'
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
      const htmlFiles = glob
        .sync(process.cwd() + '/docs/.vuepress/dist/**/*.html')
        .sort((a, b) => {
          return a.length - b.length;
        })
        .filter(element => {
          if (element.indexOf('404') >= 0) return false;
          return true;
        });
      if (htmlFiles.length === 0) {
        this.log('Build not found');
        return;
      }
      const styleFiles = glob.sync(process.cwd() + '/docs/.vuepress/dist/**/*.css');
      for (let file of styleFiles) {
        style += this.fs.read(file);
      }
      const config = JSON.parse(
        this.fs
          .read('docs/.vuepress/config.js')
          .replace(/'/g, '"')
          .replace(/module\.exports = /g, '')
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
      );
      // Sort by navbar
      let navs = config.themeConfig.nav || [];
      for (const [pageIndex, nav] of navs.entries()) {
        let page = nav.link === '/' ? 'MainPage' : nav.link.replace(/\//g, '');
        for (let [fileIndex, file] of htmlFiles.entries()) {
          if (file.indexOf(page) >= 0 && fileIndex !== pageIndex) {
            let swapped = htmlFiles[fileIndex];
            htmlFiles[fileIndex] = htmlFiles[pageIndex];
            htmlFiles[pageIndex] = swapped;
          }
        }
      }
      // Compose document
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
      const options = {
        format: 'A4',
        header: {
          height: '20mm'
        },
        footer: {
          height: '20mm'
        }
      };
      pdf.create(html, options).toFile(`./output.pdf`, function(err, res) {
        if (err) return console.log(err);
        self.log(`${res.filename} - Generated Successfully!!`);
      });
    }
  }
};
