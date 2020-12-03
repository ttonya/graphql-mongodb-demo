"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql(`
type Query {
	posts: [Post]
}

type Post {
	_id: ID
	user: User
	text: String
	replies: [Reply]
}

type Reply{
	_id: ID
	text: String
	user: User
}

type User {
	_id: ID
	name: String
	email: String
}
`);
//# sourceMappingURL=schema.js.map