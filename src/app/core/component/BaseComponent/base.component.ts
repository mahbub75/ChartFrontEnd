import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../lessons/session/session.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

    constructor(private toastController: ToastController) {
    }

    ngOnInit() {
    }

    async presentToast(msg:string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

}
