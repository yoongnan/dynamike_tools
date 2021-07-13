import { Component, ElementRef } from '@angular/core';

import { CommonService } from "../app/services/common.service";
// import { FeedbackService } from '../app/services/feedback.service';
// import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mobile =true;
  isCollapsed =true;
  // introJS = introJs();
  title = 'pos-app';
  closeGuideHeader: boolean = false;
  nu: boolean = false;
  constructor(
    private elementRef: ElementRef,
    private common: CommonService,
    // private feedbackService: FeedbackService
  ) {

  }

  ngOnInit() {    
    if(window.screen.width>=600){
      this.mobile = false;
    }
    // this.introSetoptions();
    // this.feedbackService.showFeedback();
    // this.feedbackService.identifyUser('guest');

    // Number(this.common.getItem("tabNu"))==0?this.nu=false:this.nu=true;
    // switch(window.location.hash){      
    //   case '#/POS':{
    //     this.common.setItem("tabNu", 0);
    //     break;
    //   }
    //   case '#/SummaryReport':{
    //     this.common.setItem("tabNu", 1);
    //     break;
    //   }
    //   case '#/Product':{
    //     this.common.setItem("tabNu", 2);
    //     break;
    //   }
    //   case '#/ProductList':{
    //     this.common.setItem("tabNu", 3);
    //     break;
    //   }
    //   case '#/PurchaseList':{
    //     this.common.setItem("tabNu", 4);
    //     break;
    //   }
    //   case '#/Purchase':{
    //     this.common.setItem("tabNu", 5);
    //     break;
    //   }
    //   case '#/Account':{
    //     this.common.setItem("tabNu", 6);
    //     break;
    //   }
    //   case '#/AccountList':{
    //     this.common.setItem("tabNu", 6);
    //     break;
    //   }
    //   case '#/ProductAdd':{
    //     this.common.setItem("tabNu", 6);
    //     break;
    //   }
    //   default:{
    //     this.common.setItem("tabNu", 0);
    //   }
    // }

    if (window.location.hash.indexOf("Interoperability") > -1) {
      this.nu = false;
    } else {
      this.nu = true;
    }

    close();
  }

  // onGuide() {
  //   this.introJS.start();
  // }

  close() {
    this.closeGuideHeader = true;
    this.elementRef.nativeElement.querySelector('.contain-inter').style.height = "calc(100vh - 166px)";
    this.elementRef.nativeElement.querySelector('.selproduct-cond').style.height = "calc(100vh - 300px)";
  }

  // introSetoptions() {
  //   setTimeout(() => {
  //     this.introJS.setOptions({
  //       steps: [
  //         {
  //           element: this.elementRef.nativeElement.querySelector('#step1'),
  //           intro: "Check more than one products interoperability on x-axis.",
  //           position: 'bottom'
  //         },
  //         {
  //           element: this.elementRef.nativeElement.querySelector('#step2'),
  //           intro: " Click to customize columns in the matrix.",
  //           position: 'bottom'
  //         },
  //         {
  //           element: this.elementRef.nativeElement.querySelector('#step3'),
  //           // intro: "Check to hide columns/rows which has only one Interoperability (Compatible, Compatible: Not Tested, Incompatible, Not supported) status.",
  //           intro: "Click to hide columns/rows which has only one Interoperability (Compatible, Compatible: Not Tested, Incompatible, Not supported) status.",
  //           position: 'bottom'
  //         },
  //         {
  //           element: this.elementRef.nativeElement.querySelector('#step4'),
  //           // intro: "Check to hide releases that has past End of Technical Guidance date and End of General Support date.",
  //           intro: "Click to hide releases that has past End of Technical Guidance date and End of General Support date.",
  //           position: 'bottom'
  //         },
  //         {
  //           element: this.elementRef.nativeElement.querySelector('#step5'),
  //           intro: "Click to collapse or expand the matrix.",
  //           position: 'bottom'
  //         },
  //       ]
  //     });
  //   }, 100)
  // }

  isVisible = false;

}
