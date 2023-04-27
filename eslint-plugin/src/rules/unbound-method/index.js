const {AST_NODE_TYPES} = require('@typescript-eslint/utils');
const tsutils = require('tsutils');
const ts = require('typescript');

const util = require('@typescript-eslint/eslint-plugin/dist/util');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const nativelyNotBoundMembers = new Set([
	'Promise.all',
	'Promise.race',
	'Promise.resolve',
	'Promise.reject',
	'Promise.allSettled',
	'Object.defineProperties',
	'Object.defineProperty',
	'Reflect.defineProperty',
	'Reflect.deleteProperty',
	'Reflect.get',
	'Reflect.getOwnPropertyDescriptor',
	'Reflect.getPrototypeOf',
	'Reflect.has',
	'Reflect.isExtensible',
	'Reflect.ownKeys',
	'Reflect.preventExtensions',
	'Reflect.set',
	'Reflect.setPrototypeOf'
]);

const SUPPORTED_GLOBALS = [
	'Number',
	'Object',
	'String',
	'RegExp',
	'Symbol',
	'Array',
	'Proxy',
	'Date',
	'Infinity',
	'Atomics',
	'Reflect',
	'console',
	'Math',
	'JSON',
	'Intl'
];

const nativelyBoundMembers = SUPPORTED_GLOBALS.map((namespace) => {
	if (!(namespace in globalThis)) {
		// Node.js might not have namespaces like Intl depending on compilation options
		// https://nodejs.org/api/intl.html#intl_options_for_building_node_js
		return [];
	}

	const object = globalThis[namespace];
	return Object.getOwnPropertyNames(object)
		.filter(
			(name) =>
				!name.startsWith('_') &&
				typeof (object)[name] === 'function'
		)
		.map((name) => `${namespace}.${name}`);
})
	.reduce((arr, names) => arr.concat(names), [])
	.filter((name) => !nativelyNotBoundMembers.has(name));

/**
 * Determines is symbol is not imported
 *
 * @param  symbol
 * @param currentSourceFile
 * @returns {boolean}
 */
const isNotImported = (
	symbol,
	currentSourceFile
) => {
	const {valueDeclaration} = symbol;
	if (!valueDeclaration) {
		// Working around https://github.com/microsoft/TypeScript/issues/31294
		return false;
	}

	return (
		Boolean(currentSourceFile) &&
		currentSourceFile !== valueDeclaration.getSourceFile()
	);
};

/**
 * Returns name of the node
 *
 * @param node
 * @returns {string}
 */
const getNodeName = (node) =>
	node.type === AST_NODE_TYPES.Identifier ? node.name : null;

/**
 * Returns full name of the member node (child node of class)
 *
 * @param node
 * @returns {string}
 */
const getMemberFullName = (node) =>
	`${getNodeName(node.object)}.${getNodeName(node.property)}`;

const BASE_MESSAGE =
	'Avoid referencing unbound methods which may cause unintentional scoping of `this`.';

module.exports = util.createRule({
	name: 'unbound-method',

	meta: {
		docs: {
			description:
				'Enforce unbound methods are called with their expected scope',
			recommended: 'error',
			requiresTypeChecking: true
		},
		messages: {
			unbound: BASE_MESSAGE,
			unboundWithoutThisAnnotation:
				`${BASE_MESSAGE
				}\n` +
				'If your function does not access `this`, you can annotate it with `this: void`, or consider using an arrow function instead.'
		},
		schema: [
			{
				type: 'object',
				properties: {
					ignoreStatic: {
						description:
							'Whether to skip checking whether `static` methods are correctly bound.',
						type: 'boolean'
					},
					ignore: {
						description:
							'Whether to skip checking whether prototype are ignored',
						type: 'array'
					}
				},
				additionalProperties: false
			}
		],
		type: 'problem'
	},

	defaultOptions: [
		{
			ignoreStatic: false,
			ignore: []
		}
	],

	create(context, [{ignoreStatic, ignore}]) {
		const parserServices = util.getParserServices(context);
		const checker = parserServices.program.getTypeChecker();
		const currentSourceFile = parserServices.program.getSourceFile(
			context.getFilename()
		);

		function checkMethodAndReport(
			node,
			symbol
		) {
			if (!symbol) {
				return;
			}

			const {dangerous, firstParamIsThis} = checkMethod(symbol, ignoreStatic);
			if (dangerous) {
				context.report({
					messageId:
						firstParamIsThis === false ?
							'unboundWithoutThisAnnotation' :
							'unbound',
					node
				});
			}
		}

		return {
			MemberExpression(node) {
				if (isSafeUse(node)) {
					return;
				}

				const objectSymbol = checker.getSymbolAtLocation(
					parserServices.esTreeNodeToTSNodeMap.get(node.object)
				);

				if (
					objectSymbol &&
					(nativelyBoundMembers.includes(getMemberFullName(node)) || ignore.includes(getNodeName(node.object))) &&
					isNotImported(objectSymbol, currentSourceFile)
				) {
					return;
				}

				const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);

				checkMethodAndReport(node, checker.getSymbolAtLocation(originalNode));
			},
			'VariableDeclarator, AssignmentExpression'(
				node
			) {
				const [idNode, initNode] =
					node.type === AST_NODE_TYPES.VariableDeclarator ?
						[node.id, node.init] :
						[node.left, node.right];

				if (initNode && idNode.type === AST_NODE_TYPES.ObjectPattern) {
					const tsNode = parserServices.esTreeNodeToTSNodeMap.get(initNode);
					const rightSymbol = checker.getSymbolAtLocation(tsNode);
					const initTypes = checker.getTypeAtLocation(tsNode);

					const notImported =
						rightSymbol && isNotImported(rightSymbol, currentSourceFile);

					idNode.properties.forEach((property) => {
						if (
							property.type === AST_NODE_TYPES.Property &&
							property.key.type === AST_NODE_TYPES.Identifier
						) {
							if (
								notImported &&
								util.isIdentifier(initNode) &&
								(
									nativelyBoundMembers.includes(`${initNode.name}.${property.key.name}`) ||
									ignore.includes(initNode.name)
								)
							) {
								return;
							}

							checkMethodAndReport(
								property.key,
								initTypes.getProperty(property.key.name)
							);
						}
					});
				}
			}
		};
	}
});

