import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private loading: any;
  public products = new Array<Product>();
  public user :User ={}
  private productsSubscription: Subscription;
  cart = [];
  cartItemCount: BehaviorSubject<number>;
  userId:string
  email:string
 

  @ViewChild('cart', { read: ElementRef})fab: ElementRef;
  categories: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,
    public actionSheetController: ActionSheetController,
    private cartService: CartService, 
    private router:Router,private categorieService:CategorieService) {
      this.categorieService.getCategies().subscribe(data=>{
        this.categories=data
      })}

    loadProducts():Product[]{
        let allproducts;
      
        this.productsSubscription = this.productService.getProducts().subscribe(data => {
        allproducts=data
          for (var val in allproducts){
            if(allproducts[val].userId!==this.userId){
                  this.products.push(allproducts[val])
                }
                
          }
          
      });
      
      
      return this.products
    }
 async addToCart(product) {
    let object={
      id:product.id,
      name:product.name,
      picture:product.picture,
      price:product.price,
      totalamount:product.totalamount,
      userId:product.userId
    }
    this.cart = this.cartService.getCart();

    if(object.totalamount>0){
      if(this.cart.length==0){
        this.cartService.addToCart(object);
        this.presentToast("the product is added")
      }else{
        for(let p of this.cart){
            if(p.userId===object.userId){      
              this.cartService.addToCart(object);
              this.presentToast("the product is added")

              break;
          }else 
          alert("Same Provider Please")
        }      
      }

    }else{
      alert("this product is not available ")
    }
  }
 
 async openCart() {
    this.router.navigate(["cart-modal"])
  }


  ngOnInit() { 
    this.loadProducts()
  
    this.userId = this.authService.getAuth().currentUser.uid;
    this.email=this.authService.getAuth().currentUser.email;
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    
  }

  filterList(evt) {
   
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }
  this.products = this.products.filter(currentGoal => {
      if (currentGoal.categorie && searchTerm) {
      if (currentGoal.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        return true;
        }
        return false;
      }
    });
  }
  
  goToMyProducts(){
    this.router.navigate(["myproducts",this.userId])  }
  
  

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



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1000 });
    toast.present();
  }
 
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Option',
      buttons: [
        {
          text: 'Profil',
          role: 'destructive',
            icon: 'md-person',
          handler: () => {
                this.router.navigate(["edit-user-profil",this.email])
          },
        },{
        text: 'my orders',
        role: 'destructive',
        icon: 'cart',
        handler: () => {
              this.router.navigate(["list-order",this.userId])
        },
      },
      {
        text: 'logout',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
               this.logout()

        },
      }
    ]
      
    });
    await actionSheet.present();
  }


  

}