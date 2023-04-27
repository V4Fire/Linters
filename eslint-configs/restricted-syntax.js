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
