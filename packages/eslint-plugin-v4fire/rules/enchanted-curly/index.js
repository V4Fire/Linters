const {
	isTokenOnSameLine,
	isClosingBracketToken,
	isClosingBraceToken,
	isNotCommaToken
} = require('../utils');

/**
 * @typedef {import('eslint').ASTNode} ASTNode
 * @typedef {import('eslint').Token} Token
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		type: 'layout',

		docs: {
			description: 'enforce consistent spacing inside braces',
			category: 'Stylistic Issues'
		},

		fixable: 'whitespace',

		schema: [
			{
				enum: ['always', 'never']
			},

			{
				type: 'object',
				properties: {
					multiline: {
						type: 'boolean'
					},

					arraysInObjects: {
						type: 'boolean'
					},

					objectsInObjects: {
						type: 'boolean'
					},

					import: {
						type: 'boolean'
					},

					export: {
						type: 'boolean'
					}
				},

				additionalProperties: false
			}
		],

		messages: {
			requireSpaceBefore: "A space is required before '{{token}}'.",
			requireSpaceAfter: "A space is required after '{{token}}'.",
			unexpectedSpaceBefore: "There should be no space before '{{token}}'.",
			unexpectedSpaceAfter: "There should be no space after '{{token}}'.",
			requireLineBreakBefore: "A linebreak is required before '{{token}}'.",
			requireLineBreakAfter: "A linebreak is required after '{{token}}'.",
			unexpectedLineBreakBefore: "There should be no linebreak before '{{token}}'.",
			unexpectedLineBreakAfter: "There should be no linebreak after '{{token}}'."
		}
	},

	create(context) {
		const
			spaced = context.options[0] === 'always',
			sourceCode = context.getSourceCode();

		/**
		 * Determines whether the passed option is set, relative to the spacing option.
		 * If spaced is "always", then check whether option is set to false.
		 * If spaced is "never", then check whether option is set to true.
		 *
		 * @param {string} option - the option to exclude
		 * @returns {boolean}
		 */
		function isOptionSet(option) {
			return context.options[1] ? context.options[1][option] === !spaced : false;
		}

		/**
		 * Determines whether the passed option is toggled to "spaced", relative to the global spacing option
		 *
		 * @param {string} option - the option to exclude
		 * @returns {boolean}
		 */
		function isSpaced(option) {
			const
				opts = context.options[1];

			if (opts) {
				const val = opts[option];
				return spaced ? val !== false : val === true;
			}

			return spaced;
		}

		const options = {
			spaced,
			multiline: context.options[1] && context.options[1].multiline === true,

			arraysInObjectsException: isOptionSet('arraysInObjects'),
			objectsInObjectsException: isOptionSet('objectsInObjects'),

			import: isSpaced('import'),
			export: isSpaced('export')
		};

		//--------------------------------------------------------------------------
		// Helpers
		//--------------------------------------------------------------------------

		/**
		 * Reports that there shouldn't be a space after the first token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportNoBeginningSpace(node, token) {
			const
				nextToken = context.getSourceCode().getTokenAfter(token, {includeComments: true});

			context.report({
				node,
				loc: {start: token.loc.end, end: nextToken.loc.start},
				messageId: 'unexpectedSpaceAfter',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.removeRange([token.range[1], nextToken.range[0]]);
				}
			});
		}

		/**
		 * Reports that there shouldn't be a space before the last token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportNoEndingSpace(node, token) {
			const
				previousToken = context.getSourceCode().getTokenBefore(token, {includeComments: true});

			context.report({
				node,
				loc: {start: previousToken.loc.end, end: token.loc.start},
				messageId: 'unexpectedSpaceBefore',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.removeRange([previousToken.range[1], token.range[0]]);
				}
			});
		}

		/**
		 * Reports that there should be a space after the first token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportRequiredBeginningSpace(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: 'requireSpaceAfter',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.insertTextAfter(token, ' ');
				}
			});
		}

		/**
		 * Reports that there should be a space before the last token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportRequiredEndingSpace(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: 'requireSpaceBefore',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.insertTextBefore(token, ' ');
				}
			});
		}

		/**
		 * Reports that there shouldn't be a linebreak after the first token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportNoBeginningLineBreak(node, token) {
			const
				nextToken = context.getSourceCode().getTokenAfter(token, {includeComments: true});

			context.report({
				node,
				loc: {start: token.loc.end, end: nextToken.loc.start},
				messageId: 'unexpectedLineBreakAfter',

				data: {
					token: token.value
				},

				fix(fixer) {
					const lb = sourceCode.text.slice(token.range[1], nextToken.range[0]).split(/[\n\r]/).slice(-1)[0].length;
					return fixer.replaceTextRange([token.range[1], nextToken.range[0] - lb], '\n');
				}
			});
		}

		/**
		 * Reports that there shouldn't be a linebreak before the last token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to report in the error event
		 * @returns {void}
		 */
		function reportNoEndingLineBreak(node, token) {
			const
				previousToken = context.getSourceCode().getTokenBefore(token, {includeComments: true});

			context.report({
				node,
				loc: {start: previousToken.loc.end, end: token.loc.start},
				messageId: 'unexpectedLineBreakBefore',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.replaceTextRange([previousToken.range[1], token.range[0]], '\n');
				}
			});
		}

		/**
		 * Reports that there should be a linebreak after the first token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportRequiredBeginningLineBreak(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: 'requireLineBreakAfter',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.insertTextAfter(token, '\n');
				}
			});
		}

		/**
		 * Reports that there should be a linebreak before the last token
		 *
		 * @param {ASTNode} node - a node to report in the error event
		 * @param {Token} token - the token to use for the report
		 * @returns {void}
		 */
		function reportRequiredEndingLineBreak(node, token) {
			context.report({
				node,
				loc: token.loc,
				messageId: 'requireLineBreakBefore',

				data: {
					token: token.value
				},

				fix(fixer) {
					return fixer.insertTextBefore(token, '\n');
				}
			});
		}

		/**
		 * Determines if spacing in curly braces is valid
		 *
		 * @param {ASTNode} node - the AST node to check
		 * @param {Token} first - the first token to check (should be the opening brace)
		 * @param {Token} second - the second token to check (should be first after the opening brace)
		 * @param {Token} penultimate - the penultimate token to check (should be last before closing brace)
		 * @param {Token} last - the last token to check (should be closing brace)
		 * @returns {void}
		 */
		function validateBraceSpacing(node, first, second, penultimate, last) {
			let spaced;

			switch (node.type) {
				case 'ImportDeclaration':
					spaced = options.import;
					break;

				case 'ExportNamedDeclaration':
					spaced = options.export;
					break;

				default:
					spaced = options.spaced;
			}

			if (isTokenOnSameLine(first, second)) {
				const
					firstSpaced = sourceCode.isSpaceBetweenTokens(first, second);

				if (spaced && !firstSpaced) {
					reportRequiredBeginningSpace(node, first);
				}

				if (!spaced && firstSpaced && second.type !== 'Line') {
					reportNoBeginningSpace(node, first);
				}

			} else {
				const
					linesBetweenFirstAndSecond = second.loc.start.line - first.loc.start.line;

				if (spaced) {
					if (options.multiline && linesBetweenFirstAndSecond === 1) {
						reportRequiredBeginningLineBreak(node, first);

					} else if (options.multiline === false && linesBetweenFirstAndSecond !== 1) {
						reportNoBeginningLineBreak(node, first);
					}

				} else if (linesBetweenFirstAndSecond !== 1) {
					reportNoBeginningLineBreak(node, first);
				}
			}

			if (isTokenOnSameLine(penultimate, last)) {
				const shouldCheckPenultimate =
					options.arraysInObjectsException && isClosingBracketToken(penultimate) ||
					options.objectsInObjectsException && isClosingBraceToken(penultimate);

				const
					penultimateType = shouldCheckPenultimate && sourceCode.getNodeByRangeIndex(penultimate.range[0]).type;

				const closingCurlyBraceMustBeSpaced =
					options.arraysInObjectsException && penultimateType === 'ArrayExpression' ||
					options.objectsInObjectsException && (penultimateType === 'ObjectExpression' || penultimateType === 'ObjectPattern') ?
						!spaced :
						spaced;

				const
					lastSpaced = sourceCode.isSpaceBetweenTokens(penultimate, last);

				if (closingCurlyBraceMustBeSpaced && !lastSpaced) {
					reportRequiredEndingSpace(node, last);
				}

				if (!closingCurlyBraceMustBeSpaced && lastSpaced) {
					reportNoEndingSpace(node, last);
				}

			} else {
				const
					linesBetweenPenultimateAndLast = last.loc.end.line - penultimate.loc.start.line;

				if (spaced) {
					if (options.multiline && linesBetweenPenultimateAndLast === 1) {
						reportRequiredEndingLineBreak(node, last);

					} else if (options.multiline === false && linesBetweenPenultimateAndLast !== 1) {
						reportNoEndingLineBreak(node, last);
					}

				} else if (linesBetweenPenultimateAndLast !== 1) {
					reportNoEndingLineBreak(node, last);
				}
			}
		}

		/**
		 * Gets the `}` token from the passed ObjectExpression/ObjectPattern node.
		 *
		 * Because the last token of object patterns might be a type annotation,
		 * this traverses tokens preceded by the last property, then returns the first `}` token.
		 *
		 * @param {ASTNode} node - the node to get
		 * @returns {Token}
		 */
		function getClosingBraceOfObject(node) {
			const lastProperty = node.properties[node.properties.length - 1];
			return sourceCode.getTokenAfter(lastProperty, isClosingBraceToken);
		}

		/**
		 * Reports the given ObjectExpression/ObjectPattern node if spacing in curly braces is invalid
		 *
		 * @param {ASTNode} node - the node to check
		 * @returns {void}
		 */
		function checkForObject(node) {
			if (node.properties.length === 0) {
				return;
			}

			const
				first = sourceCode.getFirstToken(node),
				last = getClosingBraceOfObject(node),
				second = sourceCode.getTokenAfter(first, {includeComments: true}),
				penultimate = sourceCode.getTokenBefore(last, {includeComments: true});

			validateBraceSpacing(node, first, second, penultimate, last);
		}

		/**
		 * Reports the given ImportDeclaration node if spacing in curly braces is invalid
		 *
		 * @param {ASTNode} node - the node to check
		 * @returns {void}
		 */
		function checkForImport(node) {
			if (node.specifiers.length === 0) {
				return;
			}

			let
				firstSpecifier = node.specifiers[0];

			const
				lastSpecifier = node.specifiers[node.specifiers.length - 1];

			if (lastSpecifier.type !== 'ImportSpecifier') {
				return;
			}

			if (firstSpecifier.type !== 'ImportSpecifier') {
				firstSpecifier = node.specifiers[1];
			}

			const
				first = sourceCode.getTokenBefore(firstSpecifier),
				last = sourceCode.getTokenAfter(lastSpecifier, isNotCommaToken),
				second = sourceCode.getTokenAfter(first, {includeComments: true}),
				penultimate = sourceCode.getTokenBefore(last, {includeComments: true});

			validateBraceSpacing(node, first, second, penultimate, last);
		}

		/**
		 * Reports the given ExportNamedDeclaration node if spacing in curly braces is invalid
		 *
		 * @param {ASTNode} node - the node to check
		 * @returns {void}
		 */
		function checkForExport(node) {
			if (node.specifiers.length === 0) {
				return;
			}

			const
				firstSpecifier = node.specifiers[0],
				lastSpecifier = node.specifiers[node.specifiers.length - 1],
				first = sourceCode.getTokenBefore(firstSpecifier),
				last = sourceCode.getTokenAfter(lastSpecifier, isNotCommaToken),
				second = sourceCode.getTokenAfter(first, {includeComments: true}),
				penultimate = sourceCode.getTokenBefore(last, {includeComments: true});

			validateBraceSpacing(node, first, second, penultimate, last);
		}

		//--------------------------------------------------------------------------
		// Public
		//--------------------------------------------------------------------------

		return {
			// Var {x} = y;
			ObjectPattern: checkForObject,

			// Var y = {x: 'y'}
			ObjectExpression: checkForObject,

			// Import {y} from 'x';
			ImportDeclaration: checkForImport,

			// Export {name} from 'yo';
			ExportNamedDeclaration: checkForExport
		};
	}
};
