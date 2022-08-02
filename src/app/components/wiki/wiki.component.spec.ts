import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WikiComponent } from './wiki.component';
import * as mockData from '../../../assets/mock-data.json';

describe('WikiComponent', () => {
  let component: WikiComponent;
  let fixture: ComponentFixture<WikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WikiComponent],
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WikiComponent);
    component = fixture.componentInstance;
    const mockForecast = mockData;
    component.place = mockForecast.location.name;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(WeatherService);
  });

  it('should show City', () => {
    const header = fixture.nativeElement.querySelector('h2');
    expect(header.textContent).toContain('Petrozavodsk');
  });
});
