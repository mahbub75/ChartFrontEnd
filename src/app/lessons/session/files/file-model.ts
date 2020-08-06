export class FileModel {
    id: string;
    name: string;
    uniqueName: string

    constructor(name:string, uniqueName: string) {
        this.name = name;
        this.uniqueName = uniqueName
    }
}
