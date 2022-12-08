import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/Product';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product = new Product();
  products = new Array<Product>();
  productToUpdate: Product= new Product();
  ProductForm: FormGroup;
  submitted=false;
  showAddProduct = false;
  
  @ViewChild('closeModal') closebutton;

   constructor (private commonservice: CommonService, public formGroup: FormBuilder){
    this.ProductForm = this.formGroup.group({
      pName:['',Validators.required],
      pMfdDate:['',Validators.required],
      pPrice:['', Validators.required]
    })
   }

   ngOnInit(){
    this.getProduct();
   }
   onSubmit(){
    this.submitted=true;
    if(this.ProductForm.invalid){
      return;
    }
    alert('success')
   }

   resetProductForm() {
    this.ProductForm.reset();
    this.ProductForm.updateValueAndValidity();
  }

   OpenAddProduct() {
    this.showAddProduct = true;
  }

   AddProduct(){
    const productObj= {
      pName: this.ProductForm.controls['pName'].getRawValue(),
      pMfdDate: this.ProductForm.controls['pMfdDate'].getRawValue(),
      pPrice: this.ProductForm.controls['pPrice'].getRawValue()
    }
    if(this.ProductForm.valid){
    this.commonservice.addProduct(productObj).subscribe((response: any) => {
      alert("Product Added Successfully")
      this.closebutton.nativeElement.click();
      this.resetProductForm();
      this.getProduct();
     });
     (err) => {
      console.log(err);
    }
    }
    (err) => {
      console.log(err);
    }
   }

   resetProductModal()
 {
  this.ProductForm.reset();
 } 

   getProduct(){
   this.commonservice.getAllProducts().subscribe(
    (res:any) =>{
      console.log(res);
      let productList = res;
      this.products= productList.filter(x=>x.isActive==true);
    },
    (err:any) =>{
      console.log(err);
    }
  );
  }
  EditProductDetails( id:number ){
    this.commonservice.getProductById(id).subscribe(
     (res:any) =>{
      this.productToUpdate=res;
     });

  }
  UpdateProduct(){
    this.commonservice.updateProduct(this.productToUpdate.prod_id,this.productToUpdate).subscribe((response: any) => {
      console.log(response);
      this.getProduct();
     });
  }

  GetIdToDelete(productId: number){
    this.product.prod_id=productId;

  }

  deleteProduct(){
    this.commonservice.deleteProduct(this.product.prod_id).subscribe(res=>{
      console.log(res);
      this.Clear();
      this.getProduct();
    })
  }
  Clear(){
    this.product.prod_id=0;
  }
}
