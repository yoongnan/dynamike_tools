import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCheckListComponent } from './stock_check.component';

describe('StockCheckListComponent', () => {
  let component: StockCheckListComponent;
  let fixture: ComponentFixture<StockCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
