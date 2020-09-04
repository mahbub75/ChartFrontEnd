import {Lesson} from './lesson';

export class User {
    id:string;
    name:string;
    roll:string;
    lesson:Lesson;
    constructor(name?:string,roll?:string,lesson?:Lesson) {
        this.name=name;
        this.roll=roll;
        this.lesson=lesson
    }

}
export const enum UserRoll{
    ADMIN='admin',
    TEAM='team'
}
