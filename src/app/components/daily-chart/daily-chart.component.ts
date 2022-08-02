import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

interface SelectOption {
  value: string;
  viewValue: string;
}

interface ChipOption {
  title: string;
  enabled: boolean;
}

interface ChartView {
  selectOptions: SelectOption[];
  chipOptions: ChipOption[];
}

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss']
})

export class DailyChartComponent implements OnInit, OnChanges {

  @Input() temperature!: number[];
  @Input() humidity!: number[];
  @Input() gust!: number[];
  @Input() title!: string;
  @Input() isSummary: boolean;

  selectedView:
    | Highcharts.SeriesLineOptions
    | Highcharts.SeriesBarOptions
    | Highcharts.SeriesAreaOptions = {
    type: 'line',
  };

  views: ChartView = {
    selectOptions: [
      { value: 'line', viewValue: 'Line' },
      { value: 'area', viewValue: 'Filled line' },
      { value: 'bar', viewValue: 'Bar' },
    ],
    chipOptions: [
      {
        title: 'Temperature',
        enabled: true,
      },
      {
        title: 'Humidity',
        enabled: false,
      },
      {
        title: 'Gust',
        enabled: false,
      },
    ],
  };

  chart;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'

  chartOptions: Highcharts.Options = {
    title: {
      text: "",
      verticalAlign: 'top',
      align: 'center'
    },
    yAxis: {
      title: {
        text: ''
      },
      accessibility: {
        description: 'Level of value'
      }
    },
  
    xAxis: {
      title: {
        text: 'Time'
      },
      accessibility: {
        description: 'Time from 00:00 to 23:00'
      },
      categories: ['00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00',
      '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00',
      '20:00','21:00','22:00','23:00']
    },
    series: [],
  };
  chartCallback: Highcharts.ChartCallbackFunction; // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean

  constructor() {
    const self = this;

    this.chartCallback = chart => {
      self.chart = chart;
    };
  }

  ngOnInit(): void {
    this.updateComponent();
    setTimeout(() => {
      this.updateFlag = true;
      this.chart.hideLoading()
    }, 2000);
  }
  
  ngOnChanges() {
    this.updateComponent()
  }
  
  updateComponent(){
   
   const xAxis: Highcharts.XAxisOptions = 
   {
      title: {
        text: 'Time'
      },
      accessibility: {
        description: this.isSummary ? 'Time for next tree days': 'Time from 00:00 to 23:00'
      },
      categories: this.isSummary ? ['00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00',
      '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00',
      '20:00','21:00','22:00','23:00','00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00',
      '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00',
      '20:00','21:00','22:00','23:00','00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00',
      '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00',
      '20:00','21:00','22:00','23:00'] : ['00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00',
      '10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00',
      '20:00','21:00','22:00','23:00']
    }

    this.chartOptions.xAxis = xAxis;

    this.chartOptions.title.text = this.title;
    this.chartOptions.series = this.views.chipOptions.map((chip) => {
      let dataset: any = [];
      switch (chip.title) {
        case 'Temperature':
          dataset = this.temperature;
          break;
        case 'Humidity':
          dataset = this.humidity;
          break;
        case 'Gust':
          dataset = this.gust;
          break;
      }
      return {
        data: dataset,
        name: chip.title,
        type: this.selectedView.type,
        visible: chip.enabled,
      }
    });

    this.updateFlag = true;
  }

  selectChange(newChartView: any): void {
    this.selectedView.type = newChartView;
    this.chartOptions.series.forEach(
      (series) => (series.type = this.selectedView.type)
    );
    this.updateFlag = true;
  }

  toggleChange(toggleStatus: string){
    this.chartOptions.series.forEach(
      (series) => (series.type =  toggleStatus ? 'area' : 'line')
    );
    this.updateFlag = true;
  }

  chipSelected(changedChip:ChipOption): void {
    const enableStatus = !changedChip.enabled;

    this.views.chipOptions = this.views.chipOptions.map((chip) =>
      chip.title === changedChip.title
        ? { ...chip, enabled: enableStatus }
        : chip
    );
    this.chartOptions.series = this.chartOptions.series.map((item) =>
      item.name === changedChip.title
        ? { ...item, visible: enableStatus }
        : { ...item }
    );

    this.updateFlag = true;
  }
}
