import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../../sessions/session.service';
import {ToastController} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {
    subscriptions:Subscription[]=[];
    constructor(public toastController: ToastController) {
    }

    ngOnInit() {
    }

    async presentToast(msg:string) {
        await (await this.toastController.create({
            message: msg,
            duration: 2000
        })).present();
    }

    ngOnDestroy() {
        for (const s of  this.subscriptions) {
            s.unsubscribe();
        }
    }

}
