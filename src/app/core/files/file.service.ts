import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SessionRepository} from '../../sessions/session-repository';
import {FileModel} from './file-model';


@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(private sessionRepository: SessionRepository) {
    }

    uploadFile(formData: FormData) {
        return this.sessionRepository.uploadFile(formData)
    }


    deleteFile(filePath:string,fileName: string) {
        return this.sessionRepository.deleteFile(filePath,fileName)
    }

    getFile(fileName: string):Observable<FileModel> {
        return this.sessionRepository.getFile(fileName);
    }

    downloadFile(fileName: string) {
        this.sessionRepository.downloadFile(fileName);
    }

    getFiles(sessionId: string): Observable<FileModel[]> {
        return this.sessionRepository.getFiles(sessionId)
    }
}
