import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import cors from "cors";
import express, { Application } from "express";
import { Post } from "./post/post.entity";
import { User } from "./user/user.entity";
import { Reply } from "./reply/reply.entity";
import { typeDefs } from "./schema";
import PostApi from "./post/postApi";
import { Connection, createConnection } from "typeorm";
import UserApi from "./user/userApi";
import ReplyApi from "./reply/replyApi";
import { MongoClient } from "mongodb";

require("dotenv").config();

class GraphQlApp {
	public server: ApolloServer;
	public app: Application;
	public connection: void | Connection;
	public client: MongoClient;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.connect();
	}

	public connect() {
		this.client = new MongoClient(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
		});

		this.client.connect();
		// const connect = async () => {
		// this.connection = await createConnection({
		// 		type: "mongodb",
		// 		url: process.env.DB_CONNECTION,
		// 		database: process.env.DB_NAME,
		// 		entities: [Post, User, Reply],
		// 		useNewUrlParser: true,
		// 		synchronize: true,
		// 		logging: true,
		// 	}).catch((er: any) => console.log("Error: ", er));
		// };
	}

	public listen() {
		this.server = new ApolloServer({
			typeDefs,
			resolvers,
			dataSources: () => ({
				post: new PostApi(
					this.client.db(process.env.DB_NAME).collection("post")
				),
				user: new UserApi(
					this.client.db(process.env.DB_NAME).collection("user")
				),
				reply: new ReplyApi(
					this.client.db(process.env.DB_NAME).collection("reply")
				),
			}),
		});
		let app = this.app;

		this.server.applyMiddleware({ app });

		this.app.listen({ port: 4000 }, () =>
			console.log(
				`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`
			)
		);
	}
}

export default GraphQlApp;
