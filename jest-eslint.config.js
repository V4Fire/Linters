'use strict';

/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

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
