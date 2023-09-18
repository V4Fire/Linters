'use strict';

/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

const
	jsdoc = require('./eslint-configs/jsdoc'),
	restrictedSyntax = require('./eslint-configs/restricted-syntax'),
	globalRules = require('./eslint-configs/global-rules'),
	testsRules = require('./eslint-configs/tests-rules'),
	typescriptRules = require('./eslint-configs/typescript-rules'),
	storybookRules = require('./eslint-configs/storybook-rules');

const
	languageOptions = {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins = [
		'jsdoc',
		'@v4fire',
		'import',
		'optimize-regex'
	];

module.exports = [
	{
		files: [
			'./*.js',
			'./lib/**/*.js',
			'./build/**/*.js',
			'./config/**/*.js'
		],
		languageOptions,
		plugins,
		rules: {
			...globalRules,
			...jsdoc.rules.js,

			'import/no-nodejs-modules': 'off',
			'import/order': 'off'
		},
		settings: {
			jsdoc: jsdoc.settings.js
		}
	},
	{
		files: ['*.ts'],
		languageOptions: {
			...languageOptions,
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: true,
				tsconfigRootDir: '.',
				sourceType: 'module',
				ecmaVersion: 'latest'
			}
		},
		plugins: [
			...plugins,
			'@typescript-eslint',
			'deprecation',
			'playwright'
		],
		rules: {
			...globalRules,
			...typescriptRules,
			...jsdoc.rules.ts,
			...restrictedSyntax,
			...testsRules
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true
				},
				node: {
					extensions: ['.js', '.ts']
				}
			},

			jsdoc: jsdoc.settings.ts
		}
	},
	{
		files: ['*.stories.@(ts|js|mjs|cjs)', '*.story.@(ts|js|mjs|cjs)'],
		plugins: ['storybook'],
		rules: {
			...storybookRules
		}
	},
	{
		files: ['.storybook/main.@(js|cjs|mjs|ts)'],
		plugins: ['storybook'],
		rules: {
			'storybook/no-uninstalled-addons': 'error'
		}
	},
];
