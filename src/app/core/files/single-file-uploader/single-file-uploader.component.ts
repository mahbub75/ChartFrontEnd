import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../../component/BaseComponent/base.component';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-single-file-uploader',
  templateUrl: './single-file-uploader.component.html',
  styleUrls: ['./single-file-uploader.component.scss'],
})
export class SingleFileUploaderComponent extends BaseComponent implements OnInit {
@Input() textButton='افزودن فایل'
  @Output() selectedFile = new EventEmitter<File>() ;
  subscriptions: Subscription[] = [];

  constructor(toastController: ToastController) {
    super(toastController);
  }

  ngOnInit() {
  }


  selectFile(fileLoader) {
    fileLoader.click();
    fileLoader.onchange = () => {
      const selectedFile = fileLoader.files[0];
     this.selectedFile.emit(selectedFile);

    }
  }

}
