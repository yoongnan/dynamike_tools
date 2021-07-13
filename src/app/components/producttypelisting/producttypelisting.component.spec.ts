import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeListingComponent } from './producttypelisting.component';

describe('ProductTypeListingComponent', () => {
  let component: ProductTypeListingComponent;
  let fixture: ComponentFixture<ProductTypeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
