import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  public product: Product = {};
  public userInfo;
  private loading: any;
  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,) {
      console.log(this.authService.getAuth().currentUser.email);
    
      this.authService.getUserInformation(this.authService.getAuth().currentUser.email)
         .subscribe(data=>{
            this.userInfo=data[0]
           console.log(this.userInfo.adresse);
           
             
                 })
     
    }

  ngOnInit() {

   }

 


  async saveProduct() {

    await this.presentLoading();

     this.product.createdAt =Date.now();

     this.product.userId = this.authService.getAuth().currentUser.uid;
     this.product.adresse=this.userInfo.adresse
     this.product.tel=this.userInfo.tel
    
   
  console.log(this.product);
  
      try {
        await this.productService.addProduct(this.product);
        await this.loading.dismiss();
        this.navCtrl.navigateBack('/myproducts');
      } catch (error) {
        this.presentToast('Error when trying to save');
        this.loading.dismiss();
      }
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'wait...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}