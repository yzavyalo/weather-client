import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss'],
})
export class WikiComponent implements OnInit {
  constructor(private dataService: WeatherService) {}

  place = 'text';
  temperature: string;
  info = 'text';
  condition: string;
  conditionIcon: string;

  ngOnInit(): void {
    this.dataService.getForecast().subscribe((response) => {
      this.getCurrentWeather(response);
    });
  }

  getCurrentWeather(api) {
    this.place = api.location.name;
    this.temperature = `Current temperature: ${api.current.temp_c}`;
    this.condition = api.current.condition.text;
    this.conditionIcon = api.current.condition.icon;
    this.info = `${api.location.region}, ${api.location.country}`;
  }
}
