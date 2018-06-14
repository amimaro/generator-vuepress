'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-vuepress:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ projectName: 'press', description: 'Awesome Description' });
  });

  it('creates files', () => {
    assert.file(['README.md', '.gitignore', 'docs/.vuepress/config.js']);
  });
});

describe('generator-vuepress:page', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({ pageName: 'Test Page' });
  });

  it('creates files', () => {
    assert.file([`docs/test-page/README.md`]);
    assert.fileContent(`docs/test-page/README.md`, /# Test Page/);
  });
});

describe('generator-vuepress:component', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/component'))
      .withPrompts({ componentName: 'Test-Component' });
  });

  it('creates files', () => {
    assert.file([`docs/.vuepress/components/Test/Component.vue`]);
    assert.fileContent(`docs/.vuepress/components/Test/Component.vue`, /<template>/);
  });
});

describe('generator-vuepress:component case', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/component'))
      .withPrompts({ componentName: 'test component' });
  });

  it('creates files', () => {
    assert.file([`docs/.vuepress/components/Test/Component.vue`]);
    assert.fileContent(`docs/.vuepress/components/Test/Component.vue`, /<template>/);
  });
});
