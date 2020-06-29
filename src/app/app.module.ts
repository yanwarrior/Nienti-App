import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
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

import { SubnavComponent } from './components/subnav/subnav.component';
import { ListingComponent } from './components/listing/listing.component';
import { EmptyComponent } from './components/empty/empty.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerEditComponent } from './popups/customer-edit/customer-edit.component';
import { CustomerCreateComponent } from './popups/customer-create/customer-create.component';
import { CustomerDeleteComponent } from './popups/customer-delete/customer-delete.component';
import { ProductMultichoiceComponent } from './popups/product-multichoice/product-multichoice.component';
import { SaleCreateComponent } from './components/sale-create/sale-create.component';
import { CustomerChoiceComponent } from './popups/customer-choice/customer-choice.component';

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
    CustomerDeleteComponent,
    ProductMultichoiceComponent,
    SaleCreateComponent,
    CustomerChoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (): string | any => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: [
          'localhost:8000',
        ],
        blacklistedRoutes: [
          'http://localhost:8000/login/',
          'http://localhost:8000/refresh/',
        ]
      }
    }),
    BrowserAnimationsModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
