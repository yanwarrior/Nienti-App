import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierCreateComponent } from './popups/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './popups/supplier-edit/supplier-edit.component';
import { SupplierDeleteComponent } from './popups/supplier-delete/supplier-delete.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './popups/product-create/product-create.component';
import { ProductEditComponent } from './popups/product-edit/product-edit.component';
import { ProductDeleteComponent } from './popups/product-delete/product-delete.component';
// PrimeNg
import { ChipsModule } from 'primeng/chips';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TreeModule } from 'primeng/tree';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SlideMenuModule } from 'primeng/slidemenu';
import {MenuModule} from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { SubnavComponent } from './components/subnav/subnav.component';
import { ListingComponent } from './components/listing/listing.component';
import { EmptyComponent } from './components/empty/empty.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerEditComponent } from './popups/customer-edit/customer-edit.component';
import { CustomerCreateComponent } from './popups/customer-create/customer-create.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavigationComponent,
    SupplierComponent,
    SupplierCreateComponent,
    SupplierEditComponent,
    SupplierDeleteComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDeleteComponent,
    SubnavComponent,
    ListingComponent,
    EmptyComponent,
    CustomersComponent,
    CustomerEditComponent,
    CustomerCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string | any => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: [
          'localhost:8000',
          '0.0.0.0:8000',
          '192.168.43.60:8000',
        ],
        blacklistedRoutes: [
          'http://localhost:8000/login/',
          'http://localhost:8000/refresh/',
          'http://0.0.0.0:8000/login/',
          'http://0.0.0.0:8000/refresh/',
          'http://192.168.43.60:8000/login/',
          'http://192.168.43.60:8000/refresh/',
        ]
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ChipsModule,
    MenubarModule,
    MegaMenuModule,
    SplitButtonModule,
    TreeModule,
    PanelMenuModule,
    TieredMenuModule,
    SlideMenuModule,
    MenuModule,
    PanelModule,
    TableModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
