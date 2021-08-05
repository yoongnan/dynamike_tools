import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

//service
import { DcrService } from "../../services/dcr.service";
import { CommonService } from "../../services/common.service";

import * as moment from "moment";
import { Router, ActivatedRoute } from '@angular/router';
import { NgxLoadingComponent } from "ngx-loading"
import { Location } from '@angular/common';


@Component({
  selector: 'app-eshoplisting',
  templateUrl: './eshoplisting.component.html',
  styleUrls: ['./eshoplisting.component.scss']
})
export class EshopListingComponent implements OnInit {
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

  purchase_date : any = new Date().toISOString().split("T")[0];
  invoice_no : any;

  YearLoadSel: boolean = true;
  ProviderLoadSel:boolean = true;
  AccountYears: any;
  year_index: any;
  month_index:any;
  month : any[] = [{"id":1,"value":"January 一月"},
  {"id":2,"value":"Feburary 二月"},
  {"id":3,"value":"March 三月"},
  {"id":4,"value":"April 四月"},
  {"id":5,"value":"May 五月"},
  {"id":6,"value":"June 六月"},
  {"id":7,"value":"July 七月"},
  {"id":8,"value":"August 八月"},
  {"id":9,"value":"September 九月"},
  {"id":10,"value":"October 十月"},
  {"id":11,"value":"November 十一月"},
  {"id":12,"value":"December 十二月"}]
  header=["","Date","Order No","Client Name","Payment Credit","Payment Fees","Shipping Fees","Marketing Fees","Payment Due", 
  // "Free Shipping",
  "Status","Provider","Details"];

  Payments :any;
  Providers:any;
  provider_index;
  init() {
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSTransactionYear()
        .toPromise()
        .then(
          data => { // Success
            this.YearLoadSel = false;
            this.AccountYears = data;          
            
            this.year_index = this.AccountYears[0];  
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });    this.dcrService.getPOSProvider().subscribe(data => {
      this.ProviderLoadSel = false;
      this.Providers = data;
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })
    
  }

