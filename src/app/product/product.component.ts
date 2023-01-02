import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Product } from '../models/Product';
import { CommonService } from '../Shared/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product = new Product();
  products = new Array<Product>();
  productToUpdate: Product = new Product();
  ProductForm: FormGroup;
  submitted = false;
  showAddProduct = false;
  isEditing: boolean = false;
  isEditingAdding: boolean = false;
  isCreating: boolean = true;

  @ViewChild('closeModal') closebutton;
  mode = 'add';
  deleteProductPopUp: boolean = false;

  constructor(
    private commonservice: CommonService,
    public formGroup: FormBuilder
  ) {
    this.ProductForm = this.formGroup.group({
      pName: ['', Validators.required],
      pMfdDate: ['', Validators.required],
      pPrice: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getProduct();
  }
  onSubmit() {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }
    alert('success');
  }

  OpenAddProduct() {
    this.showAddProduct = true;
    this.mode ='add';
    this.isCreating = true;
    this.isEditingAdding = true;
    this.isEditing = false;
  }
  resetProductForm() {
    this.showAddProduct = false;
    this.isEditingAdding=false;
    this.ProductForm.reset();
    this.ProductForm.updateValueAndValidity();
  }

  // AddProduct() {
  //   const productObj = {
  //     pName: this.ProductForm.controls['pName'].getRawValue(),
  //     pMfdDate: this.ProductForm.controls['pMfdDate'].getRawValue(),
  //     pPrice: this.ProductForm.controls['pPrice'].getRawValue(),
  //   };
  //   if (this.ProductForm.valid) {
  //     this.commonservice.addProduct(productObj).subscribe((response: any) => {
  //       alert('Product Added Successfully');
  //       this.closebutton.nativeElement.click();
  //       this.resetProductForm();
  //       this.getProduct();
  //     });
  //     (err) => {
  //       console.log(err);
  //     };
  //   }
  //   (err) => {
  //     console.log(err);
  //   };
  // }

  resetProductModal() {
    this.ProductForm.reset();
  }

  getProduct() {
    this.commonservice.getAllProducts().subscribe(
      (res: any) => {
        console.log(res);
        let productList = res;
        this.products = productList.filter((x) => x.isActive == true);
        this.rowData = this.products;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  EditProductDetails(p) {
    // this.commonservice.getProductById(id).subscribe((res: any) => {
    //   this.productToUpdate = res;
    // });
    this.showAddProduct = true;
    this.isEditing = true;
    this.isEditingAdding = true;
    this.isCreating = false;
    this.mode ='edit';
    this.productToUpdate = p;
  }
  UpdateProduct() {
    this.commonservice
      .updateProduct(this.productToUpdate.prod_id, this.productToUpdate)
      .subscribe((response: any) => {
        console.log(response);
        this.getProduct();
        this.isEditingAdding=false;
      });
  }

  GetIdToDelete(productId: number) {
    this.product.prod_id = productId;
    this.deleteProductPopUp = true;
  }
  deleteProduct() {
    this.commonservice
      .deleteProduct(this.product.prod_id)
      .subscribe((res: any) => {
        if ((res.Status = 'OK')) {
          console.log(res);
          this.Clear();
          this.showAddProduct = false;
          this.getProduct();
        }
      });
  }
  Clear() {
    this.product.prod_id = 0;
  }

  onProductAddOrUpdateCallback($event) {
    console.log($event);
    if ($event && $event.message === 'success') {
      this.closebutton.nativeElement.click(); //
      this.getProduct();
    }
  }

  columnDefs = [
    {
      headerName: '#',
      valueGetter: 'node.rowIndex + 1',
      width: 40,
      height: 40,
    },
    {
      headerName: 'Product Name',
      field: 'pName',
      sortable: true,
      wrapText: true,
      autoHeight: true,
      //autoWidth: true,
      filter: true,
      width: 180,
    },
    {
      headerName: 'Manufactured Date',
      field: 'pMfdDate',
      cellRenderer: this.ManufactureDateFormatter,
      sortable: true,
      filter: true,
      wrapText: true,
      autoHeight: true,
      width: 180,
    },
    {
      headerName: 'Price',
      field: 'pPrice',
      sortable: true,
      filter: true,
      width: 150,
    },

    {
      headerName: 'Action',
      cellRenderer: this.BtnRen,
      width: 250,
      autoHeight: true,
    },
  ];
  rowData = [];

  ManufactureDateFormatter(params) {
    return moment(params.data.pMfdDate).format('YYYY-MM-DD');
  }

  BtnRen(data: any) {
    return `
        <button  type="button" class="btn btn-sm btn-primary"" data-action-type="Edit" data-bs-toggle="modal"
        data-bs-target="#AddUpdateModal" data-bs-whatever="@getbootstrap"
        >Edit</button>
        <button  type="button" class="btn btn-sm btn-danger" data-action-type="Delete" data-bs-toggle="modal" 
        data-bs-target="#DeleteModal">Delete</button>`;
  }

  onCellClicked($event: any) {
    console.log($event);
    const data = $event.event.target.getAttribute('data-action-type');
    console.log(data);
    switch (data) {
      case 'Edit': {
        //alert('view is clicked');
        //console.log($event.data);
        this.EditProductDetails($event.data);
        break;
      }
      case 'Delete': {
        //alert('delete is clicked');
        this.GetIdToDelete($event.data.prod_id);
        break;
      }
    }
  }
}
