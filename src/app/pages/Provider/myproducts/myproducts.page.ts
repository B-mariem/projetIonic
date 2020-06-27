import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'firebase';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.page.html',
  styleUrls: ['./myproducts.page.scss'],
})
export class MyproductsPage implements OnInit {


private loading: any;
public products :any;
public productsUser = new Array<Product>();
public user :User;
private userId:string

constructor(
  private authService: AuthService,
  private loadingCtrl: LoadingController,
  private productService: ProductService,
  private toastCtrl: ToastController,  
  public actionSheetController: ActionSheetController,
  private router:Router,
  private activatedRoute: ActivatedRoute) {
    this.userId = this.activatedRoute.snapshot.params['id'];

   }

ngOnInit() { 
 this.loadProduct()

}
async loadProduct(){
 
  this.productService.getProductUser(this.userId).subscribe(data=>{
    this.products=data;
    })
}
async goToOrders(){
  this.router.navigate(["order-provider",this.userId])
}



async logout() {
  await this.presentLoading();
  try {
    await this.authService.logout();
    this.router.navigate(["login"])
  } catch (error) {
    console.error(error);
  } finally {
    this.loading.dismiss();
  }
}

async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'wait...' });
  return this.loading.present();
}

async deleteProduct(id: string) {
  try {
    await this.productService.deleteProduct(id).then(()=>{
      this.router.navigate(["/myproducts"])
    })
  } catch (error) {
    this.presentToast('error');
  }
}

async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 2000 });
  toast.present();
}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Option',
    buttons: [{
      text: 'Déconnexion',
      role: 'destructive',
      icon: 'log-out',
      handler: () => {
             this.logout()

      },
    }]
  });
  await actionSheet.present();
}

}