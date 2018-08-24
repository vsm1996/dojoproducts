import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getProducts() {
    console.log("getProduct invoked")
    return this._http.get('/products');
  }

  getOneProduct(id) {
    console.log("getOneProduct invoked")
    return this._http.get(`/products/${id}`);
  }

  deleteProduct(id) {
    console.log("deleteProduct invoked")
    return this._http.delete(`/products/${id}`);
  }

  createProduct(obj) {
    console.log("createProduct invoked")
    return this._http.post('/products/', obj);
  }
  
  updateProduct(id, obj) {
    console.log("updateProduct invoked")
    return this._http.put(`/products/update/${id}`, obj);
  }
}
