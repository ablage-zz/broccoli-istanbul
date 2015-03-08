'use strict';

var fs = require('fs');
var path = require('path');

var expect = require('chai').expect;

var IstanbulCompiler = require('../');

describe('broccoli-istanbul', function() {

	beforeEach(function () {
		var filename = 'test.js',
			fixturePath = path.join(__dirname, 'fixtures'),
			expectedPath = path.join(fixturePath, 'expected', filename);

		this.filename = filename;
		this.tree = [path.join(fixturePath, 'source')];
		this.expected = fs.readFileSync(expectedPath, 'utf8');
		this.destPath = path.join(__dirname, 'tmp');
		this.destFilePath = path.join(this.destPath, filename);
	});

	afterEach(function() {
		//fs.unlinkSync(this.destFilePath);
	});

	it('should instrument code', function(done) {
		var promise,
			compiler;

		compiler = IstanbulCompiler(this.tree, this.filename, this.filename, {
			debug: false,
			walkDebug: false,
			coverageVariable: '__coverage__',
			codeGenerationOptions: undefined,
			noAutoWrap: false,
			noCompact: false,
			embedSource: false,
			preserveComments: false,

			backdoor: {
				omitTrackerSuffix: true
			},

			sourceFile: 'source/test.js'
		});
		promise = compiler.updateCache(this.tree, this.destPath);

		promise.then(function () {
			var actual = fs.readFileSync(this.destFilePath, 'utf8');
			expect(actual).to.be.equal(this.expected);
			done();

		}.bind(this)).then(null, function (err) {
			done(err);
		});
	});
});
