import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = 'http://api.weatherapi.com/v1/forecast.json?key=f4e4288d0f7842d2a8671324222107&q=Petrozavodsk&days=3&aqi=no&alerts=no';
   
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient) { }

  /** GET heroes from the server */
  getForecast(){
      return this.httpClient.get(this.url);
  }
}
