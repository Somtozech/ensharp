import sharp from 'sharp';

import { getAbsolutePath, isFile, makeDir, dirname } from './utils';
import EnsharpError from './utils/error';

interface Convert {
	(input: string, output: string): Promise<void>;
}

const convert: Convert = async function (input: string, output: string) {
	const source = getAbsolutePath(input);
	const destination = getAbsolutePath(output);

	if (!isFile(source)) {
		throw new EnsharpError(
			`INVALID PATH: input file path dosen't point to a file`
		);
	}

	// create destination directory in case it dosen't exist.
	await makeDir(dirname(destination));

	await sharp(input).toFile(output);
};

export default convert;
