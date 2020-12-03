"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("./resolvers");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const post_entity_1 = require("./post/post.entity");
const user_entity_1 = require("./user/user.entity");
const reply_entity_1 = require("./reply/reply.entity");
const schema_1 = require("./schema");
const postApi_1 = __importDefault(require("./post/postApi"));
const typeorm_1 = require("typeorm");
const userApi_1 = __importDefault(require("./user/userApi"));
const replyApi_1 = __importDefault(require("./reply/replyApi"));
require("dotenv").config();
class GraphQlApp {
    constructor() {
        this.app = express_1.default();
        this.app.use(cors_1.default());
        this.connect();
    }
    connect() {
        const connect = async () => {
            await typeorm_1.createConnection({
                type: "mongodb",
                url: process.env.DB_CONNECTION,
                database: process.env.DB_NAME,
                entities: [post_entity_1.Post, user_entity_1.User, reply_entity_1.Reply],
                useUnifiedTopology: true,
            });
        };
        connect();
    }
    listen() {
        this.server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            dataSources: () => ({
                post: new postApi_1.default(),
                user: new userApi_1.default(),
                reply: new replyApi_1.default(),
            }),
        });
        let app = this.app;
        this.server.applyMiddleware({ app });
        this.app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`));
    }
}
exports.default = GraphQlApp;
//# sourceMappingURL=app.js.map