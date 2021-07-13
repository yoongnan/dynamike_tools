import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './components/product/product.component';
import { ProductListingComponent } from './components/productlisting/productlisting.component';
import { PurchaseListComponent } from './components/purchaselisting/purchaselisting.component';
import { PurchaseAddComponent } from './components/purchase_add/purchase_add.component';
import { AccountComponent } from './components/account/account.component';
import { EshopComponent } from './components/eshop/eshop.component';
import { EshopAddComponent } from './components/eshop_add/eshop_add.component';
import { EshopImportComponent } from './components/eshop_import/eshop_import.component';
import { EshopListingComponent } from './components/eshoplisting/eshoplisting.component';
import { SummaryReportComponent } from './components/summaryreport/summaryreport.component';
import { ProductAddComponent } from './components/product_add/product_add.component';
import { AccountListComponent } from './components/accountlisting/accountlisting.component';
import { ClientListingComponent } from './components/clientlisting/clientlisting.component';
import { SupplierListingComponent } from './components/supplierlisting/supplierlisting.component';
import { ProductTypeListingComponent } from './components/producttypelisting/producttypelisting.component';
import { InvoiceTypeListingComponent } from './components/invoicetypelisting/invoicetypelisting.component';
import { StockTickComponent } from './components/stock_tick/stock_tick.component';
import { StockCheckComponent } from './components/stock_check/stock_check.component';
import { CashFlowComponent } from './components/cashflow/cashflow.component';
import { ExpiredListComponent } from './components/expired_listing/expired_listing.component';

export const ROUTES: Routes = [
  {
    path: 'SummaryReport', component: SummaryReportComponent,
  },
  {
    path: 'Product', component: ProductComponent
  },
  {
    path: 'ProductList', component: ProductListingComponent,
  },
  {
    path: 'PurchaseList', component: PurchaseListComponent
  },
  {
    path: 'PurchaseAdd', component: PurchaseAddComponent,
  },
  {
    path: 'Account', component: AccountComponent,
  },
  {
    path: 'ProductAdd', component: ProductAddComponent,
  },
  {
    path: 'Eshop', component: EshopComponent,
  },
  {
    path: 'EshopAdd', component: EshopAddComponent,
  },
  {
    path: 'EshopImport', component: EshopImportComponent,
  },
  {
    path: 'EshopList', component: EshopListingComponent,
  },  
  {
    path: 'AccountList', component: AccountListComponent,
  },     
  {
    path: 'ClientListing', component: ClientListingComponent,
  },    
  {
    path: 'SupplierListing', component: SupplierListingComponent,
  },    
  {
    path: 'ProductTypeListing', component: ProductTypeListingComponent,
  },      
  {
    path: 'StockTick', component: StockTickComponent,
  },    
  {
    path: 'StockCheck', component: StockCheckComponent,
  },   
  {
    path: 'InvoiceTypeListing', component: InvoiceTypeListingComponent,
  },    
  {
    path: 'CashFlow', component: CashFlowComponent,
  },     
  {
    path: 'Expired', component: ExpiredListComponent,
  }, 
  
  { path: '**', redirectTo: '/SummaryReport', pathMatch: 'full' },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES, { useHash: true });
