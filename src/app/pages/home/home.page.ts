import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartModalPage } from '../cart/cart-modal/cart-modal.page';
import { Router } from '@angular/router';

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
  cart = [];
  cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', { read: ElementRef})fab: ElementRef;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,
      public actionSheetController: ActionSheetController,
      private cartService: CartService, 
      private modalCtrl: ModalController,
      private router:Router) { }

  addToCart(product) {
    this.cart = this.cartService.getCart();
    if(product.totalamount>0){
      if(this.cart.length==0){
        this.cartService.addToCart(product);
      }else{
        for(let p of this.cart){
            if(p.userId===product.userId){      
              this.cartService.addToCart(product);
              break;
          }else 
          alert("echec")
        }
          
       
      }

    }else{
      alert("produit non disponible")
    }
    
   

   this.animateCSS('tada');
  }
 
 async openCart() {
    this.animateCSS('bounceOutLeft', true);
    this.router.navigate(["cart-modal"])
 
   /* let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();*/
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }


  ngOnInit() { 
    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
       
    });
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    
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
