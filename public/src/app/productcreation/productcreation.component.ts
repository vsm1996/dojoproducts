import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-productcreation',
  templateUrl: './productcreation.component.html',
  styleUrls: ['./productcreation.component.css']
})
export class ProductcreationComponent implements OnInit {
  createdproduct: any;
  error: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _data: DataService) { }

  ngOnInit() {
    this.createdproduct = {title: '', price: '', image: ''}
  }
 
  createProduct(){
    console.log("Here is our product: ", this.createdproduct);
    this._data.createProduct(this.createdproduct)
    .subscribe((response) => {
      console.log("Respone: ", response);
      if (!response['status']){
        this.error = response;
      }
    }, (err) => {
      console.log("Error making product", err)
    
    this.createdproduct = {title: '', price: '', image: ''}
    })
  }
  goProductList(){
    this._router.navigate(['/productlist'])
  }

}
