export interface Legend {
    align: string,
    backgroundColor: string,
    borderWidth: string,
    floating: boolean,
    layout: string,
    verticalAlign: string,
    x: string,
    y: string
}

export interface States {
    hover: { enabled: boolean, lineColor: string }
}

export interface Scatter {
    marker: { radius: string, states: States },
    tooltip: { headerFormat: string, pointFormat: string }
}

export class Series {
    color: string;
    data: number[][];
    name: string;
    type: string;
    dashStyle: string;
    offSet :number;
    voltDiv :number;
    sign :boolean;
    isChecked :boolean;
}

export interface XAxis {
    startOnTick: boolean,
    endOnTick: boolean,
    showLastLabel: boolean,
    title: { text: string }
}

export interface ChartModel {
    chart: { type: string, zoomType: string },
    legend: Legend,
    plotOptions: { scatter: Scatter },
    series: Series[],
    title: { text: string },
    subtitle: { text: string },
    xAxis: XAxis,
    yAxis: { title: { text: string } }


}
