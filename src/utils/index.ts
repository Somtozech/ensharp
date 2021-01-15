import path from 'path';
import glob from 'is-glob';
import minimatch from 'minimatch';
import normalize from './normalize';
import { promises as fs, statSync } from 'fs';
import EnsharpError from './error';

export const getAbsolutePath = (name: string): string => {
	name = normalize(name);
	if (path.isAbsolute(name)) {
		return name;
	}

	return path.join(process.cwd(), name);
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

export const isGlob = (name: string): Boolean => {
	const basename = path.basename(name);

	return glob(basename);
};

export const readdir = async (dir: string): Promise<Array<string>> => {
	let fileList;
	try {
		fileList = await fs.readdir(dir);
	} catch (error) {
		throw new EnsharpError(
			`Cannot read directory \`${dir}\`: ${error.message}`
		);
	}

	return fileList;
};

export const matchGlobPatterns = async (globPath: string) => {
	globPath = normalize(globPath);
	const dir: string = path.dirname(globPath);

	const fileList: Array<string> = await readdir(dir);

	const matched = minimatch.match(fileList, path.basename(globPath));

	return matched.map((filename) => path.join(dir, filename));
};

export const isSameExtension = (
	source: string,
	destination: string
): Boolean => {
	return path.parse(source).ext === path.parse(destination).ext;
};
