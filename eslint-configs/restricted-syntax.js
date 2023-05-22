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

module.exports = {
	'no-restricted-syntax': [
		'error',
		...forbiddenMethods.map((item) => ({
			message: 'No polyfill enabled for this method',
			selector: `MemberExpression > Identifier[name="${item}"]`
		}))
	]
};
