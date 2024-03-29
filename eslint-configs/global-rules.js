module.exports = {
	// ES spec ESLint rules
	strict: ['error', 'global'],

	'no-with': 'error',
	'no-caller': 'error',
	'no-delete-var': 'error',
	'no-proto': 'off',

	// Disable JS bad parts
	'use-isnan': 'error',
	'valid-typeof': 'error',
	'no-undef': 'off',

	'no-eq-null': 'off',
	eqeqeq: ['error', 'always', {null: 'never'}],
	'no-compare-neg-zero': 'error',

	'no-obj-calls': 'error',
	'no-sparse-arrays': 'error',

	'no-new': 'error',
	'no-new-func': 'error',
	'no-new-object': 'error',
	'no-new-symbol': 'error',
	'no-new-wrappers': 'error',
	'no-array-constructor': 'error',
	'new-parens': 'error',

	'no-dupe-keys': 'error',
	'no-dupe-args': 'error',

	'no-extend-native': 'off',
	'no-global-assign': 'error',
	'no-implicit-globals': 'error',
	'no-implicit-coercion': 'error',

	'no-restricted-globals': [
		'error',

		{
			name: 'window',
			message: 'Use globalThis parameter instead.'
		},

		{
			name: 'global',
			message: 'Use globalThis parameter instead.'
		}
	],

	'no-void': ['error', {allowAsStatement: true}],
	'no-eval': 'error',
	'no-script-url': 'off',

	// Variables

	'one-var': 'off',
	'one-var-declaration-per-line': 'off',
	'vars-on-top': 'error',

	'no-var': 'error',
	'block-scoped-var': 'error',
	'no-inner-declarations': 'error',

	'prefer-const': ['error', {destructuring: 'all'}],

	// Assignment rules

	'no-cond-assign': ['error', 'except-parens'],

	'no-multi-assign': 'error',
	'no-return-assign': 'off',

	'no-ex-assign': 'error',
	'no-param-reassign': 'off',

	'no-import-assign': 'error',
	'no-func-assign': 'error',
	'no-class-assign': 'error',
	'no-const-assign': 'error',

	'no-self-assign': 'error',
	'operator-assignment': 'error',

	// Redeclare

	'no-redeclare': 'error',
	'no-shadow': 'off',
	'no-shadow-restricted-names': 'error',

	// Condition rules

	'no-constant-condition': 'warn',
	'no-extra-boolean-cast': 'error',
	yoda: 'error',

	'no-lonely-if': 'warn',
	'no-negated-condition': 'off',
	'no-dupe-else-if': 'warn',
	'no-else-return': ['error', {allowElseIf: false}],

	'no-fallthrough': 'error',
	'no-duplicate-case': 'error',
	'default-case': 'warn',
	'default-case-last': 'error',
	'no-case-declarations': 'error',

	'no-self-compare': 'error',
	'no-unsafe-negation': 'error',

	// Ternary

	'no-ternary': 'off',
	'no-nested-ternary': 'error',
	'no-unneeded-ternary': 'error',
	'multiline-ternary': ['error', 'always-multiline'],

	// RegExp-s

	'no-invalid-regexp': 'error',
	'no-control-regex': 'warn',
	'require-unicode-regexp': 'off',

	'prefer-regex-literals': 'error',
	'prefer-named-capture-group': 'off',
	'wrap-regex': 'off',

	'no-misleading-character-class': 'warn',
	'no-empty-character-class': 'error',
	'no-div-regex': 'off',

	'no-regex-spaces': 'warn',
	'no-irregular-whitespace': ['error', {skipStrings: true, skipTemplates: true}],

	// Dead code

	'no-lone-blocks': 'off',
	'no-useless-return': 'error',
	'no-useless-catch': 'error',
	'no-unused-labels': 'error',

	'no-extra-bind': 'error',
	'no-useless-call': 'error',

	'no-useless-computed-key': [
		'error', {
			enforceForClassMembers: true
		}
	],

	'no-empty': ['warn', {allowEmptyCatch: true}],
	'no-empty-pattern': 'error',
	'no-unreachable': 'warn',

	'no-useless-concat': 'error',
	'no-useless-backreference': 'error',
	'no-useless-escape': 'error',

	// Async

	'no-await-in-loop': 'off',
	'no-async-promise-executor': 'off',
	'require-atomic-updates': 'warn',
	'prefer-promise-reject-errors': 'off',
	'require-await': 'error',
	'no-return-await': 'error',

	// Modern syntax

	'prefer-exponentiation-operator': 'error',
	'prefer-numeric-literals': 'error',
	'prefer-template': 'error',

	'object-shorthand': 'error',
	'prefer-object-spread': 'error',

	'prefer-rest-params': 'warn',
	'prefer-spread': 'warn',

	'prefer-destructuring': [
		'error', {
			VariableDeclarator: {
				array: false,
				object: true
			}
		}
	],

	'prefer-arrow-callback': [
		'error', {
			allowNamedFunctions: true,
			allowUnboundThis: true
		}
	],

	// Accessors

	'no-setter-return': 'error',
	'getter-return': ['error', {allowImplicit: false}],
	'accessor-pairs': [
		'error', {
			setWithoutGet: true,
			getWithoutSet: false,
			enforceForClassMembers: false
		}
	],

	// Loops

	'for-direction': 'off',
	'guard-for-in': 'warn',

	'no-loop-func': 'off',
	'no-unmodified-loop-condition': 'error',

	'no-iterator': 'warn',
	'no-continue': 'off',

	// Line breaks

	'unicode-bom': 'error',
	'eol-last': 'error',

	'linebreak-style': 'error',
	'no-multiple-empty-lines': ['error', {max: 1}],

	'operator-linebreak': ['error', 'after'],
	'no-unexpected-multiline': 'error',

	'padded-blocks': 'off',
	'padding-line-between-statements': [
		'error',
		{blankLine: 'always', prev: 'block-like', next: '*'},
		{blankLine: 'always', prev: 'class', next: '*'},
		{blankLine: 'always', prev: 'function', next: '*'},
		{blankLine: 'always', prev: 'iife', next: '*'},
		{blankLine: 'always', prev: 'multiline-block-like', next: '*'},
		{blankLine: 'always', prev: 'multiline-expression', next: '*'},
		{blankLine: 'always', prev: 'directive', next: '*'},
		{blankLine: 'always', prev: 'import', next: 'export'},
		{blankLine: 'always', prev: 'cjs-import', next: 'cjs-export'}
	],

	// Spaces

	'no-mixed-spaces-and-tabs': ['error'],
	'no-tabs': ['error', {allowIndentationTabs: true}],

	'semi-spacing': 'error',
	'semi-style': 'error',

	'no-multi-spaces': 'error',
	'no-trailing-spaces': 'error',

	'space-infix-ops': 'error',
	'space-unary-ops': 'error',

	'space-in-parens': 'error',
	'space-before-blocks': 'error',
	'no-whitespace-before-property': 'error',

	'keyword-spacing': 'off',

	'rest-spread-spacing': 'error',
	'yield-star-spacing': ['error', 'after'],
	'generator-star-spacing': [
		'error', {
			before: false,
			after: true,
			method: {before: false, after: false}
		}
	],

	'array-bracket-newline': 'error',
	'array-bracket-spacing': 'error',
	'array-element-newline': ['error', 'consistent'],

	'block-spacing': 'error',
	'nonblock-statement-body-position': 'error',

	'key-spacing': 'error',
	'switch-colon-spacing': 'error',
	'computed-property-spacing': 'error',

	'object-curly-spacing': 'off',
	'object-curly-newline': ['error', {consistent: true}],
	'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}],

	'enchanted-curly/object-curly-spacing': [
		'error', 'never', {
			multiline: true,
			import: true,
			export: true
		}
	],

	// Numbers

	'no-octal': 'error',
	'no-loss-of-precision': 'warn',
	'no-floating-decimal': 'error',
	radix: 'error',

	// Strings

	'no-multi-str': 'error',
	'no-template-curly-in-string': 'warn',
	'no-octal-escape': 'error',

	'template-tag-spacing': 'error',
	'template-curly-spacing': 'error',

	// Documentation

	'symbol-description': 'warn',

	// Labels

	'no-labels': ['error', {allowLoop: true}],
	'no-label-var': 'off',
	'no-extra-label': 'error',

	// Imports

	'no-duplicate-imports': 'off',
	'no-useless-rename': 'off',

	// Functions

	'func-names': ['error', 'as-needed'],
	'func-name-matching': 'error',
	'func-style': ['error', 'declaration', {allowArrowFunctions: true}],

	'wrap-iife': 'error',
	'newline-per-chained-call': ['error', {ignoreChainWithDepth: 3}],
	'function-call-argument-newline': ['error', 'consistent'],
	'function-paren-newline': ['error', 'consistent'],

	'func-call-spacing': 'error',
	'space-before-function-paren': [
		'error', {
			anonymous: 'always',
			named: 'never',
			asyncArrow: 'always'
		}
	],

	'no-invalid-this': 'off',
	'consistent-this': ['error', 'self', 'that'],

	'default-param-last': 'error',

	'arrow-parens': 'error',
	'arrow-spacing': 'error',
	'arrow-body-style': 'error',

	'array-callback-return': 'error',
	'no-confusing-arrow': 'off',

	'implicit-arrow-linebreak': 'off',

	// Classes

	'no-this-before-super': 'error',
	'constructor-super': 'error',

	'class-methods-use-this': 'off',
	'no-constructor-return': 'off',

	'no-useless-constructor': 'error',
	'no-dupe-class-members': 'error',

	'dot-notation': 'off',
	'dot-location': ['error', 'property'],

	'lines-between-class-members': 'error',

	// Comments

	'no-warning-comments': 'off',
	'no-inline-comments': 'error',
	'multiline-comment-style': 'off',

	'line-comment-position': ['error', 'above'],
	'lines-around-comment': 'off',

	'spaced-comment': [
		'error', 'always', {
			line: {
				exceptions: ['-'],
				markers: [
					'/',
					'#set',
					'#if',
					'#endif',
					'#unless',
					'#endunless',
					'#include',
					'#without'
				]
			},

			block: {
				markers: ['!'],
				exceptions: ['*'],
				balanced: true
			}
		}
	],

	'capitalized-comments': [
		'error', 'always', {
			ignorePattern: '#|webpack',
			ignoreConsecutiveComments: true
		}
	],

	// Naming

	camelcase: 'error',

	'no-underscore-dangle': 'off',

	'new-cap': [
		'error', {
			newIsCap: true,
			capIsNew: false,
			newIsCapExceptionPattern: '^[bpg][A-Z]'
		}
	],

	// Unsafe

	'no-undef-init': 'off',
	'no-use-before-define': ['error', {functions: false}],
	'no-unsafe-finally': 'error',

	// Best practices

	'no-magic-numbers': 'off',
	'no-sequences': 'off',

	'no-prototype-builtins': 'off',
	'no-mixed-operators': 'off',

	curly: 'error',

	'require-yield': 'error',
	'consistent-return': 'off',

	'no-bitwise': 'error',
	'no-plusplus': 'off',

	'no-unused-expressions': ['error', {allowShortCircuit: true}],

	'no-unused-vars': [
		'error', {
			vars: 'all',
			args: 'after-used'
		}
	],

	// Style

	semi: 'error',
	'no-extra-semi': 'error',

	'brace-style': 'error',

	'no-empty-function': 'error',

	'comma-dangle': 'error',
	'comma-style': 'error',
	'comma-spacing': 'error',

	quotes: ['error', 'single', {avoidEscape: true}],
	'quote-props': ['error', 'as-needed', {keywords: false, numbers: false}],
	'jsx-quotes': 'error',

	'no-extra-parens': 'off',

	'init-declarations': 'off',

	// Other

	'sort-keys': 'off',
	'sort-vars': 'off',
	'sort-imports': 'off',

	'id-blacklist': 'off',
	'id-length': 'off',
	'id-match': 'off',

	// Code metrics

	complexity: ['error', {max: 50}],

	'max-params': 'off',
	'max-statements': 'off',
	'max-classes-per-file': 'off',

	'max-depth': ['warn', {max: 10}],
	'max-nested-callbacks': ['warn', {max: 10}],

	'max-lines-per-function': [
		'warn', {
			max: 400,
			skipComments: true
		}
	],

	'max-lines': [
		'error', {
			max: 800,
			skipComments: true
		}
	],

	'max-len': [
			'error', {
			code: 120,
			tabWidth: 2,
			ignoreUrls: true,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true
		}
	],

	// [Import]

	'import/no-unresolved': 'off',
	// 'import/no-cycle': 'warn',

	'import/no-absolute-path': 'error',
	'import/no-relative-parent-imports': 'off',
	'import/no-extraneous-dependencies': 'off',
	'import/no-useless-path-segments': 'error',
	'import/no-self-import': 'error',
	'import/no-internal-modules': 'off',
	'import/no-nodejs-modules': 'warn',

	'import/no-commonjs': 'off',
	'import/no-dynamic-require': 'off',
	'import/no-webpack-loader-syntax': 'off',
	'import/no-amd': 'error',

	'import/named': 'error',
	'import/default': 'error',
	'import/namespace': 'error',
	'import/no-unassigned-import': 'off',

	'import/export': 'error',
	'import/no-mutable-exports': 'warn',
	'import/no-named-export': 'off',
	'import/group-exports': 'off',

	'import/no-named-as-default': 'error',
	'import/no-named-as-default-member': 'error',
	'import/no-named-default': 'error',

	'import/no-anonymous-default-export': [
		'error', {
			allowArray: true,
			allowArrowFunction: true,
			allowAnonymousClass: true,
			allowAnonymousFunction: true,
			allowCallExpression: true,
			allowLiteral: true,
			allowObject: true
		}
	],

	'import/no-deprecated': 'warn',
	'import/no-unused-modules': 'warn',
	'import/unambiguous': 'off',

	'import/first': 'error',
	'import/newline-after-import': 'error',
	'import/exports-last': 'off',

	'import/prefer-default-export': 'off',

	'import/no-duplicates': 'off',
	'import/no-namespace': 'off',
	'import/max-dependencies': 'off',

	'import/extensions': [
		'error', {
			js: 'never',
			jsx: 'never',
			ts: 'never',
			tsx: 'never',
			svg: 'always',
			json: 'always'
		}
	]
};
