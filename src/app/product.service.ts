import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:44375/api/v1/ims/Product/GetAllProducts'; 
  private apiProductGetByIdUrl = 'https://localhost:44375/api/v1/ims/Product/GetProductById';
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> 
  {
    return this.http.get<any>(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiProductGetByIdUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product);
  }
}
