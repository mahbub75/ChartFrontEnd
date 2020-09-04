import {Component, OnInit} from '@angular/core';
import {User, UserRoll} from '../../core/model/user';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs';
import {Team} from './team';
import {CoreRepository} from '../../core/core-repository';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.scss'],
    providers: [UsersService]
})
export class TeamsListComponent implements OnInit {
    newTeam = new Team();
    currentAdmin = CoreRepository.user;
    currentLesson = this.currentAdmin.lesson;
    adminId = CoreRepository.userId;
    teamsList: Team[] = [];
    subscription: Subscription[] = [];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getTeamList();
    }

    getTeamList() {
        this.subscription.push(this.usersService.getTeamListByCenterIdAndLessonId(this.adminId, this.currentLesson.id)
            .subscribe(teamsList => {
                this.teamsList = teamsList;
            }))
    }

    onSaveNewTeam() {
        this.newTeam.centerId = this.adminId;
        this.subscription.push(
            this.usersService.postNewTeam(this.newTeam, this.currentLesson.id)
                .subscribe(() => {
                    this.getTeamList();
                    this.newTeam = new Team();
                })
        )

    }

    deleteTeam(teamId: string) {
        this.subscription.push(
            this.usersService.deleteTeam(teamId).subscribe(() => {

            })
        )

    }

}
