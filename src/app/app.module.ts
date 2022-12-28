import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddUpdateCustomerComponent } from './add-update-customer/add-update-customer.component';
import { AddupdateproductComponent } from './add-update-product/add-update-product.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeadersInterceptor } from './headers.interceptor';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    OrderComponent,
    ProductComponent,
    AddUpdateCustomerComponent,
    AddupdateproductComponent,
    LoginComponent,
    HomeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AgGridModule.withComponents([ButtonRendererComponent])
    AgGridModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor  ,
    multi: true}  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
