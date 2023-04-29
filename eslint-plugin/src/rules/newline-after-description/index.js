const {default: iterateJsdoc} = require('eslint-plugin-jsdoc/dist/iterateJsdoc');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Rule for check newline after description in jsdoc
 */
const newlineAfterDescription = iterateJsdoc(({
	sourceCode,
	jsdoc,
	jsdocNode,
	report,
	indent,
	utils
}) => {
	const {
		description,
		lastDescriptionLine
	} = utils.getDescription();

	const
		descriptionEndsWithANewline = (/\n\r?$/u).test(description),
		isDescriptionMultiline = checkDescriptionMultiline(description, descriptionEndsWithANewline),
		isMultipleTags = jsdoc.tags.length > 1,
		sourceLines = sourceCode.getText(jsdocNode).split('\n');

	if (isMultipleTags || isDescriptionMultiline) {
		if (jsdoc.tags > 0 && !descriptionEndsWithANewline) {
			report('There must be a newline after the description of the JSDoc block.', (fixer) => {
				// Add the new line
				const injectedLine = `${indent} *${sourceLines[lastDescriptionLine].endsWith('\r') ? '\r' : ''}`;
				sourceLines.splice(lastDescriptionLine + 1, 0, injectedLine);

				return fixer.replaceText(jsdocNode, sourceLines.join('\n'));
			}, {
				line: lastDescriptionLine
			});
		}

	} else if (descriptionEndsWithANewline) {
		if (jsdoc.tags.length === 1 && jsdoc.tags[0].source.length > 1) {
			return;
		}

		report('There must be no newline after the description of the JSDoc block.', (fixer) => {
			// Remove the extra line
			sourceLines.splice(lastDescriptionLine, 1);

			return fixer.replaceText(jsdocNode, sourceLines.join('\n'));
		}, {
			line: lastDescriptionLine
		});
	}
}, {
	iterateAllJsdocs: true,
	meta: {
		docs: {
			description: 'Enforces a consistent padding of the block description.'
		},
		fixable: 'whitespace',
		schema: [
			{
				enum: ['always', 'never'],
				type: 'string'
			}
		],
		type: 'layout'
	}
});

/**
 * Returns true if description contains two or more lines
 *
 * @param {string} description
 * @param {boolean} descriptionEndsWithANewline
 *
 * @returns {boolean}
 */
function checkDescriptionMultiline(description, descriptionEndsWithANewline) {
	let testValue = description;

	if (descriptionEndsWithANewline) {
		testValue = testValue.slice(0, -2);
	}

	return /\n\r?/u.test(testValue);
}

module.exports = newlineAfterDescription;
