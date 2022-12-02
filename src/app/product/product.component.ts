import { Component } from '@angular/core';
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

   constructor (private commonservice: CommonService){}

   ngOnInit(){
    this.getProduct();
   }

   AddProduct(){
    this.commonservice.addProduct(this.product).subscribe((response: any) => {
      console.log(response);
     });
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
}
