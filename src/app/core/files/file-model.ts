import {ChartModel} from '../../sessions/current-session/chart-model';

export class FileModel {
    id: string;
    name: string;
    uniqueName: string;
    content:ChartModel;
    description:string

    constructor(name: string, uniqueName: string) {
        this.name = name;
        this.uniqueName = uniqueName
    }
}
