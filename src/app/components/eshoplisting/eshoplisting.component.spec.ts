import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EshopListingComponent } from './eshoplisting.component';

describe('EshopListingComponent', () => {
  let component: EshopListingComponent;
  let fixture: ComponentFixture<EshopListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EshopListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EshopListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
