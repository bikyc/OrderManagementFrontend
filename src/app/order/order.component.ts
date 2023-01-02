import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowContainerHeightService } from 'ag-grid-community/dist/lib/rendering/rowContainerHeightService';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { CommonService } from '../Shared/common.service';
import * as moment from 'moment';


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
  products = new Array<Product>();
  selectedProduct = new Product();
  orderToUpdate: Order = new Order();
  orderStatusToUpdate: Order = new Order();
  orderRate: any;
  price: any;
  submitted = false;
  OrderForm: FormGroup;
  CustomerForm: FormGroup;
  ProductForm: FormGroup;
  orderQuantity: any;
  showAddOrder: boolean = false;
  selectedCustomer: string = '';

  @ViewChild('closeModal') closebutton;
  CustomersList: any;

  constructor(
    private commonservice: CommonService,
    public formGroup: FormBuilder
  ) {
    this.OrderForm = this.formGroup.group({
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      customercust_id: ['', Validators.required],
      productId: ['', Validators.required],
      pPrice: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCustomer();
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

  resetOrderForm() {
    this.OrderForm.reset(); // reset the form
    this.OrderForm.updateValueAndValidity(); // reset the validity of te form
  }
  OpenAddOrder() {
    this.showAddOrder = true; //open the add new order form
  }

  AddOrder() {
    const orderObj = {
      customercust_id:
        +this.OrderForm.controls['customercust_id'].getRawValue(),
      productId: +this.OrderForm.controls['productId'].getRawValue(),
      totalPrice: this.OrderForm.controls['totalPrice'].getRawValue(),
      quantity: this.OrderForm.controls['quantity'].getRawValue(),
      orderStatus: this.OrderForm.controls['orderStatus'].getRawValue(),
      
    };
    if (this.OrderForm.valid) {
      this.commonservice.addOrder(orderObj).subscribe(
        (response: any) => {
          console.log(response);
          this.closebutton.nativeElement.click(); // on clicking x icon add new order form is closed
          this.showAddOrder = false; // add new order form is closed
          this.resetOrderForm(); // entered data in add new order form is reset
          this.getOrders(); // list of order is displayed
        },
        (err) => {
          console.log(err);
          // this.closebutton.nativeElement.click();
        }
      );
    }
  }
  resetOrderModal() {
    this.OrderForm.reset(); // entered data in add new order form is reset
  }

  getOrders() {
    this.commonservice.getAllOrders().subscribe(
      (res: any) => {
        console.log(res);
        let orderList = res;
        this.Orders = orderList.filter((x) => x.isActive == true); // filter the list of orders that are active
        this.rowData = this.Orders;
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
        let CustomersList = res;
        this.customers = CustomersList.filter((x) => x.isActive == true);
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
  onCustomerChange($event: any) {
    this.OrderForm.controls['customercust_id'].setValue($event.target.value);
  }

  // on selecting product its price should be auto populated
  onProductChange($event: any) {
    if (this.selectedProduct != null) {
      this.OrderForm.controls['productId'].setValue($event.target.value);
      this.order.price = this.products.find(
        (x) => x.prod_id == +$event.target.value
      ).pPrice;
      this.OrderForm.controls['pPrice'].setValue(this.order.price);
    }
  }

  onQuantityChange() {
    // this.order.totalPrice= this.order.quantity*this.order.price;
    this.OrderForm.controls['totalPrice'].setValue(
      this.OrderForm.controls['pPrice'].value *
        this.OrderForm.controls['quantity'].value
    );
  }
  EditOrderDetails(order: Order) {
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

  UpdateOrder() {
    this.commonservice
      .updateOrder(this.orderToUpdate.order_id, this.orderToUpdate)
      .subscribe((res: any) => {
        console.log(res);
        this.getOrders();
      });
  }

  UpdateOrderStatus(id, orderstatus) {
    this.commonservice
      .updateOrderStatus(id, orderstatus)
      .subscribe((res: any) => {
        console.log(res);
        this.getOrders();
      });
  }

  getOrderIdForDelete(id: number) {
    this.order.order_id = id;
  }

  deleteOrder() {
    this.commonservice
      .deleteOrder(this.order.order_id)
      .subscribe((res: any) => {
        console.log(res);
        this.clear();
        this.getOrders();
      });
  }
  clear() {
    this.order.order_id = 0; // clears the id of the product that is to be deleted
  }

  // to display the column name in the ag grid
  columnDefs = [
    {
      headerName: '#',
      valueGetter: 'node.rowIndex + 1',
      width: 40,
      height: 40,
    },
    {
      headerName: 'Customer Name',
      field: 'customer.name',
      sortable: true,
      filter: true,
      width: 180,
    },
    {
      headerName: 'Product Name',
      field: 'product.pName',
      sortable: true,
      filter: true,
      wrapText: true,
      autoHeight: true,
      width: 180,
    },
    {
      headerName: 'Ordered Date',
      field: 'orderDate',
      sortable: true,
      filter: true,
      width: 150,
      cellRenderer: this.OrderDateFormatter
    },
    {
      headerName: 'Price',
      field: 'product.pPrice',
      sortable: true,
      filter: true,
      width: 180,
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      headerName: 'Total Price',
      field: 'totalPrice',
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: 'Status',
      field: 'orderStatus',
      sortable: true,
      filter: true,
      width: 120,
    },

    {
      headerName: 'Action',
      cellRenderer: this.BtnRen,
      width: 250,
      autoHeight: true
    },
  ];
  rowData = [];

  // to display order date only in the ag grid
  OrderDateFormatter(params){
    return moment(params.data.orderDate).format('YYYY-MM-DD');
  }


  // to display buttons in the ag grid
  BtnRen(data: any) {
    switch (data.data.orderStatus){
      case "completed":
        {return `
        <button disabled type="button" class="btn btn-sm btn-danger" data-action-type="Cancel" data-bs-toggle="modal"
        >Cancel</button>
        <button disabled type="button" class="btn btn-sm btn-success" data-action-type="completed" data-bs-toggle="modal"
        >Completed</button>
        <button disabled type="button" class="btn btn-sm btn-danger" data-action-type="Delete" data-bs-toggle="modal"
        data-bs-target="#DeleteModal">Delete</button>`
        ;}
        break;
    
    case 'canceled':
      {
        return `
           <button disabled type="button" class="btn btn-sm btn-danger" data-action-type="Cancel" data-bs-toggle="modal"
           >Cancel</button>
           <button disabled type="button" class="btn btn-sm btn-success" data-action-type="completed" data-bs-toggle="modal"
           >Completed</button>
           <button  type="button" class="btn btn-sm btn-danger" data-action-type="Delete" data-bs-toggle="modal"
           data-bs-target="#DeleteModal">Delete</button>`
           ;
      }
      case 'pending':
        {
          return `
           <button type="button" class="btn btn-sm btn-danger" data-action-type="Cancel" data-bs-toggle="modal"
           >Cancel</button>
           <button type="button" class="btn btn-sm btn-success" data-action-type="completed" data-bs-toggle="modal"
           >Completed</button>
           <button type="button" class="btn btn-sm btn-danger" data-action-type="Delete" data-bs-toggle="modal"
           data-bs-target="#DeleteModal">Delete</button>`
           ;
        }
    }
      
    // if (data.data.orderStatus !== 'completed') {
    //   return `
    // <button type="button" class="btn btn-sm btn-danger" data-action-type="Cancel" data-bs-toggle="modal"
    // >Cancel</button>
    // <button type="button" class="btn btn-sm btn-success" data-action-type="completed" data-bs-toggle="modal"
    // >Completed</button>
    // <button type="button" class="btn btn-sm btn-danger" data-action-type="Delete" data-bs-toggle="modal"
    // data-bs-target="#DeleteModal">Delete</button>`
    // ;
    // }

    return null;
  }
  onCellClicked($event: any) {
    console.log($event);
    const data = $event.event.target.getAttribute('data-action-type');
    console.log(data);
    //alert('delete is clicked');
    // this.getOrderIdForDelete($event.data.order_id);
    switch (data) {
      case 'completed': {
        this.UpdateOrderStatus($event.data.order_id, 'completed');
        break;
      }
      case 'Cancel': {
        alert('cancel is clicked');
        this.UpdateOrderStatus($event.data.order_id, 'canceled');
        break;
      }
    }
  }
}
