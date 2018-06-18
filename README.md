# generator-vuepress [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/amimaro/generator-vuepress)
> Yeoman generator for VuePress

## Installation

First, install [Yeoman](http://yeoman.io) and generator-vuepress using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g vuepress
npm install -g yo
npm install -g generator-vuepress
```

Then generate your new project:

```bash
yo vuepress
```

Check out for VuePress Docs [here](https://vuepress.vuejs.org/).

## Getting started

```bash
npm run docs:dev
```

## Generate Page

```bash
yo vuepress:page
```

Creates a `[folder]/README.md` under docs.
Overwrite the conflicts to persist the theme configurations.

## Generate Component

```bash
yo vuepress:component
```

Creates a component under `docs/.vuepress/components`.

## Build

```bash
npm run docs:build
```

Build generated under `docs/.vuepress/dist`

## File tree
```
.
├── docs
│   ├── about
│   │   └── README.md
│   ├── contact
│   │   └── README.md
│   ├── images
│   │   └── thumbnail-256x256.png
│   ├── README.md
│   └── .vuepress
│       ├── components
│       │   ├── Button
│       │   │   └── Counter.vue
│       │   └── Demo.vue
│       ├── config.js
|       ├── dist
│       └── public
│           └── favicon.ico
└── package.json
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [amimaro](amimaro.github.io)


[npm-image]: https://badge.fury.io/js/generator-vuepress.svg
[npm-url]: https://npmjs.org/package/generator-vuepress
[travis-image]: https://travis-ci.org/amimaro/generator-vuepress.svg?branch=master
[travis-url]: https://travis-ci.org/amimaro/generator-vuepress
[daviddm-image]: https://david-dm.org/amimaro/generator-vuepress.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/amimaro/generator-vuepress
