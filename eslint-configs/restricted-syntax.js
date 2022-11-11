module.exports = [
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
].map((item) => ({
	message: 'No polyfill enabled for this method',
	selector: `MemberExpression > Identifier[name="${item}"]`
}));
