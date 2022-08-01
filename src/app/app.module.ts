import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WikiComponent } from './components/wiki/wiki.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { DailyChartComponent } from './components/daily-chart/daily-chart.component';
import { DataService } from './data.service';
import { MaterialMainModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    WikiComponent,
    ForecastComponent,
    DailyChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    FormsModule,
    MaterialMainModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  exports:[
    DailyChartComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
