import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsPriceListComponent } from './goods_price_listing.component';

describe('GoodsPriceListComponent', () => {
  let component: GoodsPriceListComponent;
  let fixture: ComponentFixture<GoodsPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
