import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataService } from './data.service';
import { HomeComponent } from './home/home.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductcreationComponent } from './productcreation/productcreation.component';
import { EditproductComponent } from './editproduct/editproduct.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'productlist', component: ProductlistComponent},
  {path: 'edit/:id', component: EditproductComponent},
  {path: 'productcreating', component: ProductcreationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
