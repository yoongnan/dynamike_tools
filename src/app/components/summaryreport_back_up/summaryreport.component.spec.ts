import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryReportBackupComponent } from './summaryreport.component';

describe('SummaryReportComponent', () => {
  let component: SummaryReportBackupComponent;
  let fixture: ComponentFixture<SummaryReportBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryReportBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryReportBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
