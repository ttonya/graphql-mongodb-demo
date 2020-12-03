import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Reply {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    text: string;

    @ObjectIdColumn()
    userId: ObjectId;

    @ObjectIdColumn()
    postId: ObjectId;

    constructor(reply: Partial<Reply>) {
        Object.assign(this, reply);
    }
}