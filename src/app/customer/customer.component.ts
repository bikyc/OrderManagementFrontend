import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/Customer';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  customer = new Customer();
  customers = new Array<Customer>();
  customerToUpdate: Customer= new Customer();
  customerListAfterDelete : Customer= new Customer();
  constructor (private commonservice: CommonService)
  {}


  ngOnInit(){
      this.getCustomer();
    }
  AddCustomer(){
   
     this.commonservice.addCustomer(this.customer).subscribe((response: any) => {
      console.log(response);
     });
   //this.CommonService.AddCustomer(this.customer).subscribe(
     
   }
   getCustomer(){
   
   this.commonservice.getAllCustomer().subscribe(
    (res:any) =>{
      console.log(res);
      let customerList = res;
      this.customers= customerList.filter(x=>x.isActive==true);
    },
    (err:any) =>{
      console.log(err);
    });
   }

   EditCustomerDetails( id:number ){
    this.commonservice.getCustomerById(id).subscribe(
     (res:any) =>{
      this.customerToUpdate=res;
     });

  }
   UpdateCustomer(){
    this.commonservice.updateCustomer(this.customerToUpdate.cust_id,this.customerToUpdate).subscribe((response: any) => {
      console.log(response);
      this.getCustomer();
     });
    }

    deleteCustomer(id:any){
       
      this.commonservice.deleteCustomer(this.customerListAfterDelete.cust_id, this.customerListAfterDelete).subscribe((response: any) => {
        console.log(response);
        this.getCustomer();
       });
      }


}
