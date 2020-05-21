import {Lesson} from './lesson';

export class Session {
    id: string;
    topic: string;
    lesson: Lesson;

    constructor(topic?: string, lesson?: Lesson) {
        this.topic = topic;
        this.lesson = lesson;

    }
}

