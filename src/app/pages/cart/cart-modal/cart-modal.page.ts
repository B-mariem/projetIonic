import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { AlertController } from '@ionic/angular';
import { Commande } from 'src/app/interfaces/commande';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  cart: Product[] = [];
  commande:Commande={}
 userId:string
  constructor(private cartService: CartService,
     private alertCtrl: AlertController,
     private productService:ProductService,
     private router :Router,
     private authService:AuthService) { }
 
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.userId=this.authService.getAuth().currentUser.uid

  }
 
  decreaseCartItem(product) {
    if(product.amount>0){
      this.cartService.decreaseProduct(product);
    }
  }
 
  increaseCartItem(product) {
    if(product.totalamount >product.amount){
      this.cartService.addProduct(product);
    }else{
      alert("il reste un seul produit ")
    }
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    let som= this.cart.reduce((i, j) => i + j.price * j.amount, 0);
     let res
    if(this.commande.type=="delivery"){
     res= som+5.000
     return res
    }else{
      return som

    }
   
   
  }
 
  
 
  async checkout() {
    // Perfom PayPal or Stripe checkout process
 
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your product as soon as possible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.commande.cart=this.cart
            this.commande.createdAt = Date.now();
            this.commande.idClient=this.userId;
            this.commande.idProvider=this.cart[0].userId
            this.commande.total=this.getTotal()
            this.cartService.addCommande(this.commande)
            for(let p of this.cart){
              this.productService.updateAmount(p.id,p.totalamount-p.amount) 
            }

            console.log('Confirm Okay');
            this.router.navigate(["/list-order",this.userId])
          }
        }
      ]
    });

    await alert.present();
  }
}