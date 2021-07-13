import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListingComponent } from './clientlisting.component';

describe('ClientListingComponent', () => {
  let component: ClientListingComponent;
  let fixture: ComponentFixture<ClientListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
