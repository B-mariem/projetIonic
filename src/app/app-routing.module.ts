import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'details/:id', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'registre', loadChildren: './pages/registre/registre.module#RegistrePageModule' },
  { path: 'myproducts', loadChildren: './pages/myproducts/myproducts.module#MyproductsPageModule' },
  { path: 'edit-products/:id', loadChildren: './pages/edit-products/edit-products.module#EditProductsPageModule' },
  { path: 'add-products', loadChildren: './pages/add-products/add-products.module#AddProductsPageModule' },
  { path: 'cart-modal', loadChildren: './pages/cart/cart-modal/cart-modal.module#CartModalPageModule' },
  { path: 'list-order/:id', loadChildren: './pages/order/list-order/list-order.module#ListOrderPageModule' },
  { path: 'detail-order/:id', loadChildren: './pages/order/detail-order/detail-order.module#DetailOrderPageModule' },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }