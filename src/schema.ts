import { gql } from "apollo-server-express";

export const typeDefs = gql(`
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
