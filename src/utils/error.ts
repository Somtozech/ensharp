export default class EnsharpError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'EnsharpError';

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, EnsharpError);
		}
	}
}
