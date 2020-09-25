import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as HighCharts from 'highcharts';
import {ToastController} from '@ionic/angular';
import {BaseComponent} from '../BaseComponent/base.component';
import {FileModel} from '../../files/file-model';
import {ChartModel, Series} from '../../../sessions/current-session/chart-model';

@Component({
    selector: 'app-drawing-graph',
    templateUrl: './drawing-graph.component.html',
    styleUrls: ['./drawing-graph.component.scss'],
})
export class DrawingGraphComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() file: FileModel;
    channelsData:number[][][]=[];
    constructor(toastController: ToastController) {
        super(toastController);
    }


    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                const change = changes[propName];
                switch (propName) {
                    case 'file': {
                        if (change.currentValue&& change.isFirstChange()) {
                            this.file = change.currentValue;
                            for(const item of this.file.content.series){
                                this.channelsData.push(item.data);
                            }
                            this.drawGraph(this.file.content);
                        }
                        break
                    }

                    default : {
                        break
                    }

                }
            }
        }
    }


    ngOnInit() {
    }

    somethingChanged(sth?:boolean) {
        console.log(sth);
        setTimeout(() => {
           const newContent = this.file.content;
            for (const index in newContent.series){
                if(newContent.series[index] ) {
                    if(newContent.series[index].isChecked){
                        newContent.series[index].data = !newContent.series[index].isChecked?[]:newContent.series[index].data;
                        const sign = newContent.series[index].sign?-1:1;
                        const offSet = newContent.series[index].offSet?newContent.series[index].offSet:0;
                        const voltDiv = newContent.series[index].voltDiv?newContent.series[index].voltDiv:1;
                        newContent.series[index].data =
                            this.channelsData[index].map(data => [data[0], (sign * data[1] / voltDiv)+offSet]);
                    } else {
                        newContent.series[index].data = [];
                    }
                   }
            }
            this.drawGraph(newContent);
            }, 500);
    }

    drawGraph(fileContent: object) {
        setTimeout(() => {
            HighCharts.chart('container', fileContent, null);
        }, 1000);

    }


}
