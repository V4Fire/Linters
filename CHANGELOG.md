Changelog
=========

> **Tags:**
> - :boom:       [Breaking Change]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]
> - :house:      [Internal]
> - :nail_care:  [Polish]

_Note: Gaps between patch versions are faulty, broken or test releases._

## v1.10.0 (2022-09-15)

### :rocker: New Feature

* Refactored eslint rules
* Added `tsdoc-eslint` plugin
* Added `jsdoc-eslint` plugin

:boom: Breaking Change

* Migrated on `eslint@8`
* Removed `babel-parser`

## v1.9.0 (2021-11-15)

#### :rocket: New Feature

* Added new dependencies: `@statoscope/stats-validator-plugin-webpack` and `@statoscope/stats-validator-reporter-console` to lint statoscope reports

## v1.8.0 (2021-10-25)

#### :boom: Breaking Change

* Removed `tslint.json`

#### :bug: Bug Fix

* Added `useTabs` to `.prettierrc.js`

#### :house: Internal

* Updated dependencies:
  * `eslint@7.32.0`
  * `prettier@2.4.1`
  * `@typescript-eslint/eslint-plugin@4.33.0`
  * `@typescript-eslint/parse@4.33.0`
  * `eslint-import-resolver-typescript@2.5.0`

## v1.7.3 (2021-05-19)

#### :bug: Bug Fix

* Fixed a version of `eslint-plugin-import` to `2.22.1`

#### :house: Internal

* Updated dependencies:
  * `eslint@7.26.0`
  * `@typescript-eslint/eslint-plugin@4.24.0`
  * `@typescript-eslint/parser@4.24.0`
  * `prettier@2.3.0`

## v1.7.2 (2021-03-01)

#### :bug: Bug Fix

* Disabled `import/no-duplicates`

## v1.7.1 (2021-03-01)

#### :bug: Bug Fix

* Set `@typescript-eslint/no-duplicate-imports` `includeExports` to `false`

## v1.7.0 (2021-03-01)

#### :rocket: New Feature

* Added `@typescript-eslint/no-duplicate-imports` instead of `no-duplicate-imports`

#### :house: Internal

* Updated dependencies:
  * `eslint@7.21.0`
  * `@typescript-eslint/eslint-plugin@4.15.2`
  * `@typescript-eslint/parser/eslint-plugin@4.15.2`
  * `@v4fire/typescript-check@1.3.1`
  * `eslint-import-resolver-typescript@2.4.0`
  * `prettier@2.2.1`
  * `stlint-v4fire@1.0.38`

## v1.6.1 (2020-09-24)

#### :bug: Bug Fix

* `@typescript-eslint`:
  * Added `@typescript-eslint/no-use-before-define`
  * Added `@typescript-eslint/no-redeclare"`

## v1.6.0 (2020-09-24)

#### :boom: Breaking Change

* Updated dependencies `@typescript-eslint/eslint-plugin@4.2.0`, `@typescript-eslint/parser@4.2.0`, `eslint@7.9.0`

#### :house: Internal

* Added an override for `lib/*.js`

#### :nail_care: Polish

* Added `npm run up`
* Added badges within `README.md`

## v1.5.9 (2020-09-11)

#### :bug: Bug Fix

* Disabled `no-duplicate-imports`

## v1.5.8 (2020-09-01)

#### :bug: Bug Fix

* Fixed a version of `eslint` to `7.7.0`

## v1.5.7 (2020-08-28)

#### :house: Internal

* Updated dependencies:
  * `@v4fire/typescript-check@1.2.0`

## v1.5.6 (2020-08-28)

#### :bug: Bug Fix

* tslint
  * `no-use-before-declare` -> `false`
  * `no-var-requires` -> `false`
  * `unified-signatures` -> `false`
  * `no-invalid-template-strings` -> `false`

## v1.5.5 (2020-08-19)

#### :bug: Bug Fix

* tslint `no-var-keyword` -> `false`

## v1.5.4 (2020-08-02)

#### :house: Internal

* Updated dependencies:
  * `@typescript-eslint/eslint-plugin@3.7.1`"
  * `@typescript-eslint/parser@3.7.1`
  * `eslint@7.6.0`
  * `eslint-import-resolver-typescript@2.2.0`
  * `tslint@6.1.3`

## v1.5.3 (2020-07-29)

#### :bug: Bug Fix

* tslint `member-ordering` -> `false`

## v1.5.2 (2020-07-23)

#### :bug: Bug Fix

* eslint `capitalized-comments.ignorePattern` -> `#|tslint`

## v1.5.1 (2020-07-22)

#### :bug: Bug Fix

* tslint `object-literal-key-quotes` -> `false`

## v1.5.0 (2020-07-22)

#### :boom: Breaking Change

* tslint `strict-type-predicates` -> `false`

## v1.4.0 (2020-07-18)

#### :boom: Breaking Change

* `no-extra-parens` -> `off`
* `implicit-arrow-linebreak` -> `off`

## v1.3.2 (2020-07-16)

#### :bug: Bug Fix

* [Fix import of types from *.d.ts](https://github.com/V4Fire/Linters/pull/2)

## v1.3.0 (2020-07-10)

#### :rocket: New Feature

* `@typescript-eslint/require-array-sort-compare` -> `["error", {"ignoreStringArrays": true}]`

## v1.2.1 (2020-07-10)

#### :bug: Bug Fix

* Fixed the version of @typescript-eslint/eslint-plugin@3.5.0, @typescript-eslint/parser@3.5.0

## v1.2.0 (2020-07-10)

#### :rocket: New Feature

* Added overrides for `src/entries`

## v1.1.0 (2020-07-06)

#### :rocket: New Feature

* Added .stlintrc

## v1.0.0 (2020-07-06)

#### :rocket: New Feature

* Initial release
