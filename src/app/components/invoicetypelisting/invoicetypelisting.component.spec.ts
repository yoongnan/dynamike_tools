import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeListingComponent } from './invoicetypelisting.component';

describe('InvoiceTypeListingComponent', () => {
  let component: InvoiceTypeListingComponent;
  let fixture: ComponentFixture<InvoiceTypeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTypeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
