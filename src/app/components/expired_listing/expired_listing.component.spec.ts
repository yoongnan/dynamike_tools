import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredListComponent } from './expired_listing.component';

describe('ExpiredListComponent', () => {
  let component: ExpiredListComponent;
  let fixture: ComponentFixture<ExpiredListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
