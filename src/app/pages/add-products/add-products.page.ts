import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  public product: Product = {};
  private loading: any;
  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,) {
   
  }

  ngOnInit() { }

 


  async saveProduct() {
    await this.presentLoading();
     this.product.createdAt = new Date();
     this.product.userId = this.authService.getAuth().currentUser.uid;

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