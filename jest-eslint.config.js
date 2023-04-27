'use strict';

module.exports = {
	runner: 'jest-runner-eslint',
	displayName: 'lint',
	testMatch: [
		'<rootDir>/src/**/*.js',
		'<rootDir>/eslint-plugin/**/*.js',
		'<rootDir>/eslint-configs/**/*.js',
		'.eslintrc.js',
		'jest-eslint.config.js',
		'jest-runner-eslint.config.js'
	]
};
