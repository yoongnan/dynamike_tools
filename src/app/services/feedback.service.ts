import { Injectable } from '@angular/core';
import { EnvironmentsService } from "./environment.service";


declare var common: any;
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  url: string;
  formName: string;


  constructor(private environmentsService: EnvironmentsService) {
    this.url = `${this.environmentsService.config.feedbackUrl}`;
    this.formName = `${this.environmentsService.config.feedbackFormName}`;
  }

  showFeedback(): void {
    common.feedback(this.url).init(this.formName, 'VMware SIM');
  }

  identifyUser(email: String): void {
    common.esp.identify(email);
  }
}
