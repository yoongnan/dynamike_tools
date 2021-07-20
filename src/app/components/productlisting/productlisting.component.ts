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
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.scss']
})
export class ProductListingComponent implements OnInit {
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

  
  ProductTypeLoadSel: boolean = true;
  ProductTypes: any;
  product_type:any;
  product_name:any;
  ProductData:any;
  init() {
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSProductTypes()
        .toPromise()
        .then(
          data => { // Success
            this.ProductTypeLoadSel = false;
            this.ProductTypes = data;
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
      // this.dcrService.getPOSProductTypes().subscribe(data => {
      //   this.ProductTypeLoadSel = false;
      //   this.ProductTypes = data;
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })

  }
  searchProduct(){
    this.isVisible = true;
    this.product_type = null;
    if(this.product_name){
      let promise = new Promise((resolve, reject) => {
        this.dcrService.getPOSProductbyId(this.product_name)
          .toPromise()
          .then(
            data => { // Success
              this.isVisible = false;
              this.ProductData = data;
              this.footer=true;
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
      // this.dcrService.getPOSProductbyId(this.product_name).subscribe(data => {
      //   this.isVisible = false;
      //   this.ProductData = data;
      //   this.footer=true;
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })

    }else{
      let promise = new Promise((resolve, reject) => {
        this.dcrService.getPOSProduct()
          .toPromise()
          .then(
            data => { // Success
              this.isVisible = false;
              this.ProductData = data;
              this.NoResultId=""
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
      // this.dcrService.getPOSProduct().subscribe(data => {
      //   this.isVisible = false;
      //   this.ProductData = data;
      //   this.NoResultId=""
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })
    }
  }
  totalPage:any;
  pageSize:any;
  currentPage:any
  totalElements;
  footer = true;
  ProductTypeChange(value) {
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSProductbyType(value,null,null)
        .toPromise()
        .then(
          data => { // Success
            this.footer = false;
            console.log(data);
            this.ProductData = data["content"];
            this.currentPage = data['pageable']['pageNumber']; 
            this.currentPage = data['pageable']['pageNumber']; 
            this.currentPage +=1;
            this.totalPage = data["totalPages"];
            this.totalElements = data["totalElements"];
            console.log(data);
            this.pageSize = data["pageable"]['pageSize'];
            if(this.totalPage > this.currentPage){
              this.loadingMore = false;
            }else{
              this.loadingMore = true;
            }
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    // this.dcrService.getPOSProductbyType(value,null,null).subscribe(data => {
    //   this.footer = false;
    //   console.log(data);
    //   this.ProductData = data["content"];
    //   this.currentPage = data['pageable']['pageNumber']; 
    //   this.currentPage = data['pageable']['pageNumber']; 
    //   this.currentPage +=1;
    //   this.totalPage = data["totalPages"];
    //   this.totalElements = data["totalElements"];
    //   console.log(data);
    //   this.pageSize = data["pageable"]['pageSize'];
      
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })
  }

  formatImage(img: any): any {
    if(img){
      return 'data:image/jpeg;base64,' + img;
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

  loadingMore = true;
  Other ="Other / 其他";
  productDolumnData : any[] =['','code','name','unitCost','stock','totalStock','sellingPrice'];
  headerData : any[] = ["","Code / 代号","Name / 货名","Unit Cost / 进货价", "Inventory / 存货","Total Amount / 货钱","Unit Price / 卖价",
  // "50%",
  // "45%","40%","35%","30%","25%","20%","15%",
  // "10%",
  // "Weight / 重量","Size / 体积","Market / 市场价","Action / 操作"
  ];

  headerData_desktop : any[] = ["50%",
  // "45%","40%","35%","30%","25%","20%","15%",
  "10%",
  "Weight / 重量","Size / 体积","Market / 市场价"
  // ,"Action / 操作"
  ];
  onLoadMore(){
    // this.loadingMore = true;
    // this.ProductData = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSProductbyType(this.product_type,this.currentPage,this.pageSize)
        .toPromise()
        .then(
          data => { // Success
            this.footer = false;
            Array.prototype.push.apply(this.ProductData,data["content"]);
            // this.ProductData = data["content"];
            this.currentPage = data['pageable']['pageNumber']; 
            this.currentPage +=1;
            this.totalPage = data["totalPages"];
            this.totalElements = data["totalElements"];
            this.pageSize = data["pageable"]['pageSize'];            
            if(this.totalPage > this.currentPage){
              this.loadingMore = false;
            }else{
              this.loadingMore = true;
            }
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
  }
  nextProductPage(value){
    console.log("nextPage:"+value);
    if(value != this.currentPage){
      let promise = new Promise((resolve, reject) => {
        this.dcrService.getPOSProductbyType(this.product_type,value-1,this.pageSize)
          .toPromise()
          .then(
            data => { // Success
              this.footer = false;
      
              this.ProductData = data["content"];
              this.currentPage = data['pageable']['pageNumber']; 
              this.currentPage +=1;
              this.totalPage = data["totalPages"];
              this.totalElements = data["totalElements"];
              console.log(data);
              this.pageSize = data["pageable"]['pageSize'];
            },
            msg => { // Error
              this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
      });
      // this.dcrService.getPOSProductbyType(this.product_type,value-1,this.pageSize).subscribe(data => {
      //   this.footer = false;
      
      //   this.ProductData = data["content"];
      //   this.currentPage = data['pageable']['pageNumber']; 
      //   this.currentPage +=1;
      //   this.totalPage = data["totalPages"];
      //   this.totalElements = data["totalElements"];
      //   console.log(data);
      //   this.pageSize = data["pageable"]['pageSize'];
  
      // }, error => {
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })
    }
  }

  calTotalStock(e){
    this.ProductData[e].totalStock = (parseFloat(this.ProductData[e].unitCost) * parseInt(this.ProductData[e].stock)).toFixed(2)
  }

  setPrice(e){
    this.ProductData[e].item.unitCost = parseFloat(this.ProductData[e].unitCost).toFixed(2);
    this.ProductData[e].item.sellingPrice = (parseFloat(this.ProductData[e].unitCost) * 1.5).toFixed(2)

    this.ProductData[e].item.price_50 = (parseFloat(this.ProductData[e].unitCost) * 1.5).toFixed(2)
    this.ProductData[e].item.price_45 = (parseFloat(this.ProductData[e].unitCost) * 1.45).toFixed(2)
    this.ProductData[e].item.price_40 = (parseFloat(this.ProductData[e].unitCost) * 1.4).toFixed(2)
    this.ProductData[e].item.price_35 = (parseFloat(this.ProductData[e].unitCost) * 1.35).toFixed(2)
    this.ProductData[e].item.price_30 = (parseFloat(this.ProductData[e].unitCost) * 1.3).toFixed(2)
    this.ProductData[e].item.price_25 = (parseFloat(this.ProductData[e].unitCost) * 1.25).toFixed(2)
    this.ProductData[e].item.price_20 = (parseFloat(this.ProductData[e].unitCost) * 1.2).toFixed(2)
    this.ProductData[e].item.price_15 = (parseFloat(this.ProductData[e].unitCost) * 1.15).toFixed(2)
    this.ProductData[e].item.price_10 = (parseFloat(this.ProductData[e].unitCost) * 1.1).toFixed(2)
    this.calTotalStock(e);
  }

  
  updateProduct(value){
    if(document.getElementsByClassName("trDisplayLabel"+value)[0].getAttribute("style")=="display:none"){
      console.log(this.ProductData[value]);
      let promise = new Promise((resolve, reject) => {
        this.dcrService.quickUpload(this.ProductData[value])
          .toPromise()
          .then(
            res => { // Success
              for(var i = 0 ; i < document.getElementsByClassName("trEditLabel"+value).length ; i++){
                document.getElementsByClassName("trEditLabel"+value)[i].setAttribute("style","display:none");
                document.getElementsByClassName("trDisplayLabel"+value)[i].setAttribute("style","display:");
              }
              this.common.createModalMessage("Successful","save successful!!!").success();
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
}
