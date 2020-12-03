import { MongoDataSource } from "apollo-datasource-mongodb";
import { User } from "./user.entity";

export default class UserApi extends MongoDataSource<User> {
	public async getUser(id: string) {
		return await this.findOneById(id);
	}
}
