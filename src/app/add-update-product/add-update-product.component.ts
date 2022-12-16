import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/Product';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddupdateproductComponent {
  submitted= false;
  OrderForm : FormGroup;
  CustomerForm: FormGroup;
  ProductForm: FormGroup;
  isEditing: boolean = false;
   isCreating: boolean = true;
  @Input('mode')
  mode = "add ";
  
  @Input('product')
  product = new Product();

  @Output("on-product-add-update")
  onProductAddOrUpdate = new EventEmitter<object>();

  @ViewChild('closeModal') closebutton;

   constructor (private commonservice: CommonService, public formGroup: FormBuilder){
    this.ProductForm = this.formGroup.group({
      pName:['',Validators.required],
      pMfdDate:['',Validators.required],
      pPrice:['', Validators.required]
    })
   }

  ngOnInit(){
    // console.log(this.mode);
    console.log(this.product);
    if(this.product && this.product.prod_id > 0){
      this.ProductForm.get('pName').setValue(this.product.pName);
      this.ProductForm.get('pMfdDate').setValue(this.product.pMfdDate);
      this.ProductForm.get('pPrice').setValue(this.product.pPrice);

    }
  }
  
   AddOrUpdateProduct(){
    if(this.mode === 'add'){
      this.AddProduct();
    }else{
      this.UpdateProduct(this.product.prod_id);
    }
   }
   
   AddProduct(){
    const productObj= {
      pName: this.ProductForm.controls['pName'].getRawValue(),
      pMfdDate: this.ProductForm.controls['pMfdDate'].getRawValue(),
      pPrice: this.ProductForm.controls['pPrice'].getRawValue()
    }
    if(this.ProductForm.valid){
    this.commonservice.addProduct(productObj).subscribe(
      (response: any) => {
      this.resetProductForm();
      this.onProductAddOrUpdate.emit({message:'success'});
      this.closebutton.nativeElement.click();
      
     });
     (err) => {
      console.log(err);
    }
    }
    (err) => {
      console.log(err);
    }
   }
   resetProductForm() {
    this.ProductForm.reset();
    this.ProductForm.updateValueAndValidity();
  }

  UpdateProduct(prod_id: number){
    const productObj= {
      pName: this.ProductForm.controls['pName'].getRawValue(),
      pMfdDate: this.ProductForm.controls['pMfdDate'].getRawValue(),
      pPrice: this.ProductForm.controls['pPrice'].getRawValue()
    };
    
    this.commonservice
      .updateProduct(prod_id, productObj)
      .subscribe((response: any) => {
        console.log(response);
        this.resetProductForm();
          this.onProductAddOrUpdate .emit({message:'success'});
      }, (err)=>{
        console.log(err);
      });
  }
}
