import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {BaseComponent} from '../../core/component/BaseComponent/base.component';
import {Alert, MsgType} from '../../core/classes/alert';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent  extends BaseComponent  implements OnInit {
  changedPassword:string;
  password:string;
  @Input() correctPassword: string;


  constructor(toastController: ToastController, private modalCtrl:ModalController) {
    super(toastController);
  }

  ngOnInit() {}

  onChangePassword() {
    if(this.password!==this.correctPassword){
      return Alert.toast('رمز فعلی نامعتبر است',MsgType.negative)
    }
    this.modalCtrl.dismiss({
      changedPassword:this.changedPassword,
    });
  }

}
