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
  selector: 'app-goods_price_listing',
  templateUrl: './goods_price_listing.component.html',
  styleUrls: ['./goods_price_listing.component.scss']
})
export class GoodsPriceListComponent implements OnInit {
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

  
  unCheck(value) {
  }
  
  

  // get table data 
  isVisible: boolean = false;
  NoResultId = "No Data"
 



  
  column: any[];
  headerName: any[];
  headerNameArr: any[];
  rowLen: number;
  tableEmpty: boolean = true;


  //select mock data
  SelListModal: any = { "ProductData": [], "selectedPro": "" };


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
  // headerdate = ["","Product Code /货品","Quantity / 数量","Expired / 过期","Date / 日期","Suppiler / 供应商", "Detail / 记录"];
  headerdate = ["","Purchase Id","Date / 日期","Unit Cost / 本钱","Suppiler / 供应商","Invoice Id / 进货单号码","Quantity / 数量","Expired / 过期", "Detail / 记录"];

  All ="All / 全部";
  Purchases :any;
  AccountMonthChange(value){
    console.log(value);
    console.log(this.month_index);
    if(this.year_index){      
      this.AccountYearChange(this.year_index);
    }
  }
  InvoiceTypeChange_Listing(value){
    if(this.month_index){      
      this.AccountMonthChange(this.month_index);
    }else{
      if(this.year_index){      
        this.AccountYearChange(this.year_index);
      }
    }
  }
  AccountYearChange(value){

    this.dcrService.getPOSExpiredCheck(value).subscribe(data => {
      // this.LoadSel = false;
      this.Purchases = data;
      console.log(data);
      // this.dcrService.UpgradeProList = JSON.parse(JSON.stringify(data))
      // this.SelListModal.ProductData.sort((a, b) => { return this.common.sortFn(a, b) })
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })
  }
  init() {
    this.purchase_date = new Date().toISOString().split("T")[0];
    
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
    console.log(this.Purchases[value].id);
    this.dcrService.getPOSPurchaseItems(this.Purchases[value].id).subscribe(data => {
      console.log(data);
      this.purchase_id = this.Purchases[value].id;
      this.PurchaseItems = data;     
      this.OldPurchaseItems=JSON.parse(JSON.stringify(data));
      document.getElementsByClassName("ant-modal")[0].setAttribute("style","width:100%");  
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })
  }
  selectedPurchase_index:any;
  EditModal(value): void {
    this.selectedPurchase_index =value;
    document.getElementById("editModel").style.display = "";
    document.getElementById("ListingModal").style.display = "none";
    this.EditInit(this.Purchases[value].id);
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
  item_expired:any;
  addItems(product_code,quantity,unit_cost,expired, name){
    // ,amount
    let purchase_item: any = {
      "purchaseId":this.purchase_id,
      "productCode": product_code,
      "quantity": quantity,
      "unitCost": unit_cost,
      "expired": expired,
      "name": name,
      // "amount": amount
    } 
    if(product_code){
      this.PurchaseItems.push(purchase_item);
    }
    
    
    this.item_index =null;
    this.item_code =null;
    this.item_unit_cost = null;
    this.item_quantity = null;
    this.item_name = null;
    this.item_expired = null
    
  }
  // addItems(product_code,quantity,unit_cost){
  //   console.log("addItems");
  //   let purchase_item: any = {
  //     "purchaseId":this.purchase_id,
  //     "productCode": product_code,
  //     "quantity": quantity,
  //     "unitCost": unit_cost
  //     // "amount": amount
  //   } 
  //   this.PurchaseItems.push(purchase_item);
    
  //   this.item_index =null;
  //   this.item_code =null;
  //   this.item_unit_cost = null;
  //   this.item_quantity = null;
    
  // }

  addEditItems(product_code,quantity,unit_cost,expired, name){
    // ,amount
    let purchase_item: any = {
      "purchaseId":this.purchase_id,
      "productCode": product_code,
      "quantity": quantity,
      "unitCost": unit_cost,
      "expired": expired,
      "name": name,
      // "amount": amount
    } 
    if(product_code){
      this.purchase_items.purchase_item.push(purchase_item);
    }
    
    this.item_index =null;
    this.item_code =null;
    this.item_unit_cost = null;
    this.item_quantity = null;
    this.item_name = null;
    this.item_expired = null
    
  }
  // addEditItems(product_code,quantity,unit_cost){
  //   console.log("addItems");
  //   let purchase_item: any = {
  //     "purchaseId":this.purchase_id,
  //     "productCode": product_code,
  //     "quantity": quantity,
  //     "unitCost": unit_cost
  //     // "amount": amount
  //   } 
  //   this.purchase_items.purchase_item.push(purchase_item);
    
  //   this.item_index =null;
  //   this.item_code =null;
  //   this.item_unit_cost = null;
  //   this.item_quantity = null;
    
  // }

  amountChange(value){
    this.total_amount = parseFloat(this.total_amount).toFixed(2);
  }
  deleteEditItems(index){
    console.log("deleteEditItems");
    console.log(this.purchase_items.purchase_item);
    this.purchase_items.purchase_item.splice(index,1);
  }
  deleteItem(index){
    this.PurchaseItems.splice(index,1);
  }
  headerColumn = ["Product Code / 代号","Quantity / 数量","Unit Cost / 单价","Expired Date / 过期","Delete / 删除"];
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
  purchase_date = new Date().toISOString().split("T")[0];
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
                  this.Purchases[this.selectedPurchase_index].particular = purchase.particular;
                  this.Purchases[this.selectedPurchase_index].totalAmount = purchase.totalAmount;
                  this.Purchases[this.selectedPurchase_index].invoiceNo = purchase.invoiceNo;
                  this.Purchases[this.selectedPurchase_index].supplier = purchase.supplier;
                  this.Purchases[this.selectedPurchase_index].type = purchase.type;
                  this.Purchases[this.selectedPurchase_index].date = purchase.date;
                  this.common.createModalMessage("Successful","save successful!!!").success();
                  this.handleCancel();

                  // this.AccountYearChange(1);
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
                this.AccountYearChange(1);
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
            this.reset();
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
    this.dcrService.getPOSPurchaseById(i).subscribe(data => {
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
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })

    this.dcrService.getPOSSuppliers().subscribe(data => {
      this.SupplierLoadSel = false;
      this.Suppliers = data;
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })

    this.dcrService.getPOSInvoiceType([1,2,3,4,5,6,7,16]).subscribe(data => {
      this.InvoiceLoadSel = false;
      this.InvoiceType = data;
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })
    
  }
  InputChange(value){
    this.item_index =null;
    this.item_unit_cost = null;
  }

