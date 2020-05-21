import {User} from './user';

export class Lesson {
    id: string;
    name: string;
    teacher_info: string;
    path: string;
    user: User;

    constructor(name?: string, teacher_info?: string, path?: string, user?: User) {
        this.name = name;
        this.teacher_info = teacher_info;
        this.path = path;
    }
}
