import commander from 'commander';
import convert from './convert';
import path from 'path';

const pkg = require(path.join(process.cwd(), `package.json`));

const { program } = commander;

program
	.version(pkg.version)
	.command('convert <input> <output>')
	.description('Convert an Input File to another file in a different format.')
	.action(async (input, output) => {
		try {
			await convert(input, output);
			console.log('Conversion Successful');
		} catch (error) {
			if (error.name === 'EnsharpError') {
				console.error(error.message);
				process.exitCode = 1;
			} else {
				throw error;
			}
		}
	});

program.parse(process.argv);
