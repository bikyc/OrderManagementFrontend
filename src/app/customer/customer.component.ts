import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Customer } from '../models/Customer';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  customers = new Array<Customer>();
  customerToUpdate: Customer = new Customer();
  customerListAfterDelete: Customer = new Customer();
  CustomerForm: FormGroup;
  submitted = false;
  showAddCustomer = false;
  isEditing: boolean = false;
  isCreating: boolean = true;

  @ViewChild('closeModal') closebutton;
  mode = 'add';

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

  ngOnInit() {
    this.getCustomer();
  }
  // onSubmit() {
  //   this.submitted = true;
  //   if (this.CustomerForm.invalid) {
  //     return;
  //   }
  //   alert('success');
  // }

  OpenAddCustomer() {
    this.mode = 'add';
    this.showAddCustomer = true;
    this.isCreating = true;
    this.isEditing = false;
  }

  resetCustomereForm() {
    this.showAddCustomer=false;
    this.CustomerForm.reset();
    this.CustomerForm.updateValueAndValidity();
  }

  // AddCustomer() {
  //   const customerObj = {
  //     name: this.CustomerForm.controls['name'].getRawValue(),
  //     address: this.CustomerForm.controls['address'].getRawValue(),
  //     email: this.CustomerForm.controls['email'].getRawValue(),
  //   };
  //   if (this.CustomerForm.valid) {
  //     this.commonservice.addCustomer(customerObj).subscribe(
  //       (response: any) => {
  //         this.closebutton.nativeElement.click(); // 
  //         this.resetCustomereForm();
  //         this.getCustomer();
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

  getCustomer() {
    this.commonservice.getAllCustomer().subscribe(
      (res: any) => {
        console.log(res);
        let customerList = res;
        this.customers = customerList.filter((x) => x.isActive == true);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  EditCustomerDetails(c : Customer) {
    // this.commonservice.getCustomerById(c.cust_id).subscribe((res: any) => {
    //   this.customerToUpdate = res;
    // });
    this.showAddCustomer = true;
    this.isEditing = true;
    this.isCreating = false;
    this.mode = 'edit';
    this.customerToUpdate = c;

  }
  UpdateCustomer() {
    this.commonservice
      .updateCustomer(this.customerToUpdate.cust_id, this.customerToUpdate)
      .subscribe((response: any) => {
        console.log(response);
        this.getCustomer();
      });
  }

  getCustomerIdForDelete(id: number) {
    this.customer.cust_id = id;
  }

  deleteCustomer() {
    this.commonservice
      .deleteCustomer(this.customer.cust_id)
      .subscribe((response: any) => {
        console.log(response);
        this.clear();
        this.getCustomer();
      });
  }
  clear() {
    this.customer.cust_id = 0;
  }

  onCustomerAddOrUpdateCallback($event){
    console.log($event);
    if($event && $event.message === 'success'){
      this.closebutton.nativeElement.click(); // 
      this.getCustomer();
    }
  }

}