  ItemChange(value) {
    this.item_code = this.Items[value].code;
    this.searchProduct();
  }

  productName:any;
  currentStock:any;
  currentStockValue:any;
  searchProduct(){
    if(this.item_code){
      this.dcrService.getPOSExpiredCheck(this.item_code).subscribe(data => {
        this.Purchases = data;
        console.log(data);
        if(this.Purchases.length>0){
          // let Product = this.Products[0];
          this.productName = this.Purchases[0].product.code + ' - ' + this.Purchases[0].product.name;
          this.currentStock = this.Purchases[0].product.stock;
          this.currentStockValue = this.Purchases[0].product.total_stock;
        }else{
          this.common.createModalMessage("Failed","No Product Found").error();
        }
        
      }, error => {
        if (error.error.text != "No Results") {
          this.common.errStatus(error.status, error.error);
        }
      })

    }    
  }

  
  update(value){
    
    if(document.getElementsByClassName("trDisplayLabel"+value)[0].getAttribute("style")=="display:none"){
      let promise = new Promise((resolve, reject) => {
        this.dcrService.updateExpired(this.Purchases[value])
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
  paidPurchase(value){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.paidPurchase(this.Purchases[value])
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

  deletePurchase(value){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.deletePurchase(this.Purchases[value])
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

  
}
