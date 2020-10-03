import {User} from '../core/model/user';
import {Injectable} from '@angular/core';
import {CoreRepository} from '../core/core-repository';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersRepository extends CoreRepository {
    postNewTeam(newTeam: User, lessonId: string) {
        const params = new HttpParams({
            fromObject: {
                lesson_id: lessonId,
            }
        });
        return this.post('team', newTeam, params);
    }

    cumulativeRegistration(formData: FormData) {
        return this.post('cumulative-registration', formData);
    }

    deleteTeam(teamId: string) {
        return this.delete('user' + '/' + teamId);
    }

    editUser(user: User) {
        return this.put('user', user);
    }

    getTeamListByCenterIdAndLessonId(adminId: string, lessonId: string): Observable<User[]> {
        const params = new HttpParams({
            fromObject: {
                lesson_id: lessonId,
            }
        });
        return this.get('admin' + '/' + adminId + '/' + 'teams', params).pipe(
            map(res => res as User[])
        )
    }

    deleteAllTeams() {
        return this.delete('delete-all-teams')
    }
    changePassword(changedPassword:string,userId:string){
        const params = new HttpParams({
            fromObject: {
                newPassword: changedPassword,
            }
        });
        return this.put('change-password' + '/' + userId,null,params);
    }
}
