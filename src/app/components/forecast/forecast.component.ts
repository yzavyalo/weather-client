import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

interface ChartView {
  visible: boolean;
  title: string;
  temperature: Array<number>;
  humidity: Array<number>;
  gust: Array<number>;
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  chartsView: ChartView[] = [
    {
      visible: true,
      title: 'Today',
      temperature: [],
      humidity: [],
      gust: [],
    },
    {
      visible: true,
      title: 'Tomorrow',
      temperature: [],
      humidity: [],
      gust: [],
    },
    {
      visible: true,
      title: 'Two days later',
      temperature: [],
      humidity: [],
      gust:[],
    },
  ];

  isSummary: boolean = false;
  summaryTemperature:Array<number>;
  summaryHumidity:Array<number>;
  summaryGust:Array<number>;

  constructor(private dataService: WeatherService) {}

  ngOnInit(): void {
    this.dataService.getForecast().subscribe((response) => {
      this.updateData(response);
    });
  }

  updateData(api) {
    const date = new Date();
    this.chartsView = this.chartsView.map((chart, index) => {
      const chartDate = new Date(date.setDate(date.getDate() + index / 2 + 0.5))
        .toISOString()
        .slice(0, 10);
      return {
        ...chart,
        temperature: api.forecast.forecastday
          .find((day) => day.date === chartDate)
          .hour.map((hour) => hour.temp_c),
        humidity: api.forecast.forecastday
          .find((day) => day.date === chartDate)
          .hour.map((hour) => hour.humidity),
        gust: api.forecast.forecastday
          .find((day) => day.date === chartDate)
          .hour.map((hour) => hour.gust_mph),
      };
    });
  }

  showSummary(){
    this.isSummary = !this.isSummary;
    this.summaryTemperature = this.chartsView.reduce((previousValue, currentValue) => previousValue.concat(currentValue.temperature),[])
    this.summaryHumidity = this.chartsView.reduce((previousValue, currentValue) => previousValue.concat(currentValue.humidity),[])
    this.summaryGust = this.chartsView.reduce((previousValue, currentValue) => previousValue.concat(currentValue.gust),[])
  }

  chipSelected(changedChip: ChartView) {
    this.chartsView = this.chartsView.map((chip) =>
      chip.title === changedChip.title
        ? { ...chip, visible: !changedChip.visible }
        : chip
    );
  }
}
