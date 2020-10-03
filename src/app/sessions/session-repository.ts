import {CoreRepository} from '../core/core-repository';
import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Session} from '../core/model/session';
import {FileModel} from '../core/files/file-model';

@Injectable({
    providedIn: 'root'
})
export class SessionRepository extends CoreRepository {
    // upload real file
    uploadFile(formData: FormData) {
        return this.post('uploadFiles', formData);
    }

    sessionList(userId: string): Observable<Session[]> {
        return this.get('team/' + userId + '/sessions').pipe(map(res => (res as Session[])))
    }


// get real file from local place of server
    getFile(name: string):Observable<FileModel> {
        const params = new HttpParams({
            fromObject: {
                fileName: name,
            }
        });
        return this.get('file', params).pipe(
            map(res=>res as FileModel)
        )
    }

// get file list including files properteis from DB
    getFiles(centerId: string): Observable<FileModel[]> {
        const params = new HttpParams({
            fromObject: {
                sessionId: centerId,
            }
        });
        return this.get('files', params).pipe(
            map(res => res as FileModel[])
        )
    }

    // download real file from local place of server into user's device
    downloadFile(filePath: string) {
        window.location.href = this.BASE_URL + 'downloadFile' + '/' + filePath;
    }

// delete real file from local place of server
    deleteFile(fileId:string ,filePath: string) {
        return this.delete('deleteFile' + '/' + fileId)
    }

    getSession(sessionId: string): Observable<Session> {
        return this.get('session' + '/' + sessionId).pipe(
            map(res => res as Session)
        );
    }
}
