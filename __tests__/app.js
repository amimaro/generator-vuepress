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
