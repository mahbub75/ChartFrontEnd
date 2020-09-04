import {User} from './user';

export class Session {
    id: string;
    user:User;
    topic: string;

    constructor(topic?: string, user?:User) {
        this.topic = topic;
        this.user=user;
    }
}

