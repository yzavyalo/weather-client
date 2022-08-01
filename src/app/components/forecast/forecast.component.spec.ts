import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from 'src/app/data.service';

import { ForecastComponent } from './forecast.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import * as mockData from '../../../assets/mock-data.json';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastComponent ],
      imports: [HttpClientTestingModule], 
      providers: [DataService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(DataService);
  });


  it('should update forecast', () => {

    const mockForecast = mockData;
    //const newTemperature = mockForecast.forecast.forecastday.find(day=> day.date === "2022-07-26").hour.map(hour =>hour.temp_c);

    const spy = spyOn(component, "updateData");
    component.updateData(mockForecast);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    //expect(component.chartsView[0].temperature).toEqual(newTemperature);
  });
});
