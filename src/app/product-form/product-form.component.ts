import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      pricePerQuantity: [0],
      quantity: [0],
      totalQuantities: [0],
      totalPrice: [0],
      stockKeepingUnitName: [''],
      categoryName: [''], 
      supplierName: ['']
    });
  }
  
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id'); 
  
    console.log("Product ID from route:", this.productId); // Debugging
  
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.productForm.patchValue(product);
          } else {
            console.error("Product not found!");
          }
        },
        error: (err) => console.error("Error fetching product:", err)
      });
    }
  }  

  editProduct() {
    this.router.navigate([`/dashboard/product/edit/${this.productId}`]);
  }

  goBack() {
    this.router.navigate(['/dashboard/product']);
  }
}
