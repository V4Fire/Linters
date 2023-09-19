/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

const forbiddenMethods = [
	'copyWithin',
	'findLast',
	'findLastIndex',
	'at',
	'of',
	'trimLeft',
	'trimRight',
	'trimStart',
	'trimEnd',
	'matchAll'
];

function banImportExtension(extension) {
	const
		message = `Unexpected use of file extension (.${extension}) in import`,
		literalAttributeMatcher = `Literal[value=/\\.${extension}$/]`;

	return [
		{
			// import foo from 'bar.js';
			selector: `ImportDeclaration > ${literalAttributeMatcher}.source`,
			message,
		},
		{
			// const foo = import('bar.js');
			selector: `ImportExpression > ${literalAttributeMatcher}.source`,
			message,
		},
		{
			// type Foo = typeof import('bar.js');
			selector: `TSImportType > TSLiteralType > ${literalAttributeMatcher}`,
			message,
		},
		{
			// const foo = require('foo.js');
			selector: `CallExpression[callee.name = "require"] > ${literalAttributeMatcher}.arguments`,
			message,
		},
	];
}

module.exports = {
	'no-restricted-syntax': [
		'error',
		...forbiddenMethods.map((item) => ({
			message: 'No polyfill enabled for this method',
			selector: `MemberExpression > Identifier[name="${item}"]`
		})),
		...banImportExtension('js'),
		...banImportExtension('ts')
	]
};
