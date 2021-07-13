import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FeedbackService } from '../app/services/feedback.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [FeedbackService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  })

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.nu).toBe(true);
  })

  it('close', () => {
    component.close();
    expect(component.closeGuideHeader).toBe(true);
  })

  it('onGuide', () => {
    // component.onGuide();
    expect(component.closeGuideHeader).toBe(false);
  })


});
