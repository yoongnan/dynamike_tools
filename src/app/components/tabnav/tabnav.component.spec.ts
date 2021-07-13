import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabnavComponent } from './tabnav.component';
import { CommonService } from "../../services/common.service";

import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

describe('TabnavComponent', () => {
  let component: TabnavComponent;
  let fixture: ComponentFixture<TabnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabnavComponent, AppComponent],
      providers: [CommonService, Router]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.navList.length).not.toBe(0);
  })

  it('change', () => {
    let c = component.change(0);
    expect(c).toBe(0);
  })

  it('change', () => {
    let c = component.change(1);
    expect(c).toBe(0);
  })

  it('change', () => {
    let c = component.change(2);
    expect(c).toBe(0);
  })
});
