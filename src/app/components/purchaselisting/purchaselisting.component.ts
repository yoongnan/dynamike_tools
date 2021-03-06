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


import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-purchaselisting',
  templateUrl: './purchaselisting.component.html',
  styleUrls: ['./purchaselisting.component.scss']
})
export class PurchaseListComponent implements OnInit {
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
    private location: Location,
    private nzContextMenuService: NzContextMenuService
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
  month : any[] = [{"id":1,"value":"January ??????"},
  {"id":2,"value":"Feburary ??????"},
  {"id":3,"value":"March ??????"},
  {"id":4,"value":"April ??????"},
  {"id":5,"value":"May ??????"},
  {"id":6,"value":"June ??????"},
  {"id":7,"value":"July ??????"},
  {"id":8,"value":"August ??????"},
  {"id":9,"value":"September ??????"},
  {"id":10,"value":"October ??????"},
  {"id":11,"value":"November ?????????"},
  {"id":12,"value":"December ?????????"}]
  headerdate = ["","Date / ??????","Suppiler / ?????????","Particular / ??????","Invoice No / ?????????",
                            "Type / ??????","Amount / ??????","Paid / ??????", "Detail / ??????"];

  All ="All / ??????";
  Purchases :any;
  AccountMonthChange(value){
    console.log(value);
    console.log(this.month_index);
    if(this.year_index){      
      this.AccountYearChange(this.year_index);
    }
  }
  InvoiceTypeChange_Listing(value){
    this.invoice_type = value;
    if(this.month_index){      
      this.AccountMonthChange(this.month_index);
    }else{
      if(this.year_index){      
        this.AccountYearChange(this.year_index);
      }
    }
  }
  AccountYearChange(value){

    this.dcrService.getPurchases(value,this.month_index,this.invoice_type).subscribe(data => {
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
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getAccountYear()
        .toPromise()
        .then(
          data => { // Success
            this.YearLoadSel = false;
            this.AccountYears = data;        
            
            this.year_index = this.AccountYears[0];  
            // this.AccountYearChange(this.year_index);
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    let promise_1 = new Promise((resolve, reject) => {
      this.dcrService.getInvoiceType([1,2,3,4,5,6,7,16])
        .toPromise()
        .then(
          data => { // Success
            this.InvoiceTypeLoadSel = false;
      this.InvoiceType = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });    
  }
  loadProduct(value){
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getProductbySupplier(value)
        .toPromise()
        .then(
          data => { // Success
            this.ProductLoadSel = false;
            this.Items = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
  }

  InvoiceType:any;
  invoice_type:any;
  InvoiceTypeLoadSel: boolean = true;
  isModalVisible = false;

  PurchaseItems:any;  
  OldPurchaseItems:any;
  showModal(value): void {
    this.isModalVisible = true;
    this.dcrService.getPurchaseItems(this.Purchases[value].id).subscribe(data => {
      this.purchase_id = this.Purchases[value].id;
      this.PurchaseItems = data;     
      this.OldPurchaseItems=JSON.parse(JSON.stringify(data));
      console.log(this.Purchases[value]);
      this.loadProduct(this.Purchases[value].supplier.id);
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
    this.reset();
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
  headerColumn = ["Item#","Product Code / ??????","Quantity / ??????","Unit Cost / ??????","Expired Date / ??????","Delete / ??????"];
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

    this.loadProduct(this.supplier_id);

  }

  //upgrade Select data
  ProductLoadSel: boolean = true;
  SupplierLoadSel: boolean = true;
  InvoiceLoadSel: boolean = true;
  EditInit(i) {
    let d = new Date();
    this.purchase_date = new Date().toISOString().split("T")[0];
    this.dcrService.getPurchaseById(i).subscribe(data => {
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
      this.loadProduct(this.supplier_id);
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })

    this.dcrService.getSuppliers().subscribe(data => {
      this.SupplierLoadSel = false;
      this.Suppliers = data;
    }, error => {
      if (error.error.text != "No Results") {
        this.common.errStatus(error.status, error.error);
      }
    })

    this.dcrService.getInvoiceType([1,2,3,4,5,6,7,16]).subscribe(data => {
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
  Products:any;
  searchProduct(){
    if(this.item_code){
      this.dcrService.getProductbyId(this.item_code).subscribe(data => {
        this.Products = data;
        if(this.Products.length>0){
          let Product = this.Products[0];
          console.log(Product);
          this.item_code = Product.code;
          this.item_unit_cost = Product.unitCost;
          this.item_name = Product.name;
        }else{
          this.item_code = null;
          this.item_unit_cost = null;
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

  activatedNode?: NzTreeNode;
  nodes = [
    {
      title: 'purchase id ',
      key: '100',
      // author: 'NG ZORRO',
      expanded: true,
      children: [
        { title: 'K0077 - 1 ', key: '1000', author: 'NG ZORRO', isLeaf: true },
        { title: 'K0078 - 2', key: '1001', author: 'NG ZORRO', isLeaf: true }
      ]
    },
    {
      title: 'parent 1',
      key: '101',
      // author: 'NG ZORRO',
      children: [
        { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
        { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
      ]
    }
  ];

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    console.log(data);
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }
}
