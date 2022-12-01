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
	typescriptEslintRules = require('./eslint-configs/typescript-eslint');

module.exports = {
	env: {
		browser: true,
		es2021: true
	},

	parserOptions: {
		sourceType: "module",
		ecmaVersion: "latest"
	},

	plugins: [
		"jsdoc"
	],

	rules: {
		...globalRules,
	},

	overrides: [
		{
			files: [
				"./*.js",
				"./lib/**/*.js",
				"./build/**/*.js",
				"./config/**/*.js"
			],

			plugins: [
				"enchanted-curly",
				"import",
				"jsdoc"
			],

			env: {
				node: true,
				es2021: true
			},

			parserOptions: {
				sourceType: "script",
				ecmaVersion: "latest"
			},

			rules: {
				...jsdoc.rules.js,

				"import/no-nodejs-modules": "off",
				"import/order": "off"
			},

			settings: {
				jsdoc: jsdoc.settings.js
			}
		},

		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",

			plugins: [
				"enchanted-curly",
				"@typescript-eslint",
				"jsdoc"
			],

			extends: [
				"plugin:@typescript-eslint/recommended"
			],

			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: ".",
				sourceType: "module",
				ecmaVersion: "latest"
			},

			settings: {
				"import/resolver": {
					typescript: {
						alwaysTryTypes: true
					}
				},

				jsdoc: jsdoc.settings.ts
			},

			rules: {
				...jsdoc.rules.ts,

				"no-restricted-syntax": [
					"error",
					...restrictedSyntax
				],

				...typescriptEslintRules
			}
		}
	]
}
