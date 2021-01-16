import sharp from 'sharp';
import path from 'path';
import { getAbsolutePath, makeDir } from './utils';
import EnsharpError from './utils/error';

type ResizeFitOptions = 'cover' | 'fill' | 'contain' | 'inside' | 'outside';

type ResizePositionOptions =
	| 'top'
	| 'right top'
	| 'right'
	| 'right bottom'
	| 'bottom'
	| 'left bottom'
	| 'left'
	| 'left top'
	| 'center';

export interface IResizeOptions {
	width?: number;
	height?: number;
	fit?: ResizeFitOptions;
	position?: ResizePositionOptions;
	background?: string;
	sizes?: string;
}

interface Resize {
	(inputFile: string, options: IResizeOptions): Promise<void>;
}

const resize: Resize = async function (
	inputFilePath: string,
	options: IResizeOptions
) {
	if (Object.keys(options).length === 0) {
		throw new EnsharpError(
			'Invalid: Specify options for resizing eg -w 200 -h 200'
		);
	}

	const source = getAbsolutePath(inputFilePath);
	const { name, ext, dir } = path.parse(source);
	const destination = path.join(dir, 'resized', `${name}${ext}`);

	const { sizes, ...sharpOptions } = options;

	await makeDir(path.dirname(destination));

	await sharp(source).resize(sharpOptions).toFile(destination);
};

export default resize;
