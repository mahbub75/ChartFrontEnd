import {Component, Input, OnInit, Output} from '@angular/core';
import {Team} from '../team';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  @Input() team: Team;


  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onEdit() {
    this.modalCtrl.dismiss({
      editedTeam:this.team
    });
  }

}
