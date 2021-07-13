import { Component, OnInit, ViewChild, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

//service
import { DcrService } from "../../services/dcr.service";
import { CommonService } from "../../services/common.service";

import * as moment from "moment";
import { Router, ActivatedRoute } from '@angular/router';
import { NgxLoadingComponent } from "ngx-loading";
import { Location } from '@angular/common';
import { AnySrvRecord } from 'dns';
import { Console } from 'console';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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
  SelListModal: any = { "ProductData": [], "selectedPro": "" , "ProductType" : []};

  

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
  //   let st = s.target;
  //   // let f: any = document.getElementsByClassName('ph-footer');
  //   // if (st.scrollHeight == st.clientHeight + st.scrollTop && st.scrollHeight != st.clientHeight) {
  //   //   console.log(st.scrollTop);
  //   //   // console.log(st.clientHeight);
  //   //   // console.log(st.scrollHeight);
  //   //   this.scrollTop == 0 ? this.scrollTop = st.scrollTop : "";
  //   //   this.elementRef.nativeElement.querySelector('.contain-inter').style.height = "calc(100vh - 230px)";
  //   //   f[0].style.display = "block";
  //   // } else if (this.scrollTop > st.scrollTop) {
  //   //   this.elementRef.nativeElement.querySelector('.contain-inter').style.height = "calc(100vh - 142px)";
  //   //   f[0].style.display = "none";
  //   // }
  }

  // //highLight
  // tdSelected: any;
  // tdMouseOver(i) {
  //   this.tdSelected = i;
  // }

  // tdMouseOut() {
  //   this.tdSelected = "131355";
  // }

  
  
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  filename:File;
  resizeImage(file:File, maxWidth:number, maxHeight:number):Promise<Blob> {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            let width = image.width;
            let height = image.height;
            
            if (width <= maxWidth && height <= maxHeight) {
                resolve(file);
            }

            let newWidth;
            let newHeight;

            if (width > height) {
                newHeight = height * (maxWidth / width);
                newWidth = maxWidth;
            } else {
                newWidth = width * (maxHeight / height);
                newHeight = maxHeight;
            }

            let canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            let context = canvas.getContext('2d');

            context.drawImage(image, 0, 0, newWidth, newHeight);

            canvas.toBlob(resolve, file.type);
        };
        image.onerror = reject;
    });
}

    byteArray;
    imageFile : File;
    fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
          this.imageFile = fileInput.target.files[0];
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            // if(!fileInput.target.files[0].type.includes(allowed_types)){
            //   console.log('error');
            //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
            //     return false;
            // }
            let byteArray;
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];



                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
                        this.isImageSaved = true;
                        this.byteArray = this.convertDataURIToBinary(reader.result);
                        // this.previewImagePath = imgBase64Path;
                    }
                };
            };

            // reader.addEventListener("loadend", function () {
            //   // convert image file to base64 string
            //   console.log('base64', reader.result);
            //   this.byteArray = this.convertDataURIToBinary(reader.result);
            //   console.log('byte array', this.byteArray);
            // }, false);
      

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }

    removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
    }

    convertDataURIToBinary(dataURI) {
      var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));
    
      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
    item_index :any;
    Items : any;
    ProductTypes  : any;
    Suppliers : any;
    ssm:any;
    supplier_index :any;
    supplier_id:any;
    supplier_name:any;
    invoice_no : any;
    barcode= "";
    code= "";
    name= "";
    product_type:any;
    stock= "0";
    unit_cost:any;
    weight= "";
    dimension= "";
    total_stock= "0.00";
    description= "";
    price_type= "SellingPrice";
    selling_price:any;
    research_price= "0.00";
    price_50;
    price_45;
    price_40;
    price_35;
    price_30;
    price_25;
    price_20;
    price_15;
    price_10;
    old_images:any;
    saveProduct(){
      let product: any = {
        "id": this.code,
        "name": this.name,
        "type": this.product_type,
        "stock": this.stock,
        "unitCost": parseFloat(this.unit_cost).toFixed(2),
        "weight": this.weight,
        "dimension": this.dimension,
        "totalStock": parseFloat(this.total_stock).toFixed(2),
        "description": this.description,
        "images": this.imageFile,
        "supplier":[],
        "barCode": this.barcode,
        "code": this.code,
        "item":[]
      } 
      let item: any = {
        "id": this.code,
        // "product":[],
        "priceType": this.price_type,
        "sellingPrice": parseFloat(this.selling_price).toFixed(2),
        "researchPrice": parseFloat(this.research_price).toFixed(2),
        "price_50": parseFloat(this.price_50).toFixed(2),
        "price_45": parseFloat(this.price_45).toFixed(2),
        "price_40": parseFloat(this.price_40).toFixed(2),
        "price_35": parseFloat(this.price_35).toFixed(2),
        "price_30": parseFloat(this.price_30).toFixed(2),
        "price_25": parseFloat(this.price_25).toFixed(2),
        "price_20": parseFloat(this.price_20).toFixed(2),
        "price_15": parseFloat(this.price_15).toFixed(2),
        "price_10": parseFloat(this.price_10).toFixed(2)
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
      
      
      product.supplier = supplier;
      // item.product = product;
      product.item = item;
      if(this.imageFile){
        let promise = new Promise((resolve, reject) => {
          this.dcrService.upload(product,this.imageFile)
          // this.dcrService.upload(item,this.imageFile)
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
      }else{
        this.Items[this.old_images].supplier = product.supplier;
        this.Items[this.old_images].item = product.item;
        this.Items[this.old_images].id = product.code;
        this.Items[this.old_images].name = product.name;
        this.Items[this.old_images].type = product.type;
        this.Items[this.old_images].stock = product.stock;
        this.Items[this.old_images].unitCost = product.unitCost;
        this.Items[this.old_images].weight = product.weight;
        this.Items[this.old_images].dimension = product.dimension;
        this.Items[this.old_images].totalStock = product.totalStock;
        this.Items[this.old_images].description = product.description;
        this.Items[this.old_images].code = product.code;
        this.Items[this.old_images].barCode = product.barCode;
        let promise = new Promise((resolve, reject) => {
          this.dcrService.quickUpload(this.Items[this.old_images])
          // this.dcrService.quickUpload(item)
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
      // this.dcrService.upload(item,this.imageFile).subscribe(data => {
      //   let result =data;
      //   this.reset();
      //   console.log(result);
      //   this.common.createModalMessage("Successful","save successful!!!").success();
      // }, error => {
      //   console.log(error);
      //   if (error.error.text != "No Results") {
      //     this.common.errStatus(error.status, error.error);
      //   }
      // })

    
    }
    prices: any[] = ["50%","45%","40%","35%","30%","25%","20%","15%","10%"];
    prices_value: any[] = ["","","","","","","","",""];

  saveSupplier(){
    let supplier: any = {
      "product":[],
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
  setPrice(e){
    this.unit_cost = parseFloat(this.unit_cost).toFixed(2);
    // this.price_50= this.unit_cost * 1.5;
    // this.price_45= this.unit_cost * 1.45;
    // this.price_40= this.unit_cost * 1.4;
    // this.price_35= this.unit_cost * 1.35;
    // this.price_30= this.unit_cost * 1.3;
    // this.price_25= this.unit_cost * 1.25;
    // this.price_20= this.unit_cost * 1.2;
    // this.price_15= this.unit_cost * 1.15;
    // this.price_10= this.unit_cost * 1.1;
    this.selling_price = (this.unit_cost * 1.5).toFixed(2);
    this.prices_value = [this.price_50.toFixed(2),this.price_45.toFixed(2),this.price_40.toFixed(2),this.price_35.toFixed(2),this.price_30.toFixed(2),this.price_25.toFixed(2),this.price_20.toFixed(2),this.price_15.toFixed(2),this.price_10.toFixed(2)];
  }

  ProductTypeChange(value) {
    if (value != null) {
      // this.isVisible = false;
      // this.router.navigate(
      //   [],
      //   {
      //     relativeTo: this.route,
      //     queryParams: { productId: value },
      //     queryParamsHandling: 'merge', // remove to replace all query params by provided
      //   });
      // this.getMatrix(value);
      // this.elementRef.nativeElement.querySelector('.tableShow-area').scrollTop = 0
    }

  }
  SupplierChange(value){
    this.supplier_id = this.Suppliers[value].id;
    this.ssm = this.Suppliers[value].companyId;
    this.supplier_name = this.Suppliers[value].name;

  }

  ProductLoadSel: boolean = true;
  ProductTypeLoadSel: boolean = true;
  SupplierLoadSel: boolean = true;
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
      this.dcrService.getPOSProducts()
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
    // this.dcrService.getPOSProducts().subscribe(data => {
    //   this.ProductLoadSel = false;
    //   this.Items = data;
    // }, error => {
    //   if (error.error.text != "No Results") {
    //     this.common.errStatus(error.status, error.error);
    //   }
    // })

  }

  selectedItem:any;
  ItemChange(value) {
    this.product_type=null;
    this.code= this.Items[value].id;
    

    let promise = new Promise((resolve, reject) => {
      this.dcrService.getPOSProductbyId(this.code)
        .toPromise()
        .then(
          data => { // Success
      this.selectedItem = data;
      this.Items[value].name = this.selectedItem[0].name;
      this.name= this.Items[value].name;
      this.Items[value].type = this.selectedItem[0].type;
      for(var i = 0 ; i< this.ProductTypes.length ; i++){
        if(this.ProductTypes[i].id == this.Items[value].type) {
          this.product_type = (i+1);
          break;
        }else{

        }
      }

      this.Items[value].unitCost = this.selectedItem[0].unitCost;
      this.unit_cost=this.Items[value].unitCost;

      this.Items[value].stock = this.selectedItem[0].stock;
      this.Items[value].weight = this.selectedItem[0].weight;
      this.Items[value].dimension = this.selectedItem[0].dimension;
      this.Items[value].totalStock = this.selectedItem[0].totalStock;
      this.stock= this.Items[value].stock;
      this.weight= this.Items[value].weight;
      this.dimension= this.Items[value].dimension;
      this.total_stock= this.Items[value].totalStock;
      this.barcode = this.selectedItem[0].barCode;
      this.Items[value].image = this.selectedItem[0].image;
      this.old_images = value;
        if(this.Items[value].image){
          this.isImageSaved =true;
          this.cardImageBase64 = 'data:image/png;base64,' + this.Items[value].image;
        }
        
        this.Items[value].supplier = this.selectedItem[0].supplier;
        this.Items[value].supplier.companyId = this.selectedItem[0].supplier.companyId;
        this.Items[value].supplier.id = this.selectedItem[0].supplier.id;
        this.Items[value].supplier.name = this.selectedItem[0].supplier.name;
        this.Items[value].description = this.selectedItem[0].description;
        
        this.Items[value].item = this.selectedItem[0].item;
        
        this.description= this.Items[value].description;
        this.ssm = this.Items[value].supplier.companyId;
        this.supplier_id =this.Items[value].supplier.id;
        for(var i =0; i<this.Suppliers.length;i++){
          
          if(this.Suppliers[i].id == this.supplier_id){
            this.supplier_index = i;
          }
        }
        this.supplier_name=this.Items[value].supplier.name;   

// this.product_type = parseInt(this.product_type);
this.price_type= this.Items[value].item.priceType;
this.selling_price= parseFloat(this.Items[value].item.sellingPrice);
this.research_price= this.Items[value].item.researchPrice;
this.price_50= parseFloat(this.Items[value].item.price_50);
this.price_45= parseFloat(this.Items[value].item.price_45);
this.price_40= parseFloat(this.Items[value].item.price_40);
this.price_35= parseFloat(this.Items[value].item.price_35);
this.price_30= parseFloat(this.Items[value].item.price_30);
this.price_25= parseFloat(this.Items[value].item.price_25);
this.price_20= parseFloat(this.Items[value].item.price_20);
this.price_15= parseFloat(this.Items[value].item.price_15);
this.price_10= parseFloat(this.Items[value].item.price_10);

this.prices_value = [this.price_50.toFixed(2),this.price_45.toFixed(2),this.price_40.toFixed(2),this.price_35.toFixed(2),this.price_30.toFixed(2),this.price_25.toFixed(2),this.price_20.toFixed(2),this.price_15.toFixed(2),this.price_10.toFixed(2)];
  
          },
          msg => { // Error
            this.common.createModalMessage(msg.error.error, msg.error.message).error()
          }
        );
    });
    
    
  }
  reset(){
    this.item_index =null;
    this.ssm = null;
    this.supplier_index= null;
    this.supplier_id = null;
    this.supplier_name=null;
    this.invoice_no=null;
    this.code=null;
    this.name=null;
    this.product_type=null;
    this.stock=null;
    this.unit_cost=null;
    this.weight=null;
    this.dimension=null;
    this.total_stock=null;
    this.description=null;
    this.price_type= "SellingPrice";
    this.selling_price=null;
    this.research_price= "0.00";
    this.price_50=null;
    this.price_45=null;
    this.price_40=null;
    this.price_35=null;
    this.price_30=null;
    this.price_25=null;
    this.price_20=null;
    this.price_15=null;
    this.price_10=null;
    
    this.isImageSaved =false;
    this.cardImageBase64 = null;
    this.filename = null;
    this.barcode=null;
  }
}
