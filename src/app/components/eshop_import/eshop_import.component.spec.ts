import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EshopImportComponent } from './eshop_import.component';

describe('EshopImportComponent', () => {
  let component: EshopImportComponent;
  let fixture: ComponentFixture<EshopImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EshopImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EshopImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
