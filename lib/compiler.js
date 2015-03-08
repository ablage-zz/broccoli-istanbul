var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var CachingWriter = require('broccoli-caching-writer');
var Promise = require('promise');
var istanbul = require('istanbul');

IstanbulCompiler.prototype = Object.create(CachingWriter.prototype);
IstanbulCompiler.prototype.constructor = IstanbulCompiler;

function IstanbulCompiler (sourceTrees, inputFile, outputFile, options) {

	if (!(this instanceof IstanbulCompiler)) {
		return new IstanbulCompiler(sourceTrees, inputFile, outputFile, options);
	}

	CachingWriter.call(this, sourceTrees, options);

	this.inputFile = inputFile;
	this.outputFile = outputFile;
	this.options = options || {};
}

IstanbulCompiler.prototype.updateCache = function (includePaths, destDir) {

	var srcFile,
		destFile,

		mkdir,
		readFile,
		writeFile,

		instrumenter;

	// Get destination file
	srcFile = path.join(includePaths[0], this.inputFile);
	destFile = path.join(destDir, this.outputFile);

	// Prepare asynchronous calls
	mkdir = Promise.denodeify(mkdirp);
	readFile = Promise.denodeify(fs.readFile).bind(fs);
	writeFile = Promise.denodeify(fs.writeFile).bind(fs);

	// Prepare Istanbul
	instrumenter = new istanbul.Instrumenter(this.options);

	return Promise.resolve().then(function () {
		return mkdir(path.dirname(destFile));

	}).then(function () {
		return readFile(srcFile, 'utf8');

	}).then(function (data) {
		var code = instrumenter.instrumentSync(data, this.options.sourceFile || srcFile);

		return writeFile(destFile, code, { encoding: 'utf8' });

	}.bind(this));
};

module.exports = IstanbulCompiler;
