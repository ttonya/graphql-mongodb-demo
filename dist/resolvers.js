"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        posts: (_, __, { post }) => {
            return post.posts();
        },
    },
    Post: {
        _id: (post, __, ___) => {
            return post._id;
        },
        text: (post, __, ___) => {
            return post.text;
        },
        user: (_, __, { user }) => {
            return user.getUser(user.userId);
        },
        replies: (post, __, { reply }) => {
            return reply.getReplies().filter((rep) => rep.postId === post._id);
        },
    },
    User: {
        _id: (user, __, { reply }) => {
            return user._id;
        },
        name: (user, __, ___) => {
            return user.name;
        },
        email: (user, __, ___) => {
            return user.email;
        },
    },
    Reply: {
        _id: (reply, __, {}) => {
            return reply._id;
        },
        text: (reply, __, {}) => {
            return reply.text;
        },
        user: (reply, __, { user }) => {
            return user.getUser(reply.userId);
        },
    },
};
//# sourceMappingURL=resolvers.js.map