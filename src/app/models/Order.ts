import * as moment from "moment";
import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
    order_id: number=0;
    totalPrice: number= 0 ;
    orderDate: Date=new Date();
    // orderDate: Date=moment(Date).format('YYYY-MM-dd');
    // orderDate:string = moment(new Date()).format('YYYY/MM/DD');
    OrderStatus: string='pending';
    quantity: any; number= 0;
    price: number= 0;
    address: string='';
    customerId: number= 0;
    productId: number=0;
    product = new Product();
    customer = new Customer();
}