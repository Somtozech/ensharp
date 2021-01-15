import sharp from 'sharp';
import path from 'path';

import {
	getAbsolutePath,
	isFile,
	makeDir,
	isGlob,
	matchGlobPatterns,
	isSameExtension,
} from './utils';
import EnsharpError from './utils/error';

interface Convert {
	(input: string, output: string): Promise<{
		sources: Array<string>;
		destinations: Array<string>;
	}>;
}

const convert: Convert = async function (input: string, output: string) {
	if (isSameExtension(input, output)) {
		throw new EnsharpError('Cannot Convert images of with same extension');
	}

	// resolve absolute path of the input
	const inputPath = getAbsolutePath(input);

	let sources: Array<string>;

	const destinations = [];

	let canRename = true;

	if (isGlob(inputPath)) {
		sources = await matchGlobPatterns(inputPath);
		canRename = false;
	} else {
		sources = [inputPath];
	}

	if (sources.length === 0) {
		throw new EnsharpError(
			`No image with pattern ${input} was matched at \`${path.dirname(
				inputPath
			)}\``
		);
	}

	for (let source of sources) {
		if (!isFile(source)) {
			throw new EnsharpError(
				`INVALID PATH: input file path dosen't point to a file`
			);
		}

		const { name: sourceName, dir } = path.parse(source);
		const { ext, name: destName = sourceName } = path.parse(output);

		let filename = canRename ? destName : sourceName;

		let destination = path.join(dir, 'converted', `${filename}${ext}`);

		destinations.push(destination);

		// create directory if it dosen't exist
		await makeDir(path.dirname(destination));

		await sharp(source).toFile(destination);
	}

	return {
		sources,
		destinations,
	};
};

export default convert;
