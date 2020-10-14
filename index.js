const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const express = require("express");
let typeDefs = importSchema("./schema.graphql");
// 1
let posts = [
	{
		id: "post1",
		user: { id: "userId1", name: "UserName1" },
		content: "Post content 1",
	},
];

let idCount = posts.length;

const resolvers = {
	Query: {
		list: () => posts,
	},
	Mutation: {
		// 2
		createPost: (parent, args) => {
			const post = {
				id: `post-${idCount++}`,
				content: args.content,
				userId: args.userId,
			};
			posts.push(post);
			return post;
		},
	},
};

// 3
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
