import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';

import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  fontAwesomeIcon = {
    faTwitter,
    faFacebookF,
    faLinkedinIn,
    faYoutube,
  };
  nowtime:string;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    // this.feedbackService.showFeedback();
    // this.feedbackService.identifyUser('guest');
    this.nowtime = (new Date()).getFullYear().toString()
  }
}
