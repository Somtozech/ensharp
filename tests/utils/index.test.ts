import {
	getAbsolutePath,
	isGlob,
	isSameExtension,
	parseSizes,
	selectProperties,
} from '../../src/utils';

import path from 'path';

describe('getAbsolutePath', () => {
	const cwd = process.cwd();
	test('should return an absolute path given an absolute path', () => {
		const inputPath = getAbsolutePath('/c/projects');

		expect(inputPath).toBe('/c/projects');
	});

	test('should return cwd/path given a non absolute path', () => {
		const inputPath = getAbsolutePath('test');
		expect(inputPath).toBe(path.join(cwd, 'test'));
	});

	test('should return cwd given an empty string or undefined', () => {
		const path = getAbsolutePath();
		expect(path).toBe(cwd);
	});
});

describe('isGlob', () => {
	test('should return true for globby patterns', () => {
		expect(isGlob('*.png')).toBeTruthy();
	});

	test('should false for non Globby patterns', () => {
		expect(isGlob('image.png')).toBeFalsy();
	});
});

describe('isSameExtension', () => {
	test('should return true for same Extensions', () => {
		expect(isSameExtension('input.png', 'output.png')).toBeTruthy();
	});

	test('should false for different extensions', () => {
		expect(isSameExtension('input.png', 'output.jpg')).toBeFalsy();
	});

	test('should return false when one of the input is undefined', () => {
		expect(isSameExtension('input.png')).toBeFalsy();
	});
});

describe('parseSizes', () => {
	test('should return an array of objects with height and width properties', () => {
		expect(parseSizes('100x200,200x300')).toEqual([
			{
				width: 100,
				height: 200,
			},
			{
				width: 200,
				height: 300,
			},
		]);
	});
});

describe('selectProperties', () => {
	const testObj = {
		input: 'image.png',
		output: 'output.png',
		width: 100,
		height: 200,
	};

	test('should return specified properties in object', () => {
		expect(selectProperties(testObj, 'width, height')).toEqual({
			width: 100,
			height: 200,
		});
	});

	test('should return an empty object when properties are not specified', () => {
		expect(selectProperties(testObj)).toEqual({});
	});
});
