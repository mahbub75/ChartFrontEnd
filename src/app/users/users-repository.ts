import {User} from '../core/model/user';
import {Injectable} from '@angular/core';
import {CoreRepository} from '../core/core-repository';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Team} from './teams-list/team';

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

    editTeam(team: Team) {
       const teamId = team.id;
       console.log(team);
        return this.put('user' + '/' + teamId, team);
    }

    getTeamListByCenterIdAndLessonId(adminId: string, lessonId: string): Observable<Team[]> {
        const params = new HttpParams({
            fromObject: {
                lesson_id: lessonId,
            }
        });
        return this.get('admin' + '/' + adminId + '/' + 'teams', params).pipe(
            map(res => res as Team[])
        )
    }

    deleteAllTeams() {
        return this.delete('delete-all-teams')
    }
}