/**
 * Check method of class for unbound
 *
 * @param symbol
 * @param ignoreStatic
 * @returns {Object}
 */
function checkMethod(
	symbol,
	ignoreStatic
) {
	const {valueDeclaration} = symbol;
	if (!valueDeclaration) {
		// Working around https://github.com/microsoft/TypeScript/issues/31294
		return {dangerous: false};
	}

	// eslint-disable-next-line default-case
	switch (valueDeclaration.kind) {
		case ts.SyntaxKind.PropertyDeclaration:
			return {
				dangerous:
					valueDeclaration.initializer?.kind ===
					ts.SyntaxKind.FunctionExpression
			};
		case ts.SyntaxKind.MethodDeclaration:
		case ts.SyntaxKind.MethodSignature: {
			const decl = valueDeclaration;
			const firstParam = decl.parameters[0];
			const firstParamIsThis =
				firstParam?.name.kind === ts.SyntaxKind.Identifier &&
				firstParam?.name.escapedText === 'this';
			const thisArgIsVoid =
				firstParamIsThis &&
				firstParam?.type?.kind === ts.SyntaxKind.VoidKeyword;

			return {
				dangerous:
					!thisArgIsVoid &&
					!(
						ignoreStatic &&
						tsutils.hasModifier(
							util.getModifiers(valueDeclaration),
							ts.SyntaxKind.StaticKeyword
						)
					),
				firstParamIsThis
			};
		}
	}

	return {dangerous: false};
}

/**
 * Determines is unbound node safe to use
 *
 * @param node
 * @returns {boolean}
 */
function isSafeUse(node) {
	const {parent} = node;

	// eslint-disable-next-line default-case
	switch (parent?.type) {
		case AST_NODE_TYPES.IfStatement:
		case AST_NODE_TYPES.ForStatement:
		case AST_NODE_TYPES.MemberExpression:
		case AST_NODE_TYPES.SwitchStatement:
		case AST_NODE_TYPES.UpdateExpression:
		case AST_NODE_TYPES.WhileStatement:
			return true;

		case AST_NODE_TYPES.CallExpression:
			return parent.callee === node;

		case AST_NODE_TYPES.ConditionalExpression:
			return parent.test === node;

		case AST_NODE_TYPES.TaggedTemplateExpression:
			return parent.tag === node;

		case AST_NODE_TYPES.UnaryExpression:
			// The first case is safe for obvious
			// reasons. The second one is also fine
			// since we're returning something falsy
			return ['typeof', '!', 'void', 'delete'].includes(parent.operator);

		case AST_NODE_TYPES.BinaryExpression:
			return ['instanceof', '==', '!=', '===', '!=='].includes(parent.operator);

		case AST_NODE_TYPES.AssignmentExpression:
			return (
				parent.operator === '=' &&
				(node === parent.left ||
					(node.type === AST_NODE_TYPES.MemberExpression &&
						node.object.type === AST_NODE_TYPES.Super &&
						parent.left.type === AST_NODE_TYPES.MemberExpression &&
						parent.left.object.type === AST_NODE_TYPES.ThisExpression))
			);

		case AST_NODE_TYPES.ChainExpression:
		case AST_NODE_TYPES.TSNonNullExpression:
		case AST_NODE_TYPES.TSAsExpression:
		case AST_NODE_TYPES.TSTypeAssertion:
			return isSafeUse(parent);

		case AST_NODE_TYPES.LogicalExpression:
			if (parent.operator === '&&' && parent.left === node) {
				// This is safe, as && will return the left if and only if it's falsy
				return true;
			}

			// In all other cases, it's likely the logical expression will return the method ref
			// so make sure the parent is a safe usage
			return isSafeUse(parent);
	}

	return false;
}
