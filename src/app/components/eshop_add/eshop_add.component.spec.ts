import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EshopAddComponent } from './eshop_add.component';

describe('EshopAddComponent', () => {
  let component: EshopAddComponent;
  let fixture: ComponentFixture<EshopAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EshopAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EshopAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
