import { Component, OnInit } from '@angular/core';

import { CommonService } from "../../services/common.service";

import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-tabnav',
  templateUrl: './tabnav.component.html',
  styleUrls: ['./tabnav.component.scss']
})
export class TabnavComponent implements OnInit {

  navList: any[];
  Selected: number;
  constructor(
    private common: CommonService,
    private router: Router,
    private appcomponent: AppComponent
  ) { }

  ngOnInit(): void {
    // this.appcomponent.introSetoptions();
    this.Selected = this.common.getItem("tabNu") ? Number(this.common.getItem("tabNu")) : 0

    this.navList = [
      { "name": "Interoperability", "link": "/Interoperability" },
      { "name": "Solution/Database Interoperability", "link": "/Database" },
      { "name": "Upgrade Path", "link": "/Upgrade" }
    ]

    if (this.router.url.includes("/Interoperability")) {
      this.Selected = 0;
    } else if (this.router.url.includes("/Database")) {
      this.Selected = 1;
    } else if (this.router.url.includes("/Upgrade")) {
      this.Selected = 2;
    }
    this.common.setItem("tabNu", this.Selected);
  }

  change(n) {

    this.common.setItem("tabNu", n);
    let but: any = document.getElementById('walkMeId');
    if (n != 0) {

      but.disabled = true

    } else {

      but.disabled = false

    }
    switch (n) {
      case 0: {
        this.common.getItem("hashTab1") == undefined ? this.router.navigateByUrl('/') : window.location.hash = this.common.getItem("hashTab1");
        break;
      }
      case 1: {
        this.common.getItem("hashTab2") == undefined ? this.router.navigateByUrl(`/Database`) : window.location.hash = this.common.getItem("hashTab2");
        break;
      }
      case 2: {
        this.common.getItem("hashTab3") == undefined ? this.router.navigateByUrl(`/Upgrade`) : window.location.hash = this.common.getItem("hashTab3");
        break;
      }
    }

    return 0
  }



}
