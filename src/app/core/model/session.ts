import {Lesson} from './lesson';
import {FileModel} from '../../lessons/session/files/file-model';

export class Session {
    id: string;
    centerId:string;
    topic: string;
    files: FileModel[];
    lesson:Lesson;

    constructor(topic?: string, centerId?:string, files?: FileModel[], lesson?:Lesson) {
        this.topic = topic;
        this.files = files;
        this.centerId=centerId;
        this.lesson = lesson;
    }
}

