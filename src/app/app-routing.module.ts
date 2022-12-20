import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { AuthGuardService } from './Shared/auth-guard.service';

const routes: Routes = [
  {path:'home/customer', component:CustomerComponent, canActivate:[AuthGuardService]},
  {path:'home/order', component:OrderComponent, canActivate:[AuthGuardService]},
  {path:'home/product', component:ProductComponent, canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'',component:HomeComponent, canActivate:[AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
