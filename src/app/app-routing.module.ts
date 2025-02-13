import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'product', component: ProductComponent }, // Child route for Product
      { path: 'dashboard/product/view/:id', component: ProductFormComponent }, // View Details
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
