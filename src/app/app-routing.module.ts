import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/Client/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/simpleUser/login/login.module#LoginPageModule', canActivate: [LoggedGuard] },
  { path: 'details/:id', loadChildren: './pages/Client/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'registre', loadChildren: './pages/simpleUser/registre/registre.module#RegistrePageModule' },
  { path: 'myproducts/:id', loadChildren: './pages/Provider/myproducts/myproducts.module#MyproductsPageModule' },
  { path: 'edit-products/:id', loadChildren: './pages/Provider/edit-products/edit-products.module#EditProductsPageModule' },
  { path: 'add-products', loadChildren: './pages/Provider/add-products/add-products.module#AddProductsPageModule' },
  { path: 'cart-modal', loadChildren: './pages/Client/cart-modal/cart-modal.module#CartModalPageModule' },
  { path: 'list-order/:id', loadChildren: './pages/Client/list-order/list-order.module#ListOrderPageModule' },
  { path: 'detail-order/:id', loadChildren: './pages/Client/detail-order/detail-order.module#DetailOrderPageModule' },
  { path: 'edit-user-profil/:email', loadChildren: './pages/simpleUser/edit-user-profil/edit-user-profil.module#EditUserProfilPageModule' },
  { path: 'order-provider/:id', loadChildren: './pages/Provider/order-provider/order-provider.module#OrderProviderPageModule' },
  { path: 'detail-order-provider/:id', loadChildren: './pages/Provider/detail-order-provider/detail-order-provider.module#DetailOrderProviderPageModule' },
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }