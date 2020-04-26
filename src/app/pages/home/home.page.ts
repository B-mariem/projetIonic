import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public products = new Array<Product>();
  public productsUser = new Array<Product>();
  public user :User ={}
  private productsSubscription: Subscription;
  private userSubscription: Subscription;
private userId:string
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,  public actionSheetController: ActionSheetController,) {
     
  }

  ngOnInit() { 
   
   
  
      
    this.userId = this.authService.getAuth().currentUser.uid;
    console.log(this.userId);
   

    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
       
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
      await this.productService.deleteProduct(id);
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