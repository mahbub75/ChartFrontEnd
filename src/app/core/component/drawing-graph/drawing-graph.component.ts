import {Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
    selector: 'app-drawing-graph',
    templateUrl: './drawing-graph.component.html',
    styleUrls: ['./drawing-graph.component.scss'],
})
export class DrawingGraphComponent implements OnInit, OnChanges {
    @Input() fileContent: object;


    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                const change = changes[propName];
                switch (propName) {
                    case 'fileContent': {
                        if (change.currentValue) {
                            this.drawGraph(change.currentValue)
                        }
                    }
                }
            }
        }
    }


    ngOnInit() {
    }


    drawGraph(fileContent:object) {
        setTimeout(() => {
            HighCharts.chart('container', fileContent, null);
        }, 1000);

    }

}
