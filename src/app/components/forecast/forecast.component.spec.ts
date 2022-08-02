import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from '../../services/weather.service';

import { ForecastComponent } from './forecast.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import * as mockData from '../../../assets/mock-data.json';
import { By } from '@angular/platform-browser';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecastComponent],
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(WeatherService);
  });

  it('should update forecast', () => {
    const mockForecast = mockData;

    const spy = spyOn(component, 'updateData');
    component.updateData(mockForecast);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('choose daily chart to view', () => {
    const newChip = {
      visible: false,
      title: 'Today',
      temperature: [1, 2, 3],
      humidity: [2, 3, 4],
      gust: [3, 4, 5],
    };
    fixture.debugElement
      .query(By.css('mat-chip'))
      .triggerEventHandler('click', newChip);
    fixture.detectChanges();
    const charts = component.chartsView.filter(
      (item) => item.title === newChip.title
    );
    charts.forEach((item) => {
      expect(item.visible).toBeFalsy();
    });
  });
});
