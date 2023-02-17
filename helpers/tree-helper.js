export const defaultImportSpecifier = (name) => ({
	type: "ImportDefaultSpecifier",
	start: 197,
	end: 204,
	local: {
		type: "Identifier",
		start: 197,
		end: 204,
		name: name,
		loc: {
			start: {
				line: 7,
				column: 7,
			},
			end: {
				line: 7,
				column: 14,
			},
		},
		range: [197, 204],
	},
	loc: {
		start: {
			line: 7,
			column: 7,
		},
		end: {
			line: 7,
			column: 14,
		},
	},
	range: [197, 204],
})

export const namedImportSpecifier = (name, alias) => ({
	type: "ImportSpecifier",
	start: 248,
	end: 258,
	imported: {
		type: "Identifier",
		start: 326,
		end: 326,
		name: name,
		loc: {
			start: {
				line: 11,
				column: 27,
			},
			end: {
				line: 11,
				column: 27,
			},
		},
		range: [326, 326],
	},
	local: {
		type: "Identifier",
		start: 326,
		end: 326,
		name: alias ?? name,
		loc: {
			start: {
				line: 11,
				column: 27,
			},
			end: {
				line: 11,
				column: 27,
			},
		},
		range: [326, 326],
	},
	loc: {
		start: {
			line: 8,
			column: 2,
		},
		end: {
			line: 8,
			column: 12,
		},
	},
	range: [248, 258],
})

export const importStatement = (path, specifiers) => ({
	type: "mdxjsEsm",
	position: {
		start: { line: 2, column: 1, offset: 1 },
		end: { line: 2, column: 105, offset: 105 },
	},
	data: {
		estree: {
			type: "Program",
			start: 1,
			end: 105,
			body: [
				{
					type: "ImportDeclaration",
					start: 1,
					end: 105,
					specifiers: specifiers,
					source: {
						type: "Literal",
						start: 36,
						end: 104,
						value: path,
						raw: `"${path}"`,
						loc: {
							start: { line: 2, column: 35, offset: 36 },
							end: { line: 2, column: 103, offset: 104 },
						},
						range: [36, 104],
					},
					loc: {
						start: { line: 2, column: 0, offset: 1 },
						end: { line: 2, column: 104, offset: 105 },
					},
					range: [1, 105],
				},
			],
			sourceType: "module",
			comments: [],
			loc: {
				start: { line: 2, column: 0, offset: 1 },
				end: { line: 2, column: 104, offset: 105 },
			},
			range: [1, 105],
		},
	},
})