/**
 * @fileoverview A set of custom rules for eslint
 * @author kholstinin
 */

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const {newlineAfterDescription} = require('./rules/newline-after-description');
const {enchantedCurly} = require('./rules/newline-after-description');

module.exports.rules = {
	'newline-after-description': newlineAfterDescription,
	'enchanted-curly': enchantedCurly
};
