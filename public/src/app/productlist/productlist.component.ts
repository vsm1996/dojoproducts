import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EditproductComponent } from '../editproduct/editproduct.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: any;
  product: any;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.products= [];
    this.showProducts()
  }

  showProducts(){
    this._data.getProducts()
    .subscribe((products) => {
      console.log("Products received: ", products)
      this.products = products;
      console.log("SHOW PRODUCTS HERE: ", this.products);
    }, (err) => {
      console.log("Error getting products: ", err)
    })
  }

  deleteProduct(id){
    this._data.deleteProduct(id)
    .subscribe((product) => {
      console.log("Successfully deleted product", product);
    }, (err) => {
      console.log("Error deleting product: ", err)
    })
    this.showProducts();
  }
}
