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

  public splitExpired(params): Observable<HttpEvent<any>> {
    
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
    const req = new HttpRequest('POST', `${url}/splitExpired`, formData, {
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
  
  public getStockCheckDate(year,month){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/stockcheckdate?`;
    if(month){
        url +=`month=${month}&year=${year}`;
    }else{
      url +=`year=${year}`;
    }
    
    return this.http.get(url, header);
    
  }

  public getStockCheckListing(params): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    // header = { "headers": {
    //   'Content-Type': 'application/json'
    //   }};
    const req = new HttpRequest('GET', `${url}/stockchecklist?date=${params}`,header);

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

  public quickUpload(params,update=true): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('group_data', JSON.stringify(params));
    formData.append('update', JSON.stringify(update));
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
  public upload(params,file: File,update=true): Observable<HttpEvent<any>> {
    
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('group_data', JSON.stringify(params));
    formData.append('update', JSON.stringify(update));
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
  public getClient(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/clients`, header);
  }
  
  public getallClient(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/allclients`, header);
  }

  public getSummaryMonthlyReport(year){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/summaryMonthlyreport?years=${year}`, header);
  }
  public getMonthlyReport(year){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/monthlyreport?years=${year}`, header);
  }
  public getCashFlowReport(year){
    console.log(year);
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/cashflowReport?years=${year}`, header);
  }
  public getCapitalReport(year){
    console.log(year);
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/capitalReport?years=${year}`, header);
  }
  public getPaginationClients(page,size){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}/clients`;
    if(page){
      url+= `?page=${page}&size=${size}`;
    }
    return this.http.get(url, header);
  }
  public getClients(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/clients`, header);
  }
  public getSupplier(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/suppliers`, header);
  }
  public getTransactionYear(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/transactionYears`, header);
  }
  public getAccountYear(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/accountYears`, header);
  }
  public getExpenditureReport(year){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/expenditureReport?years=${year}`, header);
  }
  public getProvider(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/providers`, header);
  }

  public getProductbyCode(code){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    if(code){
      return this.http.get(url + `/productByCode?id=${code}`, header);
    }    
  }

  public getProductbyId(code){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    if(code){
      return this.http.get(url + `/productById?id=${code}`, header);
    }    
  }

  public getProductbySupplier(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    if(id){
      return this.http.get(url + `/productBySupplier?id=${id}`, header);
    }    
  }

  public getProductbyType(type,page,size){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}/productByType?type=${type}`;
    if(page){
      url+= `&page=${page}&size=${size}`;
    }
    return this.http.get(url, header);
  }
  public getProducts(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/products`, header);
  }
  public getProduct(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/productitems`, header);
  }
  public getPaymentByOrderId(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/paymentbyid?id=${id}`, header);
  }
  public getOrderItems(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/orderItems?id=${id}`, header);
  }  
  public getPurchaseById(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/purchasebyid?id=${id}`, header);
  }
  public getPurchaseItems(id){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/purchaseItems?id=${id}`, header);
  }
  
  public getAllInvoiceType(params){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/allinvoicetypes`, header);
  }
  public getOthersInvoiceType(params){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/otherinvoicetypes?types=${params}`, header);
  }
  public getInvoiceType(params){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/invoicetypes?types=${params}`, header);
  }

  public getSuppliers(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    return this.http.get(url + `/suppliers`, header);
  }

  public getProductTypes(){
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

  public getPaginationPayment(year,month,type,page,size){
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
    if(page){
      url+= `&page=${page}&size=${size}`;
    }
    return this.http.get(url, header);
  }

  public paymentsByMonth(year,month){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/paymentsByMonth?`;
    url +=`month=${month}&year=${year}`;
    
    return this.http.get(url, header);
  }

  public getPaymentByDate(date){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/paymentsByDate?`;
    url +=`date=${date}`;
    
    return this.http.get(url, header);
  }

  public getPayment(year,month,type){
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

  public getCashFlowList(){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/cashflow?`;
    
    return this.http.get(url, header);
  }
  public getAccountList(year,month){
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

  

  public getExpiredListing(year,month){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/expiredList?`;
    if(year && month){
      url +=`month=${month}&year=${year}`;
    }
    
    return this.http.get(url, header);
  }

  public getExpiredCheck(code){
    var header = {};
    var url = `${this.environmentsService.config.posServiceUrl}`;
    url+=`/expiredCheck?`;
    if(code){
      url +=`code=${code}`;
    }
    
    return this.http.get(url, header);
  }

  public getPurchases(year,month,type){
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

  public downloadFile(data: any, suffix, filename: any) {
    let parsedResponse = data;
    let blob = new Blob([parsedResponse], { type: `text/${suffix}` });
    let url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, `${filename}.${suffix}`);
    } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${suffix}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  
  
  private getPDFReport(pdfInfo: any,filename) {
  // private getPDFReport(pdfInfo: any) : Observable<HttpEvent<any>> {
    
      var header = {};
      var url = `${this.environmentsService.config.posServiceUrl}`;
      
      // header = { "headers": {
      //   'Content-Type': 'application/json'
      //   }};
      const req = new HttpRequest('POST', `${url}/${filename}/pdf`, pdfInfo, {
          reportProgress: true,
          responseType: 'blob'
        });
  
    return this.http.request(req);  
    // var header = {};
    // var url = `${this.environmentsService.config.posServiceUrl}`;
    // this.name = pdfInfo.type;
    // return this.http.post(`${url}/cashsales/pdf`, pdfInfo, { responseType: 'blob'});
  }
  public exportPDF(info,fileName) {
    let promise = new Promise((resolve, reject) => {
      this.getPDFReport(info,fileName)
        .toPromise()
        .then(
          res => { // Success
            console.log(res);
            
            this.downloadFile(res['body'], 'pdf',fileName)
          },
          msg => { // Error
            // this.common.createModalMessage(msg.error.error, msg.error.message).error()
            }
          );
    });
    // this.getPDFReport(info).subscribe(data => this.downloadFile(data, 'pdf','CashSales')),
    //   error => console.log("Error PDF"),
    //   () => console.info("ok");

  }


}