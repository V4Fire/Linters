/* eslint-disable no-inline-comments */
/* eslint-disable line-comment-position */

const baseRules = {
	'jsdoc/check-tag-names': [
		'error',
		{
			definedTags: [
				'typeParam',
				'packageDocumentation',
				'decorator',
				'link',
				'emits',
				'cli',
				'env'
			]
		}
	],

	'jsdoc/require-jsdoc': [
		'error',
		{
			exemptEmptyFunctions: true,
			publicOnly: true
		}
	],
	'jsdoc/require-description': [
		'error',
		{
			checkConstructors: false
		}
	],
	'jsdoc/require-param': [
		'error',
		{
			checkSetters: false,
			checkConstructors: false
		}
	],

	'jsdoc/check-indentation': ['error'],
	'jsdoc/check-param-names': ['error'],
	'jsdoc/check-alignment': ['error'],
	'jsdoc/check-line-alignment': ['error'],
	'jsdoc/check-property-names': ['error'],
	'jsdoc/check-syntax': ['error'],
	'jsdoc/check-types': ['error'],
	'jsdoc/check-values': ['error'],
	'jsdoc/empty-tags': ['error'],
	'jsdoc/multiline-blocks': ['error'],
	'jsdoc/no-bad-blocks': ['error'],
	'jsdoc/no-defaults': ['error'],
	'jsdoc/no-multi-asterisks': ['error'],
	'jsdoc/no-types': ['error'],
	'jsdoc/no-undefined-types': ['error'],
	'jsdoc/require-asterisk-prefix': ['error'],
	'jsdoc/require-hyphen-before-param-description': ['error'],
	'jsdoc/require-param-name': ['error'],
	'jsdoc/require-property': ['error'],
	'jsdoc/require-property-name': ['error'],
	'jsdoc/require-property-type': ['error'],
	'jsdoc/require-property-description': ['error'],
	'jsdoc/require-returns-check': ['error'],
	'jsdoc/require-returns-description': ['error'],
	'jsdoc/require-returns-type': ['error'],
	'jsdoc/require-throws': ['error'],

	'jsdoc/check-access': 0,
	'jsdoc/newline-after-description': 0,
	'jsdoc/implements-on-classes': 0,
	'jsdoc/require-yields': 0,
	'jsdoc/require-yields-check': 0,
	'jsdoc/tag-lines': 0,
	'jsdoc/valid-types': 0,
	'jsdoc/check-examples': 0,
	'jsdoc/match-description': 0,
	'jsdoc/no-missing-syntax': 0,
	'jsdoc/no-restricted-syntax': 0,
	'jsdoc/require-description-complete-sentence': 0,
	'jsdoc/require-example': 0,
	'jsdoc/require-file-overview': 0,
	'jsdoc/require-param-description': 0,
	'jsdoc/require-param-type': 0,
	'jsdoc/require-returns': 0
};

const baseSettings = {
	ignoreReplacesDocs: true,
	overrideReplacesDocs: true,
	augmentsExtendsReplacesDocs: true,
	implementsReplacesDocs: true,

	tagNamePreference: {
		fires: 'emits',
		return: 'returns'
	},

	structuredTags: {
		throws: {
			name: 'throws',
			required: ['namepath-referencing']
		}
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
	mode: 'typescript'
};

module.exports.settings.js = {
	...baseSettings,
	mode: 'closure',
	preferredTypes: {
		...baseSettings.preferredTypes,
		object: 'Object'
	}
};

module.exports.rules.ts = {
	...baseRules
};

module.exports.rules.js = {
	...baseRules,
	'jsdoc/no-types': 'off'
};
