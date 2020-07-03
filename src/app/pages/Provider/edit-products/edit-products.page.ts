import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { CategorieService } from 'src/app/services/categorie.service';


@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.page.html',
  styleUrls: ['./edit-products.page.scss'],
})
export class EditProductsPage implements OnInit {

  private productId: string = null;
  public product: Product = {};
  private loading: any;
  private productSubscription: Subscription;
  private user:User={};
  categories: { id: string; libelle?: string; }[];
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router:Router,
    private categorieService:CategorieService) {
     
    this.productId = this.activatedRoute.snapshot.params['id'];
this.loadUser()
  }

  ngOnInit() {
  this.loadProduct()
  this.loadCategories();
  //this.loadUser()
   }
loadCategories(){
  this.categorieService.getCategies().subscribe(data=>{
    this.categories=data
  })
}

loadProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

loadUser() {
 this.authService.getUserInformation(this.authService.getAuth().currentUser.email)
    .subscribe(data => {
      this.user = data[0];      
    });
  }
  
async saveProduct() {
    await this.presentLoading();
    this.product.userId = this.authService.getAuth().currentUser.uid;
    this.product.adresse=this.user.adresse
    this.product.tel=this.user.tel
      try {
        await this.productService.updateProduct(this.productId, this.product);
        await this.loading.dismiss();
        this.router.navigate(["myproducts",this.authService.getAuth().currentUser.uid])

      } catch (error) {
        this.presentToast('error');
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
