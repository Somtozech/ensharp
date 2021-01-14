import path from 'path';
import normalize from './normalize';
import { promises as fs, statSync } from 'fs';
import EnsharpError from './error';

export const getAbsolutePath = (name: string): string => {
	name = normalize(name);
	if (path.isAbsolute(name)) {
		return name;
	}

	return path.join(__dirname, name);
};

export const isFile = (filename: string): Boolean => {
	let stats: any;
	try {
		stats = statSync(filename);
	} catch (error) {
		throw new EnsharpError(`${error.message}`);
	}

	return stats.isFile();
};

export const dirname = (dir: string) => path.dirname(dir);

export const makeDir = async (
	dirname: string,
	options = { recursive: true }
) => {
	try {
		await fs.mkdir(dirname, options);
	} catch (error) {
		throw new EnsharpError(
			`Cannot create directory \`${dirname}\`: ${error.message}`
		);
	}
};
