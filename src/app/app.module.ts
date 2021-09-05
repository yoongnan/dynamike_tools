import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ROUTING } from "./app.routing";

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
// import { ClarityModule } from "@clr/angular";

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { TabPageComponent } from './components/tab-page/tab-page.component';
import { TabnavComponent } from './components/tabnav/tabnav.component';
import { SummaryReportComponent } from './components/summaryreport/summaryreport.component';
import { PurchaseListComponent } from './components/purchaselisting/purchaselisting.component';
import { PurchaseAddComponent } from './components/purchase_add/purchase_add.component';
import { AccountComponent } from './components/account/account.component';
import { ProductListingComponent } from './components/productlisting/productlisting.component';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product_add/product_add.component';
import { MenuComponent } from './components/menu/menu.component';
import { EshopComponent } from './components/eshop/eshop.component';
import { EshopAddComponent } from './components/eshop_add/eshop_add.component';
import { EshopImportComponent } from './components/eshop_import/eshop_import.component';
import { EshopListingComponent } from './components/eshoplisting/eshoplisting.component';
import { AccountListComponent } from './components/accountlisting/accountlisting.component';
import { ClientListingComponent } from './components/clientlisting/clientlisting.component';
import { SupplierListingComponent } from './components/supplierlisting/supplierlisting.component';
import { ProductTypeListingComponent } from './components/producttypelisting/producttypelisting.component';
import { InvoiceTypeListingComponent } from './components/invoicetypelisting/invoicetypelisting.component';
import { StockTickComponent } from './components/stock_tick/stock_tick.component';
import { StockCheckComponent } from './components/stock_check/stock_check.component';
import { CashFlowComponent } from './components/cashflow/cashflow.component';
import { ExpiredListComponent } from './components/expired_listing/expired_listing.component';
import { GoodsPriceListComponent } from './components/goods_price_listing/goods_price_listing.component';
import { SummaryReportBackupComponent } from './components/summaryreport_back_up/summaryreport.component';
import { StockCheckListComponent } from './components/stock_check_listing/stock_check.component';
import { InvoiceAddComponent } from './components/invoice_add/invoice_add.component';

import { NgxLoadingModule } from 'ngx-loading';

import { DcrService } from "./services/dcr.service"

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TabPageComponent,
    TabnavComponent,
    PurchaseListComponent,
    MenuComponent,
    SummaryReportComponent,
    ProductListingComponent,
    ProductComponent,
    ProductAddComponent,
    EshopComponent,
    EshopAddComponent,
    EshopImportComponent,
    EshopListingComponent,
    AccountComponent,
    PurchaseAddComponent,
    AccountListComponent,
    SupplierListingComponent,
    ClientListingComponent,
    ProductTypeListingComponent,
    InvoiceTypeListingComponent,
    StockTickComponent,
    StockCheckComponent,
    CashFlowComponent,
    ExpiredListComponent,
    GoodsPriceListComponent,
    SummaryReportBackupComponent,
    StockCheckListComponent,
    InvoiceAddComponent


  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DemoNgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ClarityModule,
    NgxLoadingModule.forRoot({})
  ],
  providers   : [ 
    { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons },
    DcrService,
    FontAwesomeModule
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
