import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { CommonService } from "../../services/common.service";

import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent, AppComponent],
      providers: [CommonService, Router]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
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

  it('click', () => {
    let c = component.click(0);
    expect(c).toBe(0);
  })

  it('click', () => {
    let c = component.click(1);
    expect(c).toBe(0);
  })

  it('click', () => {
    let c = component.click(2);
    expect(c).toBe(0);
  })
});
