export let resolvers = {
	Query: {
		posts: async (_: any, __: any, { dataSources: { post } }: any) => {
			return await post.collection.find().toArray();
		},
	},

	Post: {
		_id: (post: any, args: any, ___: any) => {
			return post._id;
		},
		text: (post: any, __: any, ___: any) => {
			return post.text;
		},
		user: async (post: any, __: any, { dataSources: { user } }: any) => {
			return await user.getUser(post.userId);
		},
		replies: async (post: any, __: any, { dataSources: { reply } }: any) => {
			let res = await reply.collection.find().toArray();
			res = res.filter((rep: any) => rep.postId.equals(post._id));
			return res;
		},
	},

	User: {
		_id: (user: any, __: any, { reply }: any) => {
			return user._id;
		},
		name: (user: any, __: any, ___: any) => {
			return user.name;
		},
		email: (user: any, __: any, ___: any) => {
			return user.email;
		},
	},

	Reply: {
		_id: (reply: any, __: any, {}: any) => {
			return reply._id;
		},
		text: (reply: any, __: any, {}: any) => {
			return reply.text;
		},
		user: async (reply: any, __: any, { dataSources: { user } }: any) => {
			return await user.getUser(reply.userId);
		},
	},
};
