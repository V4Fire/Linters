/**
 * @typedef {import('eslint').ASTNode} ASTNode
 * @typedef {import('eslint').Token} Token
 */

const {ESLintUtils} = require('@typescript-eslint/utils');

module.exports = {
	/**
	 * Determines whether two adjacent tokens are on the same line
	 *
	 * @param {Token} left - the left token to check
	 * @param {Token} right - the right token to check
	 * @returns {boolean}
	 */
	isTokenOnSameLine(left, right) {
		return left.loc.end.line === right.loc.start.line;
	},

	/**
	 * Checks if the given token is a closing square bracket token or not
	 *
	 * @param {Token} token - the token to check
	 * @returns {boolean}
	 */
	isClosingBracketToken(token) {
		return token.value === ']' && token.type === 'Punctuator';
	},

	/**
	 * Checks if the given token is a closing brace token or not
	 *
	 * @param {Token} token - the token to check
	 * @returns {boolean}
	 */
	isClosingBraceToken(token) {
		return token.value === '}' && token.type === 'Punctuator';
	},

	/**
	 * Checks if the given token is not a comma token
	 *
	 * @param {Token} token - the token to check
	 * @returns {boolean}
	 */
	isNotCommaToken(token) {
		return !(token.value === ',' && token.type === 'Punctuator');
	},

	/**
	 * Factory for creating typescript eslint rules
	 */
	createTSRule: ESLintUtils.RuleCreator(
		(_name) => 'https://github.com/v4fire/linters'
	)
};
