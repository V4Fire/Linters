/*!
 * V4Fire Linters
 * https://github.com/V4Fire/Linters
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Linters/blob/master/LICENSE
 */

module.exports = {
	'playwright/max-nested-describe': ['warn', {max: 5}],
	'playwright/missing-playwright-await': ['error'],
	'playwright/no-conditional-in-test': ['warn'],
	'playwright/no-element-handle': ['error'],
	'playwright/no-eval': ['error'],
	'playwright/no-focused-test': ['error'],
	'playwright/no-force-option': ['error'],
	'playwright/no-page-pause': ['error'],
	'playwright/require-top-level-describe': ['error'],
	'playwright/no-useless-not': ['warn'],
	'playwright/no-wait-for-timeout': ['error'],
	'playwright/prefer-to-be': ['warn'],
	'playwright/prefer-to-have-length': ['warn'],
	'playwright/valid-expect': ['warn']
};
