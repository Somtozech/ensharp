import sharp from 'sharp';
import path from 'path';
import {
	getAbsolutePath,
	makeDir,
	isGlob,
	parseSizes,
	selectProperties,
	matchGlobPatterns,
} from './utils';
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

	if (!options.width && !options.height) {
		throw new EnsharpError(
			'Invalid: At least one of width or height is required for resizing'
		);
	}

	const inputPath = getAbsolutePath(inputFilePath);

	const {
		sizes,
		width: inputWidth,
		height: inputHeight,
		...sharpOptions
	} = options;

	let sources: Array<string>;
	let imageSizes: Array<{ width?: number; height?: number }>;
	let isMultiple = false;

	if (isGlob(inputFilePath)) {
		sources = await matchGlobPatterns(inputPath);
		isMultiple = true;
	} else {
		sources = [inputPath];
	}

	if (sources.length === 0) {
		throw new EnsharpError(
			`No image with pattern ${inputFilePath} was matched at \`${path.dirname(
				inputPath
			)}\``
		);
	}

	if (sizes) {
		imageSizes = parseSizes(sizes);
	} else {
		imageSizes = [selectProperties(options, 'width, height')];
	}

	for (let source of sources) {
		for (let size of imageSizes) {
			const { name, ext, dir } = path.parse(source);
			const { width = '_', height = '_' } = size;
			const filename = `${name}.${width}x${height}${ext}`;
			const baseDir = isMultiple ? name : '';
			const destination = path.join(dir, 'resized', baseDir, filename);

			await makeDir(path.dirname(destination));

			await sharp(source)
				.resize({ ...sharpOptions, ...size })
				.toFile(destination);
		}
	}
};

export default resize;
