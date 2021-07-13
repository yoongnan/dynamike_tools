import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTickComponent } from './stock_tick.component';

describe('StockTickComponent', () => {
  let component: StockTickComponent;
  let fixture: ComponentFixture<StockTickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
