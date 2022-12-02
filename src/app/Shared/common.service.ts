import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { Product } from '../models/Product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  serviceURL: string;
  postId: any;
  constructor(private httpClient: HttpClient) { 
    this.serviceURL="https://localhost:44335/api"

  }
//Customer service
   addCustomer(customer: Customer) :  Observable<any>{
    return this.httpClient.post(this.serviceURL + '/Customer/AddCustomer', customer, httpOptions);
      }


  getAllCustomer(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.serviceURL +'/Customer/GetCustomer', httpOptions);
  }

  getCustomerById(id:number): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.serviceURL + '/Customer/GetCustomerById/'+id, httpOptions);
  }

  updateCustomer(id:number,customerToUpdate): Observable<any>{
    return this.httpClient.put(this.serviceURL + '/Customer/UpdateCustomerById/'+id,customerToUpdate,httpOptions);
  }

  deleteCustomer(id:number, customerListAfterDelete){
    return this.httpClient.put(this.serviceURL + '/Customer/HideCustomerById/' +id, customerListAfterDelete, httpOptions)
  }


  //  Product service 
  addProduct(product: Product): Observable<any>{
    return this.httpClient.post(this.serviceURL+ '/Product/AddProduct', product, httpOptions );
  }


  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.serviceURL + '/Product/GetProduct', httpOptions);
  }

  updateProduct(id:number,productToUpdate): Observable<any>{
    return this.httpClient.put(this.serviceURL + '/Product/UpdateProductById/'+id,productToUpdate,httpOptions);
  }

  getProductById(id:number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.serviceURL + '/Product/GetProductById/'+id, httpOptions);
  }
    //  Order service 
    addOrder(order: Order): Observable<any>{
      return this.httpClient.post(this.serviceURL+ '/Order/AddOrder', order, httpOptions );
    }
  
  
    getAllOrders(): Observable<Order[]> {
      return this.httpClient.get<Order[]>(this.serviceURL + '/Order/GetOrders', httpOptions);
    }

    updateOrder(id:number,orderToUpdate): Observable<any>{
      return this.httpClient.put(this.serviceURL + '/Order/UpdateOrderById/'+id,orderToUpdate,httpOptions);
    }
  
    getOrderById(id:number): Observable<Order[]> {
      return this.httpClient.get<Order[]>(this.serviceURL + '/Order/GetorderById/'+id, httpOptions);
    }

    
  
}