  All ="All / 全部";
  AccountMonthChange(value){
    if(this.year_index){      
      this.AccountYearChange(this.year_index);
    }
  }
  ProviderChange(value){
    if(this.month_index){      
      this.AccountMonthChange(this.month_index);
    }else{
      if(this.year_index){      
        this.AccountYearChange(this.year_index);
      }
    }
  }
  AccountYearChange(value){
    if(this.month_index){   
      console.log("yearchange: Month:"+ this.month_index);
      let promise = new Promise((resolve, reject) => {
        this.dcrService.getPOSPayment(value,this.month_index,this.provider_index)
          .toPromise()
          .then(
            data => { // Success
              this.Payments = data;   
              console.log(data);
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
      // this.dcrService.getPOSPayment(value,this.month_index,this.provider_index).subscribe(data => {
      //   this.Payments = data;
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })
    }
  }
  OrderItems:any;  
  OldOrderItems:any;  
  Items:any;
  ProductLoadSel: boolean = true;
  isModalVisible = false;
  showModal(value): void {
    this.isModalVisible = true;   
    
     
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSProducts()
        .toPromise()
        .then(
          data => { // Success
            this.ProductLoadSel = false;
            this.Items = data; 
            document.getElementsByClassName("ant-modal")[0].setAttribute("style","width:100%");
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSProducts().subscribe(data => {
    //   this.ProductLoadSel = false;
    //   this.Items = data;
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
    this.invoiceId = this.Payments[value].orderId;
    let promise_1 = new Promise((resolve, reject) => {
      this.dcrService.getPOSOrderItems(this.Payments[value].orderId)
        .toPromise()
        .then(
          data => { // Success
            this.OrderItems = data;  
            this.OldOrderItems=JSON.parse(JSON.stringify(data));
            
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSOrderItems(this.Payments[value].orderId).subscribe(data => {
    //   this.OrderItems = data;  
    //   this.OldOrderItems=JSON.parse(JSON.stringify(data));
    //   document.getElementsByClassName("ant-modal")[0].setAttribute("style","width:100%");
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
  }
  update(value){
    
    if(document.getElementsByClassName("trDisplayLabel"+value)[0].getAttribute("style")=="display:none"){
      let promise = new Promise((resolve, reject) => {
        let payment_date:Date = new Date(this.Payments[value].date);
        console.log(payment_date);
        let month = payment_date.getMonth() + 1;
        console.log("Month:"+month);
        if(month<10){
          this.Payments[value].date = payment_date.getFullYear()+"-0"+month+"-"+payment_date.getDate();
        }else{
          this.Payments[value].date = payment_date.getFullYear()+"-"+month+"-"+payment_date.getDate();
        }
        
        this.dcrService.updateTransaction(this.Payments[value],[],[])
          .toPromise()
          .then(
            res => { // Success
              this.common.createModalMessage("Successful","save successful!!!").success();
              for(var i = 0 ; i < document.getElementsByClassName("trEditLabel"+value).length ; i++){
                document.getElementsByClassName("trEditLabel"+value)[i].setAttribute("style","display:none");
                document.getElementsByClassName("trDisplayLabel"+value)[i].setAttribute("style","display:");
              }
            
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
    }else{      
      for(var i = 0 ; i < document.getElementsByClassName("trEditLabel"+value).length ; i++){
        document.getElementsByClassName("trEditLabel"+value)[i].setAttribute("style","display:");
        document.getElementsByClassName("trDisplayLabel"+value)[i].setAttribute("style","display:none");
      }
    }
    
    
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isModalVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isModalVisible = false;
  }
  orderId:any;
  searchOrder(){
    if(this.orderId){
      let promise = new Promise((resolve, reject) => {
        this.dcrService.getPOSPaymentByOrderId(this.orderId)
          .toPromise()
          .then(
            data => { // Success
              let arr = [];
              arr.push(data);
              this.Payments = arr;
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
      // this.dcrService.getPOSPaymentByOrderId(this.orderId).subscribe(data => {
      //   this.Payments = data;
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })

    }    
  }

  amountChange(value){
    
    this.Payments[value].paymentDue = parseFloat(this.Payments[value].paymentCredit) + parseFloat(this.Payments[value].paymentFees) + parseFloat(this.Payments[value].shippingFees)
                                      + parseFloat(this.Payments[value].othersFees);
    this.Payments[value].paymentDue = parseFloat(this.Payments[value].paymentDue).toFixed(2);
    
    this.Payments[value].paymentCredit = parseFloat(this.Payments[value].paymentCredit).toFixed(2);
    this.Payments[value].paymentFees = parseFloat(this.Payments[value].paymentFees).toFixed(2);
    this.Payments[value].othersFees = parseFloat(this.Payments[value].othersFees).toFixed(2);
    this.Payments[value].shippingFees = parseFloat(this.Payments[value].shippingFees).toFixed(2);
    console.log(this.Payments[value]);
  }

  
  ItemChange(value) {
    this.item_code = this.Items[value].code;
    this.item_name = this.Items[value].name;
    this.item_unit_cost = this.Items[value].unit_cost;
  }

  Products:any;
  item_index:any;
  item_code:any;
  invoiceId:any;
  item_name:any;
  item_quantity:any;
  item_unit_cost:any;
  item_amount:any;
  item_sellingPrice:any;
  searchProduct(){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSProductbyId(this.item_code)
        .toPromise()
        .then(
          data => { // Success
            this.Products = data;
            if(this.Products.length>0){
              let Product = this.Products[0];
              this.item_code = Product.product.id;
              this.item_unit_cost = Product.unitCost;
              this.item_name = Product.product.name;
            }else{
              this.item_code = null;
              this.item_unit_cost = null;
              this.item_name = null;
              this.common.createModalMessage("Failed","No Product Found").error();
            }
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSProductbyId(this.item_code).subscribe(data => {
    //   this.Products = data;
    //   if(this.Products.length>0){
    //     let Product = this.Products[0];
    //     this.item_code = Product.product.id;
    //     this.item_unit_cost = Product.unitCost;
    //     this.item_name = Product.product.name;
    //   }else{
    //     this.item_code = null;
    //     this.item_unit_cost = null;
    //     this.item_name = null;
    //     this.common.createModalMessage("Failed","No Product Found").error();
    //   }
      
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
  }
  addItems(product_code,quantity,invoiceId,item_unit_cost,item_sellingPrice){
    // ,amount
    let order_item: any = {
      "invoiceId":invoiceId,
      // "itemName": this.item_name,
      "itemId": product_code,
      "quantity": quantity,
      "unitPrice":item_unit_cost,
      "sellingPrice":item_sellingPrice,
      "totalPrice":(quantity* item_unit_cost)
    } 
    this.OrderItems.push(order_item);
    this.item_index = null;
    this.item_code = null;
    this.item_unit_cost = null;
    this.item_quantity = null;
    this.item_name = null;
    this.item_sellingPrice = null;
  }
  deleteItem(index){
    this.OrderItems.splice(index,1);
    if(this.OrderItems.length==0){
      this.OrderItems=null;  
    }
  }
  
  updateTransactionItem(){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.updateTransactionItem(this.OrderItems,this.OldOrderItems)
        .toPromise()
        .then(
          res => { // Success
            
            this.common.createModalMessage("Successful","save successful!!!").success();
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    this.isModalVisible = false;
  }

  deleteTransaction(value){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.deleteTransaction(this.Payments[value])
        .toPromise()
        .then(
          res => { // Success
            
            this.common.createModalMessage("Successful","save successful!!!").success();
            this.Payments.splice(value,1);
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
  }
}
