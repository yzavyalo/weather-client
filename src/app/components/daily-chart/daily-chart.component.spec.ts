import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DailyChartComponent } from './daily-chart.component';

describe('DailyChartComponent', () => {
  let component: DailyChartComponent;
  let fixture: ComponentFixture<DailyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyChartComponent],
      schemas:[NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyChartComponent);
    component = fixture.componentInstance;

    component.temperature = [1, 2, 3];
    component.humidity = [2, 3, 4];
    component.gust = [3, 4, 5];
    component.title = 'Test title';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('select filled line option change', () => {
    fixture.debugElement.query(By.css('mat-slide-toggle')).triggerEventHandler('change',{ checked: true});
    fixture.detectChanges();
    component.chartOptions.series.forEach((item) => {
      expect(item.type).toBe("area");
    });
  });

  it('select type of chart', () => {
    fixture.debugElement.query(By.css('mat-select')).triggerEventHandler('selectionChange',{ value: "bar"});
    fixture.detectChanges();
    expect(component.selectedView.type).toBe("bar");
  });


  it('choose measurement to view', () => {
    const newChip = {
      title: "Temperature",
      enabled: false
    }
    fixture.debugElement.query(By.css('mat-checkbox')).triggerEventHandler('change', newChip);
    fixture.detectChanges();
    const lines = component.chartOptions.series.filter((item) => item.name === newChip.title );
    lines.forEach(item => {
      expect(item.visible).toBeFalsy();
    });
  });

});
