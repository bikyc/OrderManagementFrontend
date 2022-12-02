import { Component } from '@angular/core';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  order = new Order();
  Orders = new Array<Order>();
  customer = new Customer();
  customers = new Array<Customer>();
  product = new Product();
  products= new Array<Product>();
  selectedProduct= new Product();
  orderToUpdate: Order= new Order();
  constructor(private commonservice: CommonService) {}

  ngOnInit() {
    this.getCustomer()
    this.getOrders();
    this.getProducts();
  }

  AddOrder() {
    this.commonservice.addOrder(this.order).subscribe((response: any) => {
      console.log(response);
    });
  }

  getOrders() {
    this.commonservice.getAllOrders().subscribe(
      (res: any) => {
        console.log(res);
        let orderList = res;
        this.Orders= orderList.filter(x=>x.isActive==true);
      },
      (err: any) => {
        console.log(err);
      }
    );
    // to get customer name
  }

  getCustomer() {
    this.commonservice.getAllCustomer().subscribe(
      (res: any) => {
        console.log(res);
        this.customers = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getProducts() {
    this.commonservice.getAllProducts().subscribe(
      (res: any) => {
        console.log(res);
        let orderList=res;
        this.order=orderList.filter(x=>x.isActive==true)
        this.products = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  onCustomerChange($event: any){
    console.log($event.target.value);
    this.order.customerId = Number($event.target.value);

  }  

  onProductChange( ){
    if(this.selectedProduct!=null){
      this.order.productId=this.selectedProduct.prod_id;
      this.order.price=this.selectedProduct.pPrice;
    }
    // console.log($event.target.value);
    // this.order.productId = Number($event.target.value);
  }
  onQuantityChange(){
    this.order.totalPrice= this.order.quantity*this.order.price;
  }
   EditOrderDetails(id: number){
    this.commonservice.getProductById(id).subscribe(
      (res:any)=> {
        this.orderToUpdate = res;
      });
   }

   UpdateOrder(){
    this.commonservice.updateOrder(this.orderToUpdate.order_id, this.orderToUpdate).subscribe(
      (res:any)=>{
        console.log(res);
        this.getOrders();
      });
   }
}
