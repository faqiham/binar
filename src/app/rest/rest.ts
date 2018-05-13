import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  baseUrl:string = "https://cors-anywhere.herokuapp.com/https://test-binar.herokuapp.com/";
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  getData(){
    var headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': localStorage.getItem('token') });
    return this.http.get(this.baseUrl + 'v1/products',{ headers: headers });
  }

  login(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + 'auth/login', JSON.stringify(data),{ headers: headers });
  }
  register(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + 'auth/signup', JSON.stringify(data),{ headers: headers });
  }
  createProducts(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': localStorage.getItem('token') });
    return this.http.post(this.baseUrl + 'v1/products', JSON.stringify(data),{ headers: headers });
  }
  updateProducts(data) {
    delete data.updated_at;
    delete data.created_at;
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': localStorage.getItem('token') });
    return this.http.put(this.baseUrl + 'v1/products/'+data.id, JSON.stringify(data),{ headers: headers });
  }
  deleteProduct(data){
    var headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' , 'Content-Type': 'application/json','Authorization': localStorage.getItem('token') });
    return this.http.delete(this.baseUrl + 'v1/products/'+data.id,{ headers: headers });
  }
  
}
