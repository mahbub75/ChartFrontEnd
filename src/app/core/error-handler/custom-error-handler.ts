import {AlertController} from '@ionic/angular';
import {ErrorHandler} from '@angular/core';


export class CustomErrorHandler implements ErrorHandler {
    constructor(private alertCtrl: AlertController) {

    }


    public handleError(error) {

    }
}

