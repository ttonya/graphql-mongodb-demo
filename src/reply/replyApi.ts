import { MongoDataSource } from "apollo-datasource-mongodb";
import { Reply } from "./reply.entity";

export default class ReplyApi extends MongoDataSource<Reply> {
	public async getReplies() {
		return await this.findManyByIds([]);
	}
}
