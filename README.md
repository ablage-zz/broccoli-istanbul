Broccoli-Istanbul
=================

Broccoli plugin for Istanbul instrumentation 

[![Build Status](https://img.shields.io/travis/marcelerz/broccoli-istanbul.svg)](http://travis-ci.org/marcelerz/broccoli-istanbul)
[![Coveralls Coverage](https://img.shields.io/coveralls/marcelerz/broccoli-istanbul.svg)](https://coveralls.io/r/marcelerz/broccoli-istanbul)
[![Code Climate Grade](https://img.shields.io/codeclimate/github/marcelerz/broccoli-istanbul.svg)](https://codeclimate.com/github/marcelerz/broccoli-istanbul)

[![NPM version](https://badge.fury.io/js/broccoli-istanbul.svg)](https://www.npmjs.com/package/broccoli-istanbul)
[![NPM License](https://img.shields.io/npm/l/broccoli-istanbul.svg)](https://www.npmjs.com/package/broccoli-istanbul)

[![NPM](https://nodei.co/npm/broccoli-istanbul.png?downloads=true&stars=true)](https://www.npmjs.com/package/broccoli-istanbul)
[![NPM](https://nodei.co/npm-dl/broccoli-istanbul.png?months=3&height=2)](https://www.npmjs.com/package/broccoli-istanbul)

[![Coverage Report](https://img.shields.io/badge/Coverage_Report-Available-blue.svg)](http://marcelerz.github.io/broccoli-istanbul/coverage/lcov-report/)

Based on [broccoli-sass](https://github.com/joliss/broccoli-sass).

## Installation

```bash
npm install --save-dev broccoli-istanbul
```

## Usage

```js
var IstanbulCompiler = require('broccoli-istanbul');

var outputTree = IstanbulCompiler(inputTrees, inputFile, outputFile, options);
```

* **`inputTrees`**: An array of trees that act as the include paths for Istanbul.

* **`inputFile`**: Relative path of the main `.js` file to instrument. Broccoli-Istanbul expects to find this file in the *first* input tree (`inputTrees[0]`).

* **`outputFile`**: Relative path of the output file.

* **`options`**: A hash of options for Istanbul. See [project website](https://github.com/gotwarlost/istanbul) for more information.

### Example

```js
var appJs = IstanbulCompiler(['src'], 'app/test.js', 'assets/test.js');
```

##Third-party libraries

The following third-party libraries are used by this module:

###Dependencies
* broccoli-caching-writer: https://github.com/rjackson/broccoli-caching-writer
* istanbul: https://github.com/gotwarlost/istanbul
* mkdirp: https://github.com/substack/node-mkdirp
* promise: https://github.com/then/promise

###Dev-Dependencies
* codeclimate-test-reporter: https://github.com/codeclimate/javascript-test-reporter
* coveralls: https://github.com/cainus/node-coveralls
* chai: http://chaijs.com
* mocha: https://github.com/visionmedia/mocha

##License

The MIT License

Copyright 2015 Marcel Erz
