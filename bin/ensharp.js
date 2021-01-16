#!/usr/bin/env node

const pkg = require('../package.json');

function onFatalError(error) {
	process.exitCode = 1;

	error.message && console.error(error.message);
	console.error('', '');
	console.error('', 'ensharp:', pkg.version, 'node:', process.version);
	console.error(
		'',
		'please open an issue including this log on ' + pkg.bugs.url
	);
}

(async function main() {
	process.on('uncaughtException', onFatalError);
	process.on('unhandledRejection', onFatalError);

	require('../lib/cli.js');
})().catch(onFatalError);
