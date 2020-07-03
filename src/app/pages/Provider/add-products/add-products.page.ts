import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import {  Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { CategorieService } from 'src/app/services/categorie.service';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  public product: Product = {};
  public userInfo:User;
  private loading: any;
  private selectedFile: any;
  private userId:any
  private userEmail:string;
  public categories=[]
  constructor(
    private productService: ProductService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private categorieService:CategorieService,
    private router:Router ) { }

  //addProduct

  async saveProduct() {

      await this.presentLoading();
       this.product.createdAt =Date.now();
       this.product.userId = this.authService.getAuth().currentUser.uid;
       this.product.adresse=this.userInfo.adresse
       this.product.tel=this.userInfo.tel
        try {
          await this.productService.addProduct(this.product,this.selectedFile);
          console.log(this.product);
          
          await this.loading.dismiss();
          this.router.navigate(['/myproducts',this.userId]);
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
    ngOnInit() {
      this.userId=this.authService.getAuth().currentUser.uid;
      this.userEmail=this.authService.getAuth().currentUser.email
      this.loadUser(this.userEmail)
      this.loadCatgorie()
     }
  
    loadUser(email) {
      this.authService.getUserInformation(email)
      .subscribe(data => {
        this.userInfo = data[0];
        console.log(this.userInfo);
        
      });
    }
loadCatgorie(){
  this.categorieService.getCategies().subscribe(data=>{
    this.categories=data
  })
}


   chooseFile (event) {
    this.selectedFile = event.target.files
  }
 


}