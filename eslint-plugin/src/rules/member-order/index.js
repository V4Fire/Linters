//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		type: 'suggestion',

		docs: {
			description: 'Enforces member ordering in classes',
			category: 'Stylistic Issues'
		}
	},

	create(context) {
		/**
		 * Determines is the provided member a handler
		 *
		 * @param member
		 * @returns {boolean}
		 */
		function isMemberHandler(member) {
			return member.key.name.startsWith('on');
		}

		/**
		 * Determines is the provided member protected
		 *
		 * @param member
		 * @returns {boolean}
		 */
		function isMemberProtected(member) {
			return member.accessibility === 'protected';
		}

		/**
		 * Validate member ordering in class.
		 * Handlers (started with on) should be in the end of class
		 *
		 * @param member
		 * @returns {boolean}
		 */
		function validateMembersOrder(node) {
			const
				members = node.body.body,
				wrongOrderedMembers = [];

			if (node.type !== 'MethodDefinition') {
				return;
			}

			let
				methodEncountered = false,
				protectedMethodEncountered = false;

			for (let i = members.length - 1; i >= 0; i--) {
				const member = members[i];

				if (isMemberHandler(member)) {
					if (isMemberProtected(member) && protectedMethodEncountered) {
						wrongOrderedMembers.push(member);
					} else if (methodEncountered) {
						wrongOrderedMembers.push(member);
					}

				} else if (isMemberProtected(member)) {
					protectedMethodEncountered = true;

				} else {
					methodEncountered = true;
				}
			}

			wrongOrderedMembers.forEach((wrongMember) => {
				context.report(
					{
						node: wrongMember,
						message: 'Move the handlers to the end of the class'
					}
				);
			});
		}

		return {
			ClassDeclaration(node) {
				validateMembersOrder(
					node
				);
			},
			ClassExpression(node) {
				validateMembersOrder(
					node
				);
			}
		};
	}
};
