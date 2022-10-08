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
			publicOnly: true,
			contexts: [
				'PropertyDefinition',
				'ArrowFunctionExpression',
				'ClassDeclaration',
				'ClassExpression',
				'FunctionDeclaration',
				'FunctionExpression',
				'MethodDefinition'
			]
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

	'jsdoc/check-indentation': 'error',
	'jsdoc/check-param-names': 'error',
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
	'jsdoc/require-hyphen-before-param-description': 'error',
	'jsdoc/require-param-name': 'error',
	'jsdoc/require-property': 'error',
	'jsdoc/require-property-name': 'error',
	'jsdoc/require-property-type': 'error',
	'jsdoc/require-property-description': 'error',
	'jsdoc/require-returns-check': 'error',
	'jsdoc/require-returns-type': 'error',
	'jsdoc/require-throws': 'error',

	'jsdoc/check-access': 'off',
	'jsdoc/newline-after-description': 'off',
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
	'jsdoc/no-multi-asterisks': 'off'
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
		...baseSettings.preferredTypes
	}
};

module.exports.rules.ts = {
	...baseRules
};

module.exports.rules.js = {
	...baseRules,
	'jsdoc/require-param-type': 'error',
	'jsdoc/require-returns': 'error',
	'jsdoc/no-types': 'off'
};
