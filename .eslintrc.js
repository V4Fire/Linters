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

module.exports = function getESLintConfig(config) {
	const eslintConfig = {
		env: {
			browser: true,
			es2021: true
		},

		parserOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest'
		},

		plugins: [
			'jsdoc',
			'@v4fire',
			'import',
			'optimize-regex'
		],

		rules: {
			...globalRules
		},

		overrides: [
			{
				files: [
					'./*.js',
					'./lib/**/*.js',
					'./build/**/*.js',
					'./config/**/*.js'
				],

				env: {
					node: true,
					es2021: true
				},

				parserOptions: {
					sourceType: 'script',
					ecmaVersion: 'latest'
				},

				rules: {
					...jsdoc.rules.js,

					'import/no-nodejs-modules': 'off',
					'import/order': 'off'
				},

				settings: {
					jsdoc: jsdoc.settings.js
				}
			},
		]
	}

	if (config.typescript) {
		eslintConfig.overrides.push(
			{
				files: ['*.ts'],
				parser: '@typescript-eslint/parser',

				plugins: [
					'@typescript-eslint',
					'deprecation',
					'playwright'
				],

				extends: ['plugin:@typescript-eslint/recommended'],

				parserOptions: {
					project: 'tsconfig.json',
					tsconfigRootDir: '.',
					sourceType: 'module',
					ecmaVersion: 'latest'
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
				},

				rules: {
					...typescriptRules,
					...jsdoc.rules.ts,
					...restrictedSyntax,
					...testsRules
				}
			}
		)
	}

	if (config.storybook) {
		eslintConfig.overrides.push(
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
			}
		)
	}

	return eslintConfig
};
