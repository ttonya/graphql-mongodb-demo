import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Post {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    text: string;

    @ObjectIdColumn()
    userId: ObjectId;

    constructor(post: Partial<Post>) {
        Object.assign(this, post);
    }
}
