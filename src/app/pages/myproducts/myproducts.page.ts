import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { User } from 'firebase';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.page.html',
  styleUrls: ['./myproducts.page.scss'],
})
export class MyproductsPage implements OnInit {


private loading: any;
public products = new Array<Product>();
public productsUser = new Array<Product>();
public user :User;
private productsSubscription: Subscription;
private userSubscription: Subscription;
private userId:string
constructor(
  private authService: AuthService,
  private loadingCtrl: LoadingController,
  private productService: ProductService,
  private toastCtrl: ToastController,  
  public actionSheetController: ActionSheetController,
  private router:Router) {
  
    this.userId = this.authService.getAuth().currentUser.uid;
   console.log(this.userId); 
}
ngOnInit() { 
  this.userId = this.authService.getAuth().currentUser.uid;
  console.log(this.userId);
this.productsSubscription = this.productService.getProducts().subscribe(data => {
    this.products = data;
    for (var val in this.products){
      if(this.products[val].userId==this.userId){
        this.productsUser.push(this.products[val])
       }
    }
  });
}



ngOnDestroy() {
  this.productsSubscription.unsubscribe();

}

async logout() {
  await this.presentLoading();
  try {
    await this.authService.logout();
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
    this.presentToast('Erro ao tentar deletar');
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