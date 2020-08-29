import {Component, OnInit} from '@angular/core';
import {User} from '../../core/model/user';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.scss'],
    providers: [UsersService]
})
export class TeamsListComponent implements OnInit {
    currentTeamName: string;
    teamsList: User[] = [new User('team 1','12345678','mahbube khazaee-fatemeh obdoni',
        'mahbube-fatemehllllllllllllllll'),new User('team 2'),
        new User('team 3'),new User('team 4'),new User('team 5'),new User('team 6'),new User('team 7'),
        new User('team 12'),new User('team 20'),new User('team 6'),new User('team 7'),new User('team 8'),];
    subscription: Subscription[] = [];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
    }

    onAddNewTeam(teamName: string) {
        const newTeam = new User(teamName, '12345678');
        this.subscription.push(
            this.usersService.postNewTeam(newTeam).subscribe(() => {
                this.teamsList.push(newTeam);
                this.currentTeamName = undefined;

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
