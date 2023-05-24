/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

const baseRules = {
	'jsdoc/check-tag-names': [
		'error',
		{
			definedTags: [
				'typeParam',
				'packageDocumentation',
				'packageDescription',
				'decorator',
				'link',
				'emits',
				'cli',
				'env',
				'throws'
			]
		}
	],

	'jsdoc/require-jsdoc': [
		'warn',
		{
			exemptEmptyFunctions: true,
			publicOnly: true,
			checkConstructors: false,
			contexts: [
				'MethodDefinition[value.type = "FunctionExpression"][override=false]:not(MethodDefinition[value.type = "TSEmptyBodyFunctionExpression"] + MethodDefinition)',
				'PropertyDefinition[override=false]',
				'ArrowFunctionExpression',
				'FunctionDeclaration',
				'FunctionExpression'
			]
		}
	],
	'jsdoc/require-description': [
		'warn',
		{
			checkConstructors: false
		}
	],
	'jsdoc/require-param': [
		'warn',
		{
			checkSetters: false,
			checkConstructors: false,
			checkDestructured: false,
			contexts: [
				{
					comment: '*:not(JsdocBlock:has(JsdocInlineTag[tag=link]))'
				}
			]
		}
	],
	'jsdoc/check-param-names': [
		'warn',
		{
			checkDestructured: false
		}
	],

	'jsdoc/check-indentation': 'off',
	'jsdoc/check-alignment': 'error',
	'jsdoc/check-line-alignment': 'error',
	'jsdoc/check-property-names': 'error',
	'jsdoc/check-syntax': 'error',
	'jsdoc/check-types': 'error',
	'jsdoc/check-values': 'error',
	'jsdoc/empty-tags': 'error',
	'jsdoc/multiline-blocks': 'error',
	'jsdoc/no-bad-blocks': 'error',
	'jsdoc/no-defaults': 'error',
	'jsdoc/no-types': 'error',
	'jsdoc/no-undefined-types': 'error',
	'jsdoc/require-asterisk-prefix': 'error',
	'jsdoc/require-param-name': 'error',

	'jsdoc/require-property': 'off',
	'jsdoc/require-property-name': 'off',
	'jsdoc/require-property-type': 'off',
	'jsdoc/require-property-description': 'off',

	'jsdoc/require-hyphen-before-param-description': 'warn',
	'jsdoc/require-throws': 'warn',

	'@v4fire/newline-after-description': 'error',

	'jsdoc/check-access': 'off',
	'jsdoc/implements-on-classes': 'off',
	'jsdoc/require-yields': 'off',
	'jsdoc/require-yields-check': 'off',
	'jsdoc/tag-lines': 'off',
	'jsdoc/valid-types': 'off',
	'jsdoc/check-examples': 'off',
	'jsdoc/match-description': 'off',
	'jsdoc/no-missing-syntax': 'off',
	'jsdoc/no-restricted-syntax': 'off',
	'jsdoc/require-description-complete-sentence': 'off',
	'jsdoc/require-example': 'off',
	'jsdoc/require-file-overview': 'off',
	'jsdoc/require-param-description': 'off',
	'jsdoc/require-param-type': 'off',
	'jsdoc/require-returns': 'off',
	'jsdoc/require-returns-description': 'off',
	'jsdoc/require-returns-check': 'off',
	'jsdoc/require-returns-type': 'off',
	'jsdoc/no-multi-asterisks': 'off'
};

const baseSettings = {
	ignoreReplacesDocs: true,
	overrideReplacesDocs: true,
	augmentsExtendsReplacesDocs: true,
	implementsReplacesDocs: true,

	tagNamePreference: {
		fires: 'emits',
		return: 'returns',
		property: 'prop'
	}
};

module.exports = {
	rules: {
		ts: {},
		js: {}
	},

	settings: {
		ts: {},
		js: {}
	}
};

module.exports.settings.ts = {
	...baseSettings,
	mode: 'typescript',
	tagNamePreference: {
		...baseSettings.tagNamePreference,
		override: false
	}
};

module.exports.settings.js = {
	...baseSettings,
	mode: 'closure',
	preferredTypes: {
		...baseSettings.preferredTypes
	}
};

module.exports.rules.ts = {
	...baseRules
};

module.exports.rules.js = {
	...baseRules,
	'jsdoc/require-param-type': 'warn',
	'jsdoc/require-returns-check': 'warn',
	'jsdoc/require-returns': 'warn',
	'jsdoc/no-types': 'off'
};
