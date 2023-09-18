/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

module.exports = {
	'@typescript-eslint/no-explicit-any': 'off',
	'@typescript-eslint/no-misused-new': 'error',
	'@typescript-eslint/no-invalid-void-type': [
		'error',
		{
			allowAsThisParameter: true
		}
	],
	'@typescript-eslint/no-type-alias': 'off',

	'@typescript-eslint/no-unnecessary-type-arguments': 'off',
	'@typescript-eslint/no-unnecessary-type-assertion': 'error',

	'@typescript-eslint/no-non-null-assertion': 'off',
	'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
	'@typescript-eslint/no-extra-non-null-assertion': 'error',

	'@typescript-eslint/prefer-optional-chain': 'warn',
	'@typescript-eslint/prefer-nullish-coalescing': 'warn',

	'@typescript-eslint/no-inferrable-types': [
		'error', {
			ignoreParameters: true,
			ignoreProperties: true
		}
	],

	'@typescript-eslint/array-type': [
		'error', {
			default: 'array-simple'
		}
	],

	'@typescript-eslint/no-unnecessary-type-constraint': 'off',

	'@typescript-eslint/consistent-type-assertions': [
		'error', {
			assertionStyle: 'angle-bracket',
			objectLiteralTypeAssertions: 'allow'
		}
	],

	'@typescript-eslint/empty-interface': 'off',
	'@typescript-eslint/method-signature-style': ['error', 'method'],
	'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
	'@typescript-eslint/member-delimiter-style': 'error',

	'@typescript-eslint/prefer-function-type': 'off',
	'@typescript-eslint/adjacent-overload-signatures': 'error',
	'@typescript-eslint/unified-signatures': 'warn',

	'@typescript-eslint/typedef': [
		'error', {
			parameter: true,
			arrowParameter: false,
			propertyDeclaration: true,
			memberVariableDeclaration: true,
			variableDeclaration: false,
			variableDeclarationIgnoreFunction: true,
			arrayDestructuring: false,
			objectDestructuring: false
		}
	],

	'@typescript-eslint/no-unsafe-return': 'off',
	'@typescript-eslint/explicit-function-return-type': 'off',
	'@typescript-eslint/explicit-module-boundary-types': [
		'error', {
			allowArgumentsExplicitlyTypedAsAny: true,
			allowHigherOrderFunctions: true
		}
	],

	'@typescript-eslint/explicit-member-accessibility': 'off',
	'@typescript-eslint/class-literal-property-style': 'off',
	'@typescript-eslint/no-extraneous-class': 'error',
	'@typescript-eslint/no-parameter-properties': 'error',

	'@v4fire/unbound-method': [
		'warn', {
			ignoreStatic: true,
			ignore: ['Object', 'Number', 'String', 'RegExp', 'Function']
		}
	],

	'@typescript-eslint/prefer-readonly': 'error',
	'@typescript-eslint/prefer-readonly-parameter-types': 'off',

	'@typescript-eslint/no-namespace': 'error',
	'@typescript-eslint/no-unnecessary-qualifier': 'error',
	'@typescript-eslint/prefer-namespace-keyword': 'error',
	'@typescript-eslint/no-require-imports': 'off',
	'@typescript-eslint/no-duplicate-imports': 'error',
	'@typescript-eslint/no-var-requires': 'error',

	'@typescript-eslint/prefer-as-const': 'error',
	'@typescript-eslint/prefer-for-of': 'off',
	'@typescript-eslint/no-for-in-array': 'off',

	'@typescript-eslint/prefer-includes': 'warn',
	'@typescript-eslint/require-array-sort-compare': ['error', {ignoreStringArrays: true}],
	'@typescript-eslint/prefer-string-starts-ends-with': 'warn',
	'@typescript-eslint/prefer-reduce-type-parameter': 'warn',
	'@typescript-eslint/prefer-regexp-exec': 'warn',

	'@typescript-eslint/no-base-to-string': 'off',
	'@typescript-eslint/no-dynamic-delete': 'off',
	'@typescript-eslint/no-implied-eval': 'off',

	'@typescript-eslint/restrict-plus-operands': 'error',
	'@typescript-eslint/restrict-template-expressions': [
		'error', {
			allowNumber: true,
			allowBoolean: true,
			allowNullish: true,
			allowAny: true
		}
	],

	'@typescript-eslint/switch-exhaustiveness-check': 'warn',
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

	'no-extra-boolean-cast': 'off',
	'@typescript-eslint/strict-boolean-expressions': [
		'error', {
			allowString: false,
			allowNumber: false,
			allowNullableBoolean: true
		}
	],

	'@typescript-eslint/no-floating-promises': ['warn', {ignoreIIFE: true}],
	'@typescript-eslint/promise-function-async': 'off',

	'@typescript-eslint/no-unnecessary-condition': [
		'error', {
			allowConstantLoopConditions: true
		}
	],

	'@typescript-eslint/no-throw-literal': 'off',

	'@typescript-eslint/ban-ts-comment': [
		'error', {
			'ts-ignore': 'allow-with-description',
			'ts-expect-error': 'allow-with-description',
			minimumDescriptionLength: 4
		}
	],

	'@typescript-eslint/prefer-ts-expect-error': 'off',
	'@typescript-eslint/ban-types': [
		'error', {
			extendDefaults: false,
			types: {
				String: {
					message: 'Use string instead',
					fixWith: 'string'
				},

				Number: {
					message: 'Use number instead',
					fixWith: 'number'
				},

				Boolean: {
					message: 'Use boolean instead',
					fixWith: 'boolean'
				},

				Symbol: {
					message: 'Use symbol instead',
					fixWith: 'symbol'
				}
			}
		}
	],

	'@typescript-eslint/member-ordering': [
		'error', {
			default: [
				'signature',

				'public-static-field',
				'protected-static-field',
				'public-static-method',
				'protected-static-method',

				'public-instance-field',
				'protected-instance-field',
				'private-instance-field',

				'public-constructor',
				'protected-constructor',

				'public-instance-method',
				'protected-instance-method',

				'private-static-field',
				'private-static-method',

				'private-constructor',
				'private-instance-method'
			]
		}
	],

	'brace-style': 'off',
	'@typescript-eslint/brace-style': 'error',

	'comma-spacing': 'off',
	'@typescript-eslint/comma-spacing': 'error',

	'default-param-last': 'off',
	'@typescript-eslint/default-param-last': 'error',

	'dot-notation': 'off',
	'@typescript-eslint/dot-notation': 'off',

	'func-call-spacing': 'off',
	'@typescript-eslint/func-call-spacing': 'error',

	'init-declarations': 'off',
	'@typescript-eslint/init-declarations': 'off',

	'lines-between-class-members': 'off',
	'@typescript-eslint/lines-between-class-members': ['error', {exceptAfterSingleLine: true, exceptAfterOverload: true}],

	'keyword-spacing': 'off',
	'@v4fire/keyword-spacing': 'error',

	'no-array-constructor': 'off',
	'@typescript-eslint/no-array-constructor': 'error',

	'no-dupe-class-members': 'off',
	'@typescript-eslint/no-dupe-class-members': 'error',

	'no-empty-function': 'off',
	'@typescript-eslint/no-empty-function': 'error',

	'@typescript-eslint/no-empty-interface': 'off',

	'no-extra-parens': 'off',
	'@typescript-eslint/no-extra-parens': 'off',

	semi: 'off',
	'@typescript-eslint/semi': 'error',

	'no-extra-semi': 'off',
	'@typescript-eslint/no-extra-semi': 'error',

	'no-invalid-this': 'off',
	'@typescript-eslint/no-invalid-this': 'error',

	'no-magic-numbers': 'off',
	'@typescript-eslint/no-magic-numbers': 'off',

	'no-unused-expressions': 'off',
	'@typescript-eslint/no-unused-expressions': ['error', {allowShortCircuit: true}],

	'no-unused-vars': 'off',
	'@typescript-eslint/no-unused-vars': [
		'error', {
			args: 'after-used',
			argsIgnorePattern: '^_'
		}
	],

	'deprecation/deprecation': 'warn',

	'no-useless-constructor': 'off',
	'@typescript-eslint/no-useless-constructor': 'error',

	quotes: 'off',
	'@typescript-eslint/quotes': ['error', 'single', {avoidEscape: true}],

	'require-await': 'off',
	'@typescript-eslint/require-await': 'error',

	'no-return-await': 'off',
	'@typescript-eslint/return-await': ['error', 'in-try-catch'],

	'space-before-function-paren': 'off',
	'@typescript-eslint/space-before-function-paren': [
		'error', {
			anonymous: 'always',
			named: 'never',
			asyncArrow: 'always'
		}
	],

	'consistent-this': 'off',
	'@typescript-eslint/no-this-alias': [
		'error', {
			allowDestructuring: true,
			allowedNames: ['self', 'that']
		}
	],

	'no-use-before-define': 'off',
	'@typescript-eslint/no-use-before-define': [
		'error', {
			functions: false,
			typedefs: false,
			ignoreTypeReferences: true
		}
	],

	'no-redeclare': 'off',
	'@typescript-eslint/no-redeclare': [
		'error', {
			ignoreDeclarationMerge: true
		}
	],

	// Debug
	'no-console': 'error',
	'no-alert': 'error',
	'no-debugger': 'error',

	// Import rules
	'import/named': 'off',
	'import/default': 'off',
	'import/namespace': 'off'
};
