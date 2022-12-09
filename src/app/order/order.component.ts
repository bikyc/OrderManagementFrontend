import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedProduct = new Product();
  orderToUpdate: Order= new Order();
  orderRate:any;
  price:any;
  submitted= false;
  OrderForm : FormGroup;
  CustomerForm: FormGroup;
  ProductForm: FormGroup;
  orderQuantity:any;
  showAddOrder: boolean= false;
  selectedCustomer: string = "";

  @ViewChild('closeModal') closebutton;

  constructor(private commonservice: CommonService,
     public formGroup: FormBuilder) {
    this.OrderForm = this.formGroup.group({
   
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      customercust_id: ['', Validators.required],
      productId: ['', Validators.required],
      pPrice: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getCustomer()
    this.getOrders();
    this.getProducts();
  }
  // onSubmit(){
  //   this.submitted=true;
  //   if(this.OrderForm.invalid){
  //     return;
  //   }
  //   alert('success')
  //  }

   resetOrderForm()
   {
    this.OrderForm.reset(); // reset the form 
    this.OrderForm.updateValueAndValidity(); // reset the validity of te form 
   }
   OpenAddOrder() {
    this.showAddOrder = true //open the add new order form 
  }

  
  AddOrder() {

    const orderObj ={
      customercust_id: +this.OrderForm.controls['customercust_id'].getRawValue(),
      productId: +this.OrderForm.controls['productId'].getRawValue(),
      totalPrice: this.OrderForm.controls['totalPrice'].getRawValue(),
      quantity: this.OrderForm.controls['quantity'].getRawValue(),
    };
    if (this.OrderForm.valid) {
      this.commonservice.addOrder(orderObj).subscribe((response: any) => {
        console.log(response);
        this.closebutton.nativeElement.click(); // on clicking x icon add new order form is closed 
        this.showAddOrder= false; // add new order form is closed
        this.resetOrderForm(); // entered data in add new order form is reset 
        this.getOrders();  // list of order is displayed 
      },err =>{
       console.log(err);
      // this.closebutton.nativeElement.click();
      });
    }
  }
  resetOrderModal(){
    this.OrderForm.reset();  // entered data in add new order form is reset 
  }

  getOrders() {
    this.commonservice.getAllOrders().subscribe(
      (res: any) => {
        console.log(res);
        let orderList = res;
        this.Orders= orderList.filter(x=>x.isActive==true);  // filter the list of orders that are active
      },
      (err: any) => {
        console.log(err);
      }
    );
    // to get customer name
  }
// get customer name from customer table 
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

  // get product name and price from product tabel 
  getProducts() {
    this.commonservice.getAllProducts().subscribe(
      (res: any) => {
        console.log(res);
        this.products = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  onCustomerChange($event: any){
   this.OrderForm.controls['customercust_id'].setValue($event.target.value);
  }  

  // on selecting product its price should be auto populated 
  onProductChange($event:any){
    if(this.selectedProduct!=null){

    this.OrderForm.controls['productId'].setValue($event.target.value);
    this.order.price=this.products.find(x => x.prod_id == +($event.target.value)).pPrice;
    this.OrderForm.controls['pPrice'].setValue(this.order.price);
    }
  }
    
  
  onQuantityChange(){
    // this.order.totalPrice= this.order.quantity*this.order.price;
    this.OrderForm.controls['totalPrice'].setValue(this.OrderForm.controls['pPrice'].value*this.OrderForm.controls['quantity'].value);
  }
   EditOrderDetails(order: Order){
    console.log(order);
    // this.commonservice.getOrderById(order.order_id).subscribe(
    //   (res:any)=> {
    //     this.orderToUpdate = res;
    //     console.log(this.orderToUpdate);
    //     this.orderQuantity=this.orderToUpdate[0].quantity;
    //     this.orderRate=this.orderToUpdate[0].product.pPrice;
    //     this.selectedCustomer=this.orderToUpdate[0].customer;
    //     this.selectedProduct=this.orderToUpdate[0].product;
    //   });
    this.orderQuantity = order.quantity;
    this.selectedCustomer = order.customer.name;
    this.selectedProduct = order.product;
    this.orderRate = order.product.pPrice;

   }

   UpdateOrder(){
    this.commonservice.updateOrder(this.orderToUpdate.order_id, this.orderToUpdate).subscribe(
      (res:any)=>{
        console.log(res);
        this.getOrders();
      });
   }

   getOrderIdForDelete(id: number){
      this.order.order_id = id;
   }

   deleteOrder(){
    this.commonservice.deleteOrder(this.order.order_id).subscribe((res: any) => {
      console.log(res);
      this.clear();
      this.getOrders();
    })
   }
   clear(){
    this.order.order_id=0;  // clears the id of the product that is to be deleted
   }
}
