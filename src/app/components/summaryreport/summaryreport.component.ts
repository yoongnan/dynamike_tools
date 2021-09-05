import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
//service
import { DcrService } from "../../services/dcr.service";
import { CommonService } from "../../services/common.service";

import * as moment from "moment";
import { Router, ActivatedRoute } from '@angular/router';
import { NgxLoadingComponent } from "ngx-loading"
import { Location } from '@angular/common';


@Component({
  selector: 'app-purchase',
  templateUrl: './summaryreport.component.html',
  styleUrls: ['./summaryreport.component.scss']
})
export class SummaryReportComponent implements OnInit {
  ShowColumnData: any[];
  ShowColumn: string[] = [];
  tableShowOverflow: string;
  selproductWid: string; tableShowWid: string;
  left: boolean = false;

  tableTdWords = [, 'Compatible', 'Incompatible', 'Compatible: Not Tested', 'Not Supported'];
  readonly statusCls: string[] = ["", "tdCompatible", "tdIncompatible", "tdCompatibleNT", "tdNotSupport"];
  readonly statusInfoCls: string[] = ["", "tdCompatibleinfo", "tdIncompatibleinfo", "tdCompatibleNTinfo", "tdNotSupportinfo"];

  @ViewChild('ngxLoading', { static: false }) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', { static: false }) customLoadingTemplate: TemplateRef<any>;
  constructor(
    private dcrService: DcrService,
    private common: CommonService,
    private message: NzMessageService,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { 
    location.onUrlChange(url => this.ngAfterContentInit());
  }
  tooltipOne: string[];
  tooltipTwo: string[];
  ngOnInit(): void {
    this.selproductWid = "300px";
    this.tableShowWid = ""
    //table
    this.init();

    this.tooltipOne = this.common.tooltipForCCP;
    this.tooltipTwo = this.common.tooltipForLenged;
  }

  ngAfterContentInit() {
    
  }


  //pack up 
  widchange() {

    this.left = !this.left;
    this.selproductWid = this.left ? "25px" : "300px";
    this.tableShowWid = "";

  }


  
  showDetail(){
    let element: HTMLElement;
    element = document.getElementById('detail') as HTMLElement;
    console.log('showDetail');
    if(element.style.display == "block"){
      element.style.display="none";
    }else{
      element.style.display="block";
    }
  }
  

  // get table data 
  isVisible: boolean = false;
  NoResultId = "No Data"
  

  unCheck(value) {
    if (value.length == 1) {
      this.ShowColumnData.forEach(r => {
        if (value[0].id == r.id) {
          r.disabled = true;
          r.checked = true;
        } else {
          r.disabled = false;
          r.checked = false
        }
      })
    } else {
      this.ShowColumnData.forEach(r => {
        r.disabled = false
      })
    }
    this.ShowColumn = [];
    value.forEach(r => {
      this.ShowColumn.push(r.id)
    })
    
  }

  clearTableData() {
    
  }

  productListData: any[];
  productName: string;
  // columnData: { name?: "", upgradeProducts?: { releases: [] } } = { name: "", "upgradeProducts": { "releases": [] } };
  columnData: any[];
  column: any[];
  headerName: any[];
  headerNameArr: any[];
  rowLen: number;
  tableEmpty: boolean = true;
  


  //select mock data
  SelListModal: any = { "ProductData": [], "selectedPro": "" };


  //change class
  displayStatus(status: number, note: string, rowChildRelease): string {
    let cls = (!rowChildRelease.techGuided || !rowChildRelease.genGuided) ? ' trSupp' : " ";
    return note == null || note == "" ? `${this.statusCls[status]} + ${cls}` : `${this.statusInfoCls[status]} + ${cls}`;
    // return note == null || note == "" ? this.statusCls[status] : this.statusInfoCls[status]

  }

  //copy
  copyType: string = "none";
  copyMessage;
  copyClick() {
    this.copyType = "block";
    this.common.createModalMessage("Info", 'Copy to Clipboard').success();
    setTimeout(() => {
      console.log(this.copyMessage);
      this.message.remove(this.copyMessage);
      this.common.copy("UpgradePrint")
      this.copyType = "none"
    }, 1)
  }

  //csv
  CSVlink() {
    this.common.csv("UpgradePrint", "Upgrade")
  }

  //print
  printLink() {
    let css = `<style type="text/css">${this.common.cssStr}}</style> `
    this.common.print("UpgradePrint", css)
  }

  formatTime(min) {
    return moment(min).format('yyyy-MM-DD')
  }

  @HostListener('window:scroll', ['$event'])
  scrollTop: number = 0;
  onScroll(s) {
    // let st = s.target;
    // let f: any = document.getElementsByClassName('ph-footer');
    // if (st.scrollHeight == st.clientHeight + st.scrollTop && st.scrollHeight != st.clientHeight) {
    //   console.log(st.scrollTop);
    //   // console.log(st.clientHeight);
    //   // console.log(st.scrollHeight);
    //   this.scrollTop == 0 ? this.scrollTop = st.scrollTop : "";
    //   this.elementRef.nativeElement.querySelector('.contain-inter').style.height = "calc(100vh - 230px)";
    //   f[0].style.display = "block";
    // } else if (this.scrollTop > st.scrollTop) {
    //   this.elementRef.nativeElement.querySelector('.contain-inter').style.height = "calc(100vh - 142px)";
    //   f[0].style.display = "none";
    // }
  }

  //highLight
  tdSelected: any;
  tdMouseOver(i) {
    this.tdSelected = i;
  }

  tdMouseOut() {
    this.tdSelected = "131355";
  }
  

  AccountYears: any;
  this_year:any = new Date().getFullYear();
  year_index: any;
  month : any[] = ["January 一月","Feburary 二月","March 三月","April 四月","May 五月","June 六月","July 七月","August 八月","September 九月","October 十月","November 十一月","December 十二月"]
  capitalinfo :any[] = ["Bring Forward 旧年的数","Opening Account 開戶口","Investment 加码","Cash 現金", "Inventory 貨錢","Bring Forward 旧年的货数","Cash 旧年的现金","Dividend Paid 旧年的利息","Total 总本钱"];
  ledger: any[] = ["存貨钱","进貨錢","包裝费","廣告费","做生意设备","賠錢","蝕貨","网店津貼"];
  cashflow: any[] = ["Total 总和","銀行","实店底钱","Shopee Wallet","Lazada Balance","荷包仔","保险"];
  purchase_date : any = new Date().toISOString().split("T")[0];
  invoice_no : any;
  monthReport : any;
  saveOrder(){
    console.log(this.purchase_date);
    console.log(this.invoice_no);
  }

  ExpenditureReport:any ={
    advertise: "",
    equipment: "",
    inventory: "",
    lost: "",
    month: "",
    packages: "",
    refund: "",
    subsidy: "",
    year: ""
  }
  CapitalReport:any ={
    cash: "",
    inventorycash: "",
    inventory: "",
    dividend: "",
    investment: "",
    openAccount: "",
    month: "",
    year: ""
  }
  CashFlowReport:any ={
    cash: "",
    bankAccount: "",
    shopeeWallet: "",
    lazadaWallet: "",
    insurance: "",
    wallet: ""
  }
  MonthlyReport =[];

  YearLoadSel: boolean = true;

  AccountYearChange(value){
    
    this.dcrService.getCashFlowReport(value).subscribe(data => {
      this.CashFlowReport = data;        
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })
    this.dcrService.getExpenditureReport(value).subscribe(data => {
      this.ExpenditureReport = data;        
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })

    this.dcrService.getCapitalReport(value).subscribe(data => {
      console.log(data);
      this.CapitalReport = data;    
          
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })

    this.dcrService.getSummaryMonthlyReport(value).subscribe(data => {
      this.monthReport =data;      

//         balance: 0
// earned: 0
// expenditure: 0
// lazada: 0
// localShop: 0
// month: 1
// orderCount: 0
// sale: 0
// shopee: 0
// stocks: 0
// year: null
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })
    

  }
  init() {
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getAccountYear()
        .toPromise()
        .then(
          data => { // Success
            this.YearLoadSel = false;
            this.AccountYears = data; 
            this.year_index = this.AccountYears[0];  
            this.AccountYearChange(this.year_index);
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
  }
    
      

}
