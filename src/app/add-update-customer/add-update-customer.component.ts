import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../Shared/common.service';
import { OnInit, ViewChild } from '@angular/core';
import { Customer } from '../models/Customer';


@Component({
  selector: 'app-add-update-customer',
  templateUrl: './add-update-customer.component.html',
  styleUrls: ['./add-update-customer.component.css']
})
export class AddUpdateCustomerComponent implements OnInit{
  CustomerForm: FormGroup;
  submitted = false;
  customerToUpdate: Customer = new Customer();

   isEditing: boolean = false;
   isCreating: boolean = true;

  @Input('mode')
  mode = "add ";
  
  @Input('customer')
  customer = new Customer();

  @Output("on-customer-add-update")
  onCustomerAddOrUpdate = new EventEmitter<object>();

  @ViewChild('closeModal') closebutton;

  
  constructor(
    private commonservice: CommonService,
    public formGroup: FormBuilder) 
    { this.CustomerForm = this.formGroup.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
    });
  }
  ngOnInit(){
    console.log(this.mode);
    console.log(this.customer);
    if(this.customer && this.customer.cust_id > 0){
      this.CustomerForm.get('name').setValue(this.customer.name);
      this.CustomerForm.get('address').setValue(this.customer.address);
      this.CustomerForm.get('email').setValue(this.customer.email);

    }
  }

  resetCustomereForm() {
    this.CustomerForm.reset();
    this.CustomerForm.updateValueAndValidity();
  }

  AddOrUpdateCustomer(){
    if(this.mode === 'add'){
      this.AddCustomer();
    }else{
      this.UpdateCustomer(this.customer.cust_id);
    }
  }
  
  AddCustomer() {
    const customerObj = {
      name: this.CustomerForm.controls['name'].getRawValue(),
      address: this.CustomerForm.controls['address'].getRawValue(),
      email: this.CustomerForm.controls['email'].getRawValue(),
    };
    if (this.CustomerForm.valid) {
      this.commonservice.addCustomer(customerObj).subscribe(
        (response: any) => {
          console.log(response)
          this.resetCustomereForm();
          this.onCustomerAddOrUpdate.emit({message:'success'});
          this.closebutton.nativeElement.click();

        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  UpdateCustomer(custId: number) {
    const customerObj = {
      name: this.CustomerForm.controls['name'].getRawValue(),
      address: this.CustomerForm.controls['address'].getRawValue(),
      email: this.CustomerForm.controls['email'].getRawValue(),
    };
    this.commonservice
      .updateCustomer(custId, customerObj)
      .subscribe((response: any) => {
        console.log(response);
        this.resetCustomereForm();
          this.onCustomerAddOrUpdate.emit({message:'success'});
      }, (err)=>{
        console.log(err);
      });
  

}

}

