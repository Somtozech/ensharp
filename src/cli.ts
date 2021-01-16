import commander from 'commander';
import path from 'path';
import convert from './convert';
import resize from './resize';
import { selectProperties } from './utils';

const pkg = require(path.join(__dirname, `../package.json`));

const { program } = commander;

program.version(pkg.version);

program
	.command('convert <input> <output>')
	.description('Convert an Input File to another file in a different format.')
	.action(async (input, output) => {
		try {
			const { sources, destinations } = await convert(input, output);

			console.log('Conversion Complete');
			sources.forEach((source, i) => {
				console.log(`${source} -> ${destinations[i]}`);
			});
		} catch (error) {
			errorHandler(error);
		}
	});

program
	.command('resize <input>')
	.description('Resize image to a particular width or height or width x height')
	.option('-w, --width <number>', 'width of the resulting image in pixel')
	.option('-h, --height <number>', 'height of the resulting image in pixel')
	.option(
		'--sizes <widthxheight>',
		'Specify multiple sizes for resizing eg `720x360,480x360,1080x720`'
	)
	.option(
		'--fit <type>',
		'how resulting image should fit provided dimension. one of `cover, fill, contain, inside, outside`'
	)
	.option(
		'-pos,--position <type>',
		'Position of image when fit is `cover` or `contain` (default is center). one of `top,right top, right,right bottom,bottom,left bottom,left,left top, center`'
	)
	.option(
		'-bg, --background <color>',
		'Background color when fit is `cover` or `contain`. Accepts hex color codes, RGB and HSL values'
	)
	.action(async (input, opts) => {
		const options = selectProperties(opts, 'sizes, fit, position, background');

		// make sure width and height are numbers before passing them as option
		if (opts.width && !Number.isNaN(parseInt(opts.width))) {
			options.width = Number.parseInt(opts.width);
		}

		if (opts.height && !Number.isNaN(parseInt(opts.height))) {
			options.height = Number.parseInt(opts.height);
		}

		try {
			await resize(input, options);
			console.log('Resizing was successful');
		} catch (error) {
			errorHandler(error);
		}
	});

function errorHandler(error: Error) {
	process.exitCode = 1;

	if (error.name === 'EnsharpError') {
		console.error(error.message);
	} else {
		throw error;
	}

	error.message && console.error(error.message);
	console.error('', 'lounger:', pkg.version, 'node:', process.version);
	console.error(
		'',
		'please open an issue including this log on ' + pkg.bugs.url
	);
}

program.parse(process.argv);
