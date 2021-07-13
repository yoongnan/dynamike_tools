import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

//service
import { DcrService } from "../../services/dcr.service";
import { CommonService } from "../../services/common.service";

import * as moment from "moment";
import { Router, ActivatedRoute } from '@angular/router';
import { NgxLoadingComponent } from "ngx-loading"
import { Location } from '@angular/common';
import { AnyTxtRecord } from 'dns';
import { Console } from 'console';


@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.scss']
})
export class CashFlowComponent implements OnInit {
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


  YearLoadSel: boolean = true;
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
  headerdate = ["","Date / 日期","Particular / 内容","Invoice No / 单号码",
                            "Type / 单类","Amount / 总额","Paid / 已付", "Detail / 记录"];

  All ="All / 全部";
  Purchases :any;
  AccountMonthChange(value){
    console.log(value);
    console.log(this.month_index);
    if(this.year_index){      
      this.AccountYearChange(this.year_index);
    }
  }
  // InvoiceTypeChange_Listing(value){
  //   if(this.month_index){      
  //     this.AccountMonthChange(this.month_index);
  //   }else{
  //     if(this.year_index){      
  //       this.AccountYearChange(this.year_index);
  //     }
  //   }
  // }
  AccountYearChange(value){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSAccountList(value,this.month_index)
        .toPromise()
        .then(
          data => { // Success
            console.log(data);
            this.Purchases = data;
            this.common.createModalMessage("Successful","save successful!!!").success();
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSAccountList(value,this.month_index).subscribe(data => {
    //   // this.LoadSel = false;
    //   this.Purchases = data;
    //   // this.dcrService.UpgradeProList = JSON.parse(JSON.stringify(data))
    //   // this.SelListModal.ProductData.sort((a, b) => { return this.common.sortFn(a, b) })
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
  }
  init() {
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSCashFlowList()
        .toPromise()
        .then(
          data => { // Success
            // this.YearLoadSel = false;
            // this.AccountYears = data;        
            
            // this.year_index = this.AccountYears[0];  
            // this.AccountYearChange(this.year_index);
            
            this.Purchases = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });

    // let promise_1 = new Promise((resolve, reject) => {
    //   this.dcrService.getPOSInvoiceType([1,2,3,4,5,6,7,16])
    //     .toPromise()
    //     .then(
    //       data => { // Success
            
    //         this.InvoiceTypeLoadSel = false;
    //         this.InvoiceType = data;
    //       },
    //       msg => { // Error
    //         this.common.createModalMessage(msg.error.error, msg.error.message).error()
    //       }
    //     );
    // });
    // this.dcrService.getPOSInvoiceType([1,2,3,4,5,6,7,16]).subscribe(data => {
    //   this.InvoiceTypeLoadSel = false;
    //   this.InvoiceType = data;
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
    
  }

  InvoiceType:any;
  invoice_type:any;
  InvoiceTypeLoadSel: boolean = true;
  isModalVisible = false;

  PurchaseItems:any;  
  OldPurchaseItems:any;
  showModal(value): void {
    this.isModalVisible = true;
    
    // console.log(this.Purchases[value].id);
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSPurchaseItems(this.Purchases[value].id)
        .toPromise()
        .then(
          data => { // Success
            console.log(data);
            this.purchase_id = this.Purchases[value].id;
            this.PurchaseItems = data;     
            this.OldPurchaseItems=JSON.parse(JSON.stringify(data));
            document.getElementsByClassName("ant-modal")[0].setAttribute("style","width:100%");
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSPurchaseItems(this.Purchases[value].id).subscribe(data => {
    //   console.log(data);
    //   this.purchase_id = this.Purchases[value].id;
    //   this.PurchaseItems = data;     
    //   this.OldPurchaseItems=JSON.parse(JSON.stringify(data));
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
  }
  
  paidPurchase(value){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.paidPurchase(this.Purchases[value])
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
  }
  update(value){
    if(document.getElementsByClassName("trDisplayLabel"+value)[0].getAttribute("style")=="display:none"){
      let promise = new Promise((resolve, reject) => {
        this.dcrService.updatePurchase(this.Purchases[value],[],[])
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
    
    document.getElementById("editModel").style.display = "none";
    document.getElementById("ListingModal").style.display = "";
  }


  item_index:any;
  item_code:any;
  item_name:any;
  item_quantity:any;
  item_unit_cost:any;
  item_amount:any;
  addItems(product_code,quantity,unit_cost){
    // ,amount
    let purchase_item: any = {
      "purchaseId":this.purchase_id,
      "productCode": product_code,
      "quantity": quantity,
      "unitCost": unit_cost
      // "amount": amount
    } 
    console.log(this.PurchaseItems);
    this.PurchaseItems.push(purchase_item);
    console.log(this.PurchaseItems);
    
  }

  amountChange(value){
    this.total_amount = parseFloat(this.total_amount).toFixed(2);
  }
  deleteItem(index){
    this.PurchaseItems.splice(index,1);
  }
  headerColumn = ["Product Code / 代号","Quantity / 数量","Unit Cost / 单价","Delete / 删除"];
  purchase_items: any = { "purchase_item": []};

  // InvoiceType_1 : any;
  Purchase:any;
  Suppliers : any;
  Items : any;
  invoicetype_index:any;
  invoicetype_id:any;
  invoicetype:any;
  ssm:any;
  supplier_index :any;
  supplier_id:any;
  supplier_name:any;
  purchase_date : any = new Date().toISOString().split("T")[0];
  invoice_no : any = "";
  particular= "";
  type= "";
  total_amount = "";
  purchase_id:any;
  paid:any;
  reset(){
    this.invoicetype_index=null;
    this.invoicetype_id=null;
    this.invoicetype=null;
    this.purchase_date = new Date().toISOString().split("T")[0];
    this.invoice_no  = "";
    this.particular= "";
    this.type= "";
    this.total_amount = "";
    this.invoicetype_index=null;
    this.invoicetype_id=null;
    this.invoicetype=null;
    this.ssm=null;
    this.supplier_index=null;
    this.supplier_id=null;
    this.supplier_name=null;
    this.purchase_items = { "purchase_item": [],"old_purchase_item":[]};
  }

  savePurchase(){
    let purchase: any = {
      "id":this.purchase_id,
      "supplier":[],
      // "supplier":this.supplier_id,
      "date": this.purchase_date,
      "particular": this.particular,
      "invoiceNo": this.invoice_no,
      "type": {"id":this.invoicetype_id},
      "totalAmount": parseFloat(this.total_amount).toFixed(2)
    }   
    
    let supplier: any = {
      "id":this.supplier_id,
      "contactNo":"",
      "address":"",
      "email":"",
      "website":"",
      "name": this.supplier_name,
      "companyId": this.ssm
    } 
    console.log(this.invoicetype_id);
    if(this.invoicetype_id){
      switch (this.invoicetype_id)
      { 
        case 1:case 2:case 3:
        case 4:case 5:case 6:
        case 7:{
          purchase.supplier = supplier;
          
          let promise = new Promise((resolve, reject) => {
            this.dcrService.updatePurchase(purchase,this.purchase_items.purchase_item,this.purchase_items.old_purchase_item)
              .toPromise()
              .then(
                res => { // Success
                  this.reset();      
            this.common.createModalMessage("Successful","save successful!!!").success();
            this.handleCancel();
                },
                msg => { // Error
                  this.common.createModalMessage(msg.error.error, msg.error.message).error()
                }
              );
          });
          break;
      }
      default:{
        let promise = new Promise((resolve, reject) => {
          this.dcrService.saveAccount(purchase)
            .toPromise()
            .then(
              res => { // Success
                this.reset();      
              this.common.createModalMessage("Successful","save successful!!!").success();
              this.handleCancel();
              },
              msg => { // Error
                this.common.createModalMessage(msg.error.error, msg.error.message).error()
              }
            );
        });
        }
        
      }
    }
    
  }

  nullvalue;
  saveSupplier(){
    let supplier: any = {
      "contactNo": this.nullvalue,
      "address": this.nullvalue,
      "email": this.nullvalue,
      "website": this.nullvalue,
      "name": this.supplier_name,
      "companyId": this.ssm
    } 
    let promise = new Promise((resolve, reject) => {
      this.dcrService.saveSupplier(supplier)
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
  }

  InvoiceTypeChange(value){
    this.invoicetype_id = this.InvoiceType[value].id;
    this.invoicetype = this.InvoiceType[value].description;

  }

  SupplierChange(value){
    this.supplier_id = this.Suppliers[value].id;
    this.ssm = this.Suppliers[value].companyId;
    this.supplier_name = this.Suppliers[value].name;

  }

  //upgrade Select data
  ProductLoadSel: boolean = true;
  SupplierLoadSel: boolean = true;
  InvoiceLoadSel: boolean = true;
  EditInit(i) {
    let d = new Date();
    this.purchase_date = new Date().toISOString().split("T")[0];
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSPurchaseById(i)
        .toPromise()
        .then(
          data => { // Success
            this.Purchase = data;
            this.purchase_id=this.Purchase.id;
            this.paid=this.Purchase.paid;
            this.purchase_date=this.Purchase.date;
            this.particular=this.Purchase.particular;
            this.invoice_no=this.Purchase.invoiceNo;
            this.invoicetype_index=(this.Purchase.type.id-1);
            this.invoicetype_id=this.Purchase.type.id;
            this.total_amount=this.Purchase.totalAmount;
            this.supplier_index=(this.Purchase.supplier.id-1);
            this.supplier_id=this.Purchase.supplier.id;
            this.supplier_name=this.Purchase.supplier.name;
            this.ssm=this.Purchase.supplier.companyId;
            this.purchase_items.purchase_item=this.Purchase.purchaseItemList;
            this.purchase_items.old_purchase_item=JSON.parse(JSON.stringify(this.Purchase.purchaseItemList));
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSPurchaseById(i).subscribe(data => {
    //   this.Purchase = data;
    //   this.purchase_id=this.Purchase.id;
    //   this.paid=this.Purchase.paid;
    //   this.purchase_date=this.Purchase.date;
    //   this.particular=this.Purchase.particular;
    //   this.invoice_no=this.Purchase.invoiceNo;
    //   this.invoicetype_index=(this.Purchase.type.id-1);
    //   this.invoicetype_id=this.Purchase.type.id;
    //   this.total_amount=this.Purchase.totalAmount;
    //   this.supplier_index=(this.Purchase.supplier.id-1);
    //   this.supplier_id=this.Purchase.supplier.id;
    //   this.supplier_name=this.Purchase.supplier.name;
    //   this.ssm=this.Purchase.supplier.companyId;
    //   this.purchase_items.purchase_item=this.Purchase.purchaseItemList;
    //   this.purchase_items.old_purchase_item=JSON.parse(JSON.stringify(this.Purchase.purchaseItemList));
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })

    let promise_1 = new Promise((resolve, reject) => {
      this.dcrService.getPOSSuppliers()
        .toPromise()
        .then(
          data => { // Success
            this.SupplierLoadSel = false;
            this.Suppliers = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSSuppliers().subscribe(data => {
    //   this.SupplierLoadSel = false;
    //   this.Suppliers = data;
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })

    let promise_2 = new Promise((resolve, reject) => {
      this.dcrService.getPOSInvoiceType([1,2,3,4,5,6,7,16])
        .toPromise()
        .then(
          data => { // Success
            this.InvoiceLoadSel = false;
            this.InvoiceType = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSInvoiceType([1,2,3,4,5,6,7,16]).subscribe(data => {
    //   this.InvoiceLoadSel = false;
    //   this.InvoiceType = data;
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
    
  }

  ItemChange(value) {

    this.item_code = this.Items[value].product.code;
    // this.item_quantity = this.Items[value].quantity;
    this.item_unit_cost = this.Items[value].product.unitCost;
    
    // this.item_amount:any;
    
    
  }
  Products:any;
  searchProduct(){
    if(this.item_index){
      let promise = new Promise((resolve, reject) => {
        this.dcrService.getPOSProductbyId(this.item_index)
          .toPromise()
          .then(
            data => { // Success
              this.Products = data;
              if(this.Products.length>0){
                let Product = this.Products[0];
                this.item_code = Product.product.id;
                this.item_unit_cost = Product.product.unitCost;
                this.item_name = Product.product.name;
              }else{
                this.item_code = null;
                this.item_unit_cost = null;
                this.common.createModalMessage("Failed","No Product Found").error();
              }
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
      // this.dcrService.getPOSProductbyId(this.item_index).subscribe(data => {
      //   this.Products = data;
      //   if(this.Products.length>0){
      //     let Product = this.Products[0];
      //     this.item_code = Product.product.id;
      //     this.item_unit_cost = Product.product.unitCost;
      //     this.item_name = Product.product.name;
      //   }else{
      //     this.item_code = null;
      //     this.item_unit_cost = null;
      //     this.common.createModalMessage("Failed","No Product Found").error();
      //   }
        
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })

    }    
  }

  updatePurchaseItem(){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.updatePurchaseItem(this.PurchaseItems,this.OldPurchaseItems)
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
}
