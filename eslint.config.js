'use strict';

/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

const eslintGlobals = require('globals');

const 
	tsPlugin = require('@typescript-eslint/eslint-plugin'),
	jsdoc = require('eslint-plugin-jsdoc'),
	importPlugin = require('eslint-plugin-import'),
	optimizeRegexPlugin = require('eslint-plugin-optimize-regex'),
	playwrightPlugin = require('eslint-plugin-playwright'),
	deprecationPlugin = require('eslint-plugin-deprecation'),
	storybookPlugin = require('eslint-plugin-storybook'),
	v4firePlugin = require('@v4fire/eslint-plugin');

const
	jsdocConfig = require('./eslint-configs/jsdoc'),
	typescriptEslintParser = require('@typescript-eslint/parser'),
	restrictedSyntax = require('./eslint-configs/restricted-syntax'),
	globalRules = require('./eslint-configs/global-rules'),
	testsRules = require('./eslint-configs/tests-rules'),
	typescriptRules = require('./eslint-configs/typescript-rules'),
	storybookRules = require('./eslint-configs/storybook-rules');

const
	languageOptions = {
		ecmaVersion: 'latest'
	},
	plugins = {
		jsdoc,
		'@v4fire': v4firePlugin,
		import: importPlugin,
		'optimize-regex': optimizeRegexPlugin
	},
	linterOptions = {
		reportUnusedDisableDirectives: true
	};

module.exports = [
	{
		files: [
			'**/*.js'
		],
		languageOptions: {
			...languageOptions,
			sourceType: 'commonjs',
			globals: {
				...eslintGlobals.node
			}
		},
		plugins,
		rules: {
			...globalRules,
			...jsdocConfig.rules.js,

			'import/no-nodejs-modules': 'off',
			'import/order': 'off'
		},
		linterOptions,
		settings: {
			jsdoc: jsdocConfig.settings.js
		}
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			...languageOptions,
			parser: typescriptEslintParser,
			sourceType: 'module',
			parserOptions: {
				project: true,
				tsconfigRootDir: '.',
				sourceType: 'module',
				ecmaVersion: 'latest'
			},
			globals: {
				...eslintGlobals.browser
			}
		},
		plugins: {
			...plugins,
      '@typescript-eslint': tsPlugin,
			deprecation: deprecationPlugin,
			playwright: playwrightPlugin
		},
		rules: {
			...globalRules,
			...typescriptRules,
			...jsdocConfig.rules.ts,
			...restrictedSyntax,
			...testsRules
		},
		linterOptions,
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true
				},
				node: {
					extensions: ['.js', '.ts']
				}
			},

			jsdoc: jsdocConfig.settings.ts
		}
	},
	{
		files: ['*.stories.@(ts|js|mjs|cjs)', '*.story.@(ts|js|mjs|cjs)'],
		plugins: {
			storybook: storybookPlugin
		},
		rules: {
			...storybookRules
		}
	},
	{
		files: ['.storybook/main.@(js|cjs|mjs|ts)'],
		plugins: {
			storybook: storybookPlugin
		},
		rules: {
			'storybook/no-uninstalled-addons': 'error'
		}
	},
];
