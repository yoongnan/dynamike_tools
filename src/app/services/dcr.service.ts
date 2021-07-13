import { throwError as observableThrowError, from as observableFrom, of as observableOf, combineLatest as observableCombineLatest, forkJoin as observableForkJoin, Observable } from 'rxjs';

import { catchError, map, mergeMap, tap, delay, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EnvironmentsService } from "./environment.service";
import { HttpRequest, HttpEvent } from '@angular/common/http';
import 'rxjs/Rx'

// util

import * as _ from 'lodash';

@Injectable()
export class DcrService {

  baseUrl: string;

  public InterProList: any;
  public InterMatrix: any;

  public DatabaseProList: any;
  public DatabaseList: any;

  public UpgradeProList: any;
  public UpgradeMatrixList: any;

  constructor(

    private http: HttpClient,
    private environmentsService: EnvironmentsService) {
    // this.baseUrl = window.location.hostname.indexOf('localhost')>-1?'/apidata':`${this.environmentsService.config.simServiceUrl}`;
    this.baseUrl = `${this.environmentsService.config.simServiceUrl}`;
    // this.baseUrl = `${this.environmentsService.config.agentUrl}`;

  }

  // header = { "headers": { "X-Auth-Key": "N31mVcQkL?Q]GSe[Tve0Wl8b[i2_vU:ClohDvU7Ex;GCu4=hxa=q>3B<aMEZRwmT"} };
  header = { "headers": { "X-Auth-Key": "N31mVcQkL?Q]GSe[Tve0Wl8b[i2_vU:ClohDvU7Ex;GCu4=hxa=q>3B<aMEZRwmT"}, "set-cookie" :"samesite=none" };
 
