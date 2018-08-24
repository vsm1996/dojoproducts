import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  updatedProduct: any;
  productID: string;
  error: any;
  constructor(
    private _data: DataService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("HERE IS /edit/:id : ", params['id']);
      this.productID = params['id']
  })
  this.getProduct()
  }
  getProduct(){
    this._data.getOneProduct(this.productID)
    .subscribe((product) => {
      console.log("Got our product!!! ", product);
      this.updatedProduct = product;
    }, (err) =>{
      console.log("EDIT: error while getting product!", err)
    })
  }
  editProduct(id, obj){
    console.log("HERES THE SHUZZ", id, obj)
    this._data.updateProduct(id, obj)
    .subscribe((response) => {
      console.log("Respone: ", response);
      if (!response['status']){
        this.error = response;
      }
    }, (err) => {
      console.log("Error updating: ", err)
    })
    this.getProduct()
  }
  goProductList(){
    this._router.navigate(['/productlist'])
  }

}
