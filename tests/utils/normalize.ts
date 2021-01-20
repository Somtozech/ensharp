import normalize from '../../src/utils/normalize';

describe('normalize', () => {
	test('should return a normalized path', () => {
		expect(normalize('c:\\projects\\tests')).toBe('c:/projects/tests');
	});
});
