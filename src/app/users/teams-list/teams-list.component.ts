import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {CoreRepository} from '../../core/core-repository';
import {tap} from 'rxjs/operators';
import {BaseComponent} from '../../core/component/BaseComponent/base.component';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Alert, MsgType} from '../../core/classes/alert';
import {EditTeamComponent} from './edit-team/edit-team.component';
import {User, UserRoll} from '../../core/model/user';

@Component({
    selector: 'app-teams-list',
    templateUrl: './teams-list.component.html',
    styleUrls: ['./teams-list.component.scss'],
    providers: [UsersService]
})
export class TeamsListComponent extends BaseComponent implements OnInit {
    newTeam = new User();
    currentAdmin = CoreRepository.user;
    currentLesson = this.currentAdmin.lesson;
    adminId = CoreRepository.userId;
    teamsList: User[] = [];

    constructor(toastController: ToastController, private router: Router, private alertController: AlertController,
                private usersService: UsersService, private modalController: ModalController) {
        super(toastController);
    }

    ngOnInit() {
        this.getTeamList();
    }

    goToGroupPage(teamId) {
        this.router.navigate(['sessions'], {queryParams: {userId: teamId}})

    }

    onCumulativeRegistration(selectedFile: File) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        this.subscriptions.push(this.usersService.cumulativeRegistration(formData).subscribe(() => {
            this.getTeamList();
            Alert.toast('فایل با موفقیت آپلود شد', MsgType.positive)
        }))
    }

    async onEditTeam(currentTeam: User) {
        const modal = await this.modalController.create({
            component: EditTeamComponent,
            cssClass: 'team-editor-modal',
            componentProps: {
                team: currentTeam,
            }
        });
        let editedTeam;
        await modal.present();
        await modal.onDidDismiss().then((data) => {
            editedTeam = (data.data) ? data.data.editedTeam : null;
        })

        if (editedTeam) {
            this.subscriptions.push(this.usersService.editUser(editedTeam).subscribe(() => {
                Alert.toast('کاربر با موفقیت ویرایش شد', MsgType.positive)
                this.getTeamList();
            }));
        }
    }

    getTeamList() {
        this.subscriptions.push(this.usersService.getTeamListByCenterIdAndLessonId(this.adminId, this.currentLesson.id)
            .subscribe(teamsList => {
                this.teamsList = teamsList;
            }))
    }

    onSaveNewTeam() {
        this.newTeam.centerId = this.adminId;
        this.newTeam.roll = UserRoll.TEAM;
        this.subscriptions.push(
            this.usersService.postNewTeam(this.newTeam, this.currentLesson.id).pipe(
                tap(() => this.getTeamList())
            ).subscribe(() => {
                this.newTeam = new User();
            })
        )

    }

    async onShowDeleteTeamByIdAlert(team: User) {
        const alert = await this.alertController.create({
            cssClass: 'ion-alert',
            message: ' گروه ' + team.name + ' حذف شود؟',
            buttons: [
                {
                    text: 'حذف',
                    handler: () => {
                        this.deleteTeamById(team);
                    }
                },
                {
                    text: 'بازگشت',
                    role: 'cancel',
                }
            ]
        });
        await alert.present();
    }

    deleteTeamById(team: User) {

        this.subscriptions.push(
            this.usersService.deleteTeam(team.id).pipe(
                tap(() => {
                    Alert.toast('گروه' + team.name + 'حذف شد', MsgType.positive)
                    this.getTeamList()
                })
            ).subscribe(() => {
            })
        )
    }
    async onShowDeleteAllTeamsAlert(){
        const alert = await this.alertController.create({
            cssClass: 'ion-alert',
            message:'همه ی تیم ها حذف شوند؟',
            buttons: [
                {
                    text: 'حذف',
                    handler: () => {
                        this.onDeleteAllTeams();
                    }
                },
                {
                    text: 'بازگشت',
                    role: 'cancel',
                    cssClass: 'cancel-button small-button',
                }
            ]
        });
        await alert.present();
}
    onDeleteAllTeams() {
        this.subscriptions.push(
            this.usersService.deleteAllTeams().subscribe(() => {
                this.getTeamList();
                Alert.toast('تیم ها با موفقیت حذف شدند', MsgType.positive);
            })
        );
    }
}
