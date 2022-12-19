import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { AuthGuardService } from './Shared/auth-guard.service';

const routes: Routes = [
  {path:'customer', component:CustomerComponent,canActivate:[AuthGuardService]},
  {path:'order', component:OrderComponent},
  {path:'product', component:ProductComponent},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'',component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
