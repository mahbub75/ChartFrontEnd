import {User} from './user';

export class Lesson {
    id: string;
    name: string;

    constructor(name?: string) {
        this.name = name;
    }
}
