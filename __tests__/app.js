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
    assert.file(['press/docs/.vuepress/config.js']);
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
