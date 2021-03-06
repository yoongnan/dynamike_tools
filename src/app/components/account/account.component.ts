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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
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

  //upgrade Select data
  LoadSel: boolean = true;
  

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

  item_index:any;
  item_code:any;
  item_quantity:any;
  item_unit_cost:any;
  item_amount:any;
  addItems(product_code,quantity,unit_cost){
    // ,amount
    let purchase_item: any = {
      // "purchase_id":this.purchase_id,
      "productCode": product_code,
      "quantity": quantity,
      "unitCost": unit_cost
      // "amount": amount
    } 
    console.log(purchase_item);
    this.purchase_items.purchase_item.push(purchase_item);
    console.log(this.purchase_items.purchase_item);
    
  }
//   removeAllElements(array, elem) {
//     var index = array.indexOf(elem);
//     while (index > -1) {
//         array.splice(index, 1);
//         index = array.indexOf(elem);
//     }
// }

  amountChange(value){
    this.total_amount = parseFloat(this.total_amount).toFixed(2);
  }
  deleteItem(index){
    this.purchase_items.purchase_item.splice(index,1);
  }
  headerColumn = ["Product Code / ??????","Quantity / ??????","Unit Cost / ??????","Delete / ??????"];
  purchase_items: any = { "purchase_item": []};

  InvoiceType : any;
  Suppliers : any;
  Items : any;
  invoicetype_index:any;
  invoicetype_id:any;
  invoicetype:any;
  ssm:any;
  supplier_index :any;
  supplier_id:any;
  supplier_name:any;
  purchase_date : any;
  invoice_no : any = "";
  particular= "";
  type= "";
  total_amount = "";

  reset(){
    this.invoicetype_index=null;
    this.invoicetype_id=null;
    this.invoicetype=null;
    this.purchase_date = new Date().toISOString().split("T")[0];    
    this.invoice_no  = "";
    this.particular= "";
    this.type= "";
    this.total_amount = "";
  }
  saveAccount(){
    let purchase: any = {
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
        case "1":case "2":case "3":
        case "4":case "5":case "6":
        case "7":{
          purchase.supplier = supplier;
          let promise = new Promise((resolve, reject) => {
            this.dcrService.savePurchase(purchase,this.purchase_items.purchase_item)
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
      default:{
        let promise = new Promise((resolve, reject) => {
          this.dcrService.saveAccount(purchase)
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
          data => { // Success
            
            this.common.createModalMessage("Successful","save successful!!!").success();
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.saveSupplier(supplier).subscribe(data => {
    //   // this.LoadSel = false;
    //   // this.SelListModal.ProductData = data;
    //   // this.dcrService.UpgradeProList = JSON.parse(JSON.stringify(data))
    //   // this.SelListModal.ProductData.sort((a, b) => { return this.common.sortFn(a, b) })
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
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

  init() {
    this.purchase_date = new Date().toISOString().split("T")[0];
    // if(this.common.getItem("tabNu") == "2"){
    //   this.dcrService.getProduct("upgrade").subscribe(data => {
    //     this.LoadSel = false;
    //     this.SelListModal.ProductData = data;
    //     this.dcrService.UpgradeProList = JSON.parse(JSON.stringify(data))
    //     this.SelListModal.ProductData.sort((a, b) => { return this.common.sortFn(a, b) })
    //   }, error => {
    //     if (error.error.text != "No Results") {
    //       this.common.errStatus(error.status, error.error);
    //     }
    //   })
    // }
    let d = new Date();
    this.purchase_date = new Date().toISOString().split("T")[0];
    // this.dcrService.getProduct().subscribe(data => {
    //   // this.LoadSel = false;
    //   this.Items = data;
    //   // this.dcrService.UpgradeProList = JSON.parse(JSON.stringify(data))
    //   // this.SelListModal.ProductData.sort((a, b) => { return this.common.sortFn(a, b) })
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })

    let promise = new Promise((resolve, reject) => {
      this.dcrService.getOthersInvoiceType([1,2,3,4,5,6,16])
        .toPromise()
        .then(
          data => { // Success
            
              this.InvoiceType = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });

    // this.dcrService.getOthersInvoiceType([1,2,3,4,5,6,16]).subscribe(data => {
    //   // this.LoadSel = false;
    //   this.InvoiceType = data;
    //   // this.dcrService.UpgradeProList = JSON.parse(JSON.stringify(data))
    //   // this.SelListModal.ProductData.sort((a, b) => { return this.common.sortFn(a, b) })
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

}
