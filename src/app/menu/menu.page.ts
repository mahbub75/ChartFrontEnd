import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController, ToastController} from '@ionic/angular';
import {MenuService} from './menu.service';
import {AuthorizationService} from '../core/service/authorization.service';
import {CoreRepository} from '../core/core-repository';
import {User, UserRoll} from '../core/model/user';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BaseComponent} from '../core/component/BaseComponent/base.component';
import {EditTeamComponent} from '../users/teams-list/edit-team/edit-team.component';
import {Alert, MsgType} from '../core/classes/alert';
import {ChangePasswordComponent} from '../users/change-password/change-password.component';
import {UsersService} from '../users/users.service';
import {environment} from '../../environments/environment-kntu';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
    providers: [MenuService, AuthorizationService]
})

export class MenuPage extends BaseComponent implements OnInit {
    user = CoreRepository.user;
    userRoll: UserRoll;
    toolbarImg = environment.toolbarImage;
    subscriptions: Subscription[] = [];

    constructor(toastController: ToastController, public authService: AuthorizationService,
                public coreRepository: CoreRepository, private modalController: ModalController, private usersService: UsersService) {
        super(toastController);
    }

    ngOnInit() {
        this.subscriptions.push(
            this.coreRepository.asyncUser
                .pipe(
                    filter(res => res != null),
                ).subscribe(list => {
                    this.getUser();
                }
            )
        );
    }

    async logOut() {
        await this.authService.logOut();
    }

    getUser() {
        this.user = CoreRepository.user;
    }

    async onChangePassword(user: User) {
        if (user) {
            const modal = await this.modalController.create({
                component: ChangePasswordComponent,
                cssClass: 'change-password-modal',
                componentProps: {
                    correctPassword: user.password,
                }
            });
            let changedPassword;
            await modal.present();
            await modal.onDidDismiss().then((data) => {
                changedPassword = (data.data) ? data.data.changedPassword : null;

            })
            if (changedPassword) {
                user.password = changedPassword;
                this.subscriptions.push(this.usersService.editUser(user).subscribe(async () => {
                    await Alert.toast('رمز عبور با موفقیت ویرایش شد', MsgType.positive);
                    await this.authService.logOut();
                }));
            }

        }

    }
}
