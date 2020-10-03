import {Component, Input, OnInit, Output} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {BaseComponent} from '../../../core/component/BaseComponent/base.component';
import {User} from '../../../core/model/user';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent extends BaseComponent implements OnInit {
  @Input() team: User;


  constructor(toastController: ToastController, private modalCtrl:ModalController) {
super(toastController);
  }

  ngOnInit() {}

  onEdit() {
    this.modalCtrl.dismiss({
      editedTeam:this.team
    });
  }

}
