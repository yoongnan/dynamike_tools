import { Component, OnInit } from '@angular/core';

import { CommonService } from "../../services/common.service";

import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  
  isCollapsed =true;
  navList: any[];
  Selected: number;
  constructor(
    private common: CommonService,
    private router: Router,
    private appcomponent: AppComponent
  ) { }

  ngOnInit(): void {
  //   this.appcomponent.introSetoptions();
    this.Selected = this.common.getItem("tabNu") ? Number(this.common.getItem("tabNu")) : 0

    this.navList = [
      { "name": "POS", "link": "/POS" },
      // { "name": "End Of Day Report", "link": "/EndOfDay" },
      { "name": "Summary Report", "link": "/SummaryReport" },
      { "name": "货品 Detail", "link": "/Product" },
      { "name": "货品单 Listing", "link": "/ProductList" },
      { "name": "进账 Detail", "link": "/Purchase" },
      { "name": "进账记录 Listing", "link": "/PurchaseList" },
      { "name": "网店 Detail", "link": "/Eshop" },
      { "name": "网店单 Listing", "link": "/EshopList" },
      { "name": "Account 转账", "link": "/Account" },
      { "name": "Account 转账记录", "link": "/AccountList" },
      { "name": "加货品 Add", "link": "/ProductAdd" },
      { "name": "网店 Add", "link": "/EshopAdd" },
      { "name": "进账 Add", "link": "/PurchaseAdd" },
      { "name": "网店导入 Import", "link": "/EshopImport" },
      { "name": "Supplier 供应商", "link": "/SupplierListing" },
      { "name": "Client 客人", "link": "/ClientListing" },
      { "name": "Product Type / 货品种类", "link": "/ProductTypeListing" },
      { "name": "Invoice Type / 单类", "link": "/InvoiceTypeListing" },
      { "name": "Check Stock / 查货", "link": "/StockCheck" },
      { "name": "Stock Tick / 点货", "link": "/StockTick" },
      { "name": "CashFlow 现金流动", "link": "/CashFlow" },
      { "name": "Expired 货品过期", "link": "/Expired" },
      { "name": "Goods Price 货品本钱记录", "link": "/GoodsPrice" },
      { "name": "Old Summary Report", "link": "/SummaryBackup" },
      { "name": "Stock Check Listing", "link": "/StockCheckListing" },
      
    ]

    if (this.router.url.includes("/POS")) {
      this.Selected = 0;
    } else if (this.router.url.includes("/SummaryReport")) {
      this.Selected = 1;
    } else if (this.router.url.includes("/Product")) {
      this.Selected = 2;
    } else if (this.router.url.includes("/ProductList")) {
      this.Selected = 3;
    } else if (this.router.url.includes("/Purchase")) {
      this.Selected = 4;
    } else if (this.router.url.includes("/PurchaseList")) {
      this.Selected = 5;
    } else if (this.router.url.includes("/Eshop")) {
      this.Selected = 6;
    } else if (this.router.url.includes("/EshopList")) {
      this.Selected = 7;
    } else if (this.router.url.includes("/Account")) {
      this.Selected = 8;
    } else if (this.router.url.includes("/AccountList")) {
      this.Selected = 9;
    } else if (this.router.url.includes("/ProductAdd")) {
      this.Selected = 10;
    } else if (this.router.url.includes("/EshopAdd")) {
      this.Selected = 11;
    } else if (this.router.url.includes("/PurchaseAdd")) {
      this.Selected = 12;
    } else if (this.router.url.includes("/EshopImport")) {
      this.Selected = 13;
    } else if (this.router.url.includes("/SupplierListing")) {
      this.Selected = 14;
    } else if (this.router.url.includes("/ClientListing")) {
      this.Selected = 15;
    } else if (this.router.url.includes("/ProductTypeListing")) {
      this.Selected = 16;
    } else if (this.router.url.includes("/InvoiceTypeListing")) {
      this.Selected = 17;
    } else if (this.router.url.includes("/StockCheck")) {
      this.Selected = 18;
    }  else if (this.router.url.includes("/StockTick")) {
      this.Selected = 19;
    }  else if (this.router.url.includes("/CashFlow")) {
      this.Selected = 20;
    }  else if (this.router.url.includes("/Expried")) {
      this.Selected = 21;
    }  else if (this.router.url.includes("/GoodsPrice")) {
      this.Selected = 22;
    }  else if (this.router.url.includes("/SummaryBackup")) {
      this.Selected = 23;
    }  else if (this.router.url.includes("/StockCheckListing")) {
      this.Selected = 24;
    }  
    this.common.setItem("tabNu", this.Selected);
  }

  click(n) {
    this.common.setItem("tabNu", n);
    // let but: any = document.getElementById('walkMeId');
    // if (n != 0) {

    //   but.disabled = true

    // } else {

    //   but.disabled = false

    // }
    switch (n) {
      case 0: {
        this.common.getItem("hashTab1") == undefined ? this.router.navigateByUrl('/') : window.location.hash = this.common.getItem("hashTab1");
        break;
      }
      case 1: {
        this.common.getItem("hashTab2") == undefined ? this.router.navigateByUrl(`/SummaryReport`) : window.location.hash = this.common.getItem("hashTab2");
        break;
      }
      case 2: {
        this.common.getItem("hashTab3") == undefined ? this.router.navigateByUrl(`/Product`) : window.location.hash = this.common.getItem("hashTab3");
        break;
      }
      case 3: {
        this.common.getItem("hashTab4") == undefined ? this.router.navigateByUrl(`/ProductList`) : window.location.hash = this.common.getItem("hashTab4");
        break;
      }
      case 4: {
        this.common.getItem("hashTab5") == undefined ? this.router.navigateByUrl(`/Purchase`) : window.location.hash = this.common.getItem("hashTab5");
        break;
      }
      case 5: {
        this.common.getItem("hashTab6") == undefined ? this.router.navigateByUrl(`/PurchaseList`) : window.location.hash = this.common.getItem("hashTab6");
        break;
      }
      case 6: {
        this.common.getItem("hashTab7") == undefined ? this.router.navigateByUrl(`/Eshop`) : window.location.hash = this.common.getItem("hashTab7");
        break;
      }
      case 7: {
        this.common.getItem("hashTab8") == undefined ? this.router.navigateByUrl(`/EshopList`) : window.location.hash = this.common.getItem("hashTab8");
        break;
      }
      case 8: {
        this.common.getItem("hashTab9") == undefined ? this.router.navigateByUrl(`/Account`) : window.location.hash = this.common.getItem("hashTab9");
        break;
      }
      case 9: {
        this.common.getItem("hashTab10") == undefined ? this.router.navigateByUrl(`/AccountList`) : window.location.hash = this.common.getItem("hashTab10");
        break;
      }
      case 10: {
        this.common.getItem("hashTab11") == undefined ? this.router.navigateByUrl(`/ProductAdd`) : window.location.hash = this.common.getItem("hashTab11");
        break;
      }
      case 11: {
        this.common.getItem("hashTab12") == undefined ? this.router.navigateByUrl(`/EshopAdd`) : window.location.hash = this.common.getItem("hashTab12");
        break;
      }
      case 12: {
        this.common.getItem("hashTab13") == undefined ? this.router.navigateByUrl(`/PurchaseAdd`) : window.location.hash = this.common.getItem("hashTab13");
        break;
      }
      case 13: {
        this.common.getItem("hashTab14") == undefined ? this.router.navigateByUrl(`/EshopImport`) : window.location.hash = this.common.getItem("hashTab14");
        break;
      }
      case 14: {
        this.common.getItem("hashTab15") == undefined ? this.router.navigateByUrl(`/SupplierListing`) : window.location.hash = this.common.getItem("hashTab15");
        break;
      }
      case 15: {
        this.common.getItem("hashTab16") == undefined ? this.router.navigateByUrl(`/ClientListing`) : window.location.hash = this.common.getItem("hashTab16");
        break;
      }
      case 16: {
        this.common.getItem("hashTab17") == undefined ? this.router.navigateByUrl(`/ProductTypeListing`) : window.location.hash = this.common.getItem("hashTab17");
        break;
      }
      case 17: {
        this.common.getItem("hashTab18") == undefined ? this.router.navigateByUrl(`/InvoiceTypeListing`) : window.location.hash = this.common.getItem("hashTab18");
        break;
      }
      case 18: {
        this.common.getItem("hashTab19") == undefined ? this.router.navigateByUrl(`/StockCheck`) : window.location.hash = this.common.getItem("hashTab19");
        break;
      }
      case 19: {
        this.common.getItem("hashTab20") == undefined ? this.router.navigateByUrl(`/StockTick`) : window.location.hash = this.common.getItem("hashTab20");
        break;
      }
      case 20: {
        this.common.getItem("hashTab21") == undefined ? this.router.navigateByUrl(`/CashFlow`) : window.location.hash = this.common.getItem("hashTab21");
        break;
      }
      case 21: {
        this.common.getItem("hashTab22") == undefined ? this.router.navigateByUrl(`/Expired`) : window.location.hash = this.common.getItem("hashTab22");
        break;
      }
      case 22: {
        this.common.getItem("hashTab23") == undefined ? this.router.navigateByUrl(`/GoodsPrice`) : window.location.hash = this.common.getItem("hashTab23");
        break;
      }
      case 23: {
        this.common.getItem("hashTab24") == undefined ? this.router.navigateByUrl(`/SummaryBackup`) : window.location.hash = this.common.getItem("hashTab24");
        break;
      }
      case 24: {
        this.common.getItem("hashTab25") == undefined ? this.router.navigateByUrl(`/StockCheckListing`) : window.location.hash = this.common.getItem("hashTab25");
        break;
      }
    }
    if(this.appcomponent.mobile){
      this.appcomponent.isCollapsed = !this.appcomponent.isCollapsed;
    }
    
  }



}