  public saveTransaction(params,listdata): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    formData.append('list_data', JSON.stringify(listdata));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/transaction`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public updatePurchaseItem(listdata,old_list_data): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('list_data', JSON.stringify(listdata));
    formData.append('old_list_data', JSON.stringify(old_list_data));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/purchaseItems`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public updateTransactionItem(listdata,old_list_data): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('list_data', JSON.stringify(listdata));
    formData.append('old_list_data', JSON.stringify(old_list_data));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/transactionItems`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public updateTransaction(params,listdata,old_list_data): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    formData.append('list_data', JSON.stringify(listdata));
    formData.append('old_list_data', JSON.stringify(old_list_data));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/transaction`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public deletePurchase(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('DELETE', `${url}/purchase`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public deleteTransaction(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('DELETE', `${url}/transaction`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public saveAccount(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // formData.append('list_data', JSON.stringify(listdata));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/account`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public paidPurchase(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/paidpurchase`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public updateExpired(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // formData.append('list_data', JSON.stringify(listdata));
    // formData.append('old_list_data', JSON.stringify(oldList));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/updateExpired`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public updatePurchase(params,listdata,oldList): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    formData.append('list_data', JSON.stringify(listdata));
    formData.append('old_list_data', JSON.stringify(oldList));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/purchase`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public savePurchase(params,listdata): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    formData.append('list_data', JSON.stringify(listdata));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/purchase`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  
  public runCheckStock(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    // header = { "headers": {
    //   'Content-Type': 'application/json'
    //   }};
    const req = new HttpRequest('GET', `${url}/runcheckStock?date=${params}`,header);

    return this.http.request(req);
  }

  public stockCheck(params): Observable<HttpEvent<any>> {
    console.log(params);
    var header = {};
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    var url = `${this.environmentsService.config.posServiceUrl}`;
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/stockcheck`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public saveClient(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    // const formData: FormData = new FormData();
    // formData.append('file', file);
    // formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/client`, params, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public saveSupplier(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    // const formData: FormData = new FormData();
    // formData.append('file', file);
    // formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/supplier`, params, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  

  public quickUploadProductStock(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/quickUpdateStockCheck`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public quickUpload(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('PUT', `${url}/quickUpdateProduct`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public uploadLazadaTransaction(file: File): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/lazadaTransaction`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public uploadLazada(file: File): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/lazada`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public uploadShopee(file: File): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/shopee`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public upload(params,file: File): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('group_data', JSON.stringify(params));
    // const req = new HttpRequest('POST', `${this.baseUrl}/products`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/products`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }
  public getPOSClient(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/clients`, header);
  }
  
  
  public getPOSMonthlyReport(year){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/monthlyreport?years=${year}`, header);
  }
  public getPOSCashFlowReport(year){
    console.log(year);
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/cashflowReport?years=${year}`, header);
  }
  public getPOSCapitalReport(year){
    console.log(year);
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/capitalReport?years=${year}`, header);
  }
  public getPOSClients(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/clients`, header);
  }
  public getPOSSupplier(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/suppliers`, header);
  }
  public getPOSTransactionYear(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/transactionYears`, header);
  }
  public getPOSAccountYear(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/accountYears`, header);
  }
  public getPOSExpenditureReport(year){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/expenditureReport?years=${year}`, header);
  }
  public getPOSProvider(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/providers`, header);
  }

  public getPOSProductbyCode(code){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    if(code){
      return this.http.get(url + `/productByCode?id=${code}`, header);
    }    
  }

  public getPOSProductbyId(code){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    if(code){
      return this.http.get(url + `/productById?id=${code}`, header);
    }    
  }

  public getPOSProductbyType(type,page,size){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}/productByType?type=${type}`;
    if(page){
      url+= `&page=${page}&size=${size}`;
    }
    return this.http.get(url, header);
  }
  public getPOSProducts(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/products`, header);
  }
  public getPOSProduct(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/productitems`, header);
  }
  public getPOSPaymentByOrderId(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/paymentbyid?id=${id}`, header);
  }
  public getPOSOrderItems(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/orderItems?id=${id}`, header);
  }  
  public getPOSPurchaseById(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/purchasebyid?id=${id}`, header);
  }
  public getPOSPurchaseItems(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/purchaseItems?id=${id}`, header);
  }
  
  public getPOSAllInvoiceType(params){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/allinvoicetypes`, header);
  }
  public getPOSOthersInvoiceType(params){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/otherinvoicetypes?types=${params}`, header);
  }
  public getPOSInvoiceType(params){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/invoicetypes?types=${params}`, header);
  }

  public getPOSSuppliers(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/suppliers`, header);
  }

  public getPOSProductTypes(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/producttypes`, header);
  }
  
  public addInvoiceType(id,name): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/invoicetypes?id=${id}&name=${name}`, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }


  public addProductType(id,name): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    
    header = { "headers": {
      'Content-Type': 'application/json'
      }};
    const req = new HttpRequest('POST', `${url}/producttypes?id=${id}&name=${name}`, {
        reportProgress: true,
        responseType: 'json'
      });

    return this.http.request(req);
  }

  public getPOSPayment(year,month,type){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/payment?`;
    if(type){
      if(month){
        url +=`month=${month}&year=${year}&type=${type}`;
      }else{
        url +=`year=${year}&type=${type}`;
      }
    }else{
      if(month){
        url +=`month=${month}&year=${year}`;
      }else{
        url +=`year=${year}`;
      }
    }
    
    return this.http.get(url, header);
  }

  public getPOSCashFlowList(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/cashflow?`;
    
    return this.http.get(url, header);
  }
  public getPOSAccountList(year,month){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/account?`;
    if(month){
        url +=`month=${month}&year=${year}`;
    }else{
      url +=`year=${year}`;
    }
    
    return this.http.get(url, header);
  }

  

  public getPOSExpiredCheck(code){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/expiredCheck?`;
    if(code){
      url +=`code=${code}`;
    }
    
    return this.http.get(url, header);
  }

  public getPOSPurchases(year,month,type){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/purchase?`;
    if(month){
      if(type){
        url +=`month=${month}&year=${year}&type=${type}`;
      }else{
        url +=`month=${month}&year=${year}`;
      }
    }else{
      url +=`year=${year}`;
    }
    
    return this.http.get(url, header);
  }



}