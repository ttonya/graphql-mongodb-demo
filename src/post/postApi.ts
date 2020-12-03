import { MongoDataSource } from "apollo-datasource-mongodb";
import { Post } from "./post.entity";

export default class PostApi extends MongoDataSource<Post> {
	public getPosts = async () => {
		console.log(await this.findManyByIds([]));
		return await this.findManyByIds([]);
	};
}
