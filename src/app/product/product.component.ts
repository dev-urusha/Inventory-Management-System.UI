import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerQuantity: number;
  quantity: number;
  totalPrice: number;
  totalQuantities: number;
  stockKeepingUnitId: string;
  stockKeepingUnitName: string;
  categoryId: string;
  categoryName: string;
  supplierId: string;
  supplierName: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'pricePerQuantity', 'quantity', 'totalPrice', 'stockKeepingUnitName', 'categoryName', 'supplierName', 'actions'];
  
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (response) => {
       // console.log('API Response:', response); // Debugging
  
        if (response && response.statusCode === 200) {
          console.log('API Data:', response.data); // Debugging
  
          if (Array.isArray(response.data)) {
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            console.error('Data is not an array:', response.data);
          }
        } else {
          console.warn('Unexpected API Response:', response);
        }
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewProduct(productId: string) {
    this.router.navigate(['/dashboard/product/view', productId]); 
  }

  addProduct() {
    this.router.navigate(['/product/add']);
  }

  downloadExcel() {
    // Implement download functionality here
    console.log('Download button clicked');
  }

  uploadExcel() {
    // Implement upload functionality here
    console.log('Upload button clicked');
  }
}