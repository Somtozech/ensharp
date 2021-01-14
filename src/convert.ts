import sharp, { FormatEnum } from 'sharp';
import path from 'path';

interface Convert {
	(input: string, output: string): Promise<void>;
}

const convert: Convert = async function (input: string, output: string) {
	await sharp(input).toFile(output);
};

export default convert;
