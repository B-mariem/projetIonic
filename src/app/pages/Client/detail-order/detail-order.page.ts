import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {
private idCommande :string;
private commande:Commande={}
private loading:any

  constructor(  private activatedRoute: ActivatedRoute,
                private cartService : CartService, 
                private router:Router,
                private authService:AuthService,
                private toastCtrl: ToastController,
                private loadingCtrl: LoadingController,) { 
      this.idCommande=this.activatedRoute.snapshot.params['id'];
      this.loadCommande()
    }

  ngOnInit() {
    
  }
  
async DoneOrder(){
  await this.presentLoading();
  try {
    this.cartService.updateEtat(this.idCommande,"Done")
    await this.loading.dismiss();
    this.back()
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
  const toast = await this.toastCtrl.create({ message, duration: 1000 });
  toast.present();
  }

loadCommande(){
  this.cartService.getCommande(this.idCommande).subscribe(data=>{
  this.commande=data
  console.log(this.commande);})
 }

back(){
  this.router.navigate(["list-order",this.authService.getAuth().currentUser.uid])
  }
}
/*async deleteCommande(id: string) {
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
          this.cartService.deleteCommande(id)
            for(let c of this.commande.cart ){
              this.productService.updateAmount(c.id,c.totalamount+c.amount) 
            }
            this.back() 
        }
      }
    ]
  });

  await alert.present(); 
}
  <ion-button  expand="block" (click)="deleteCommande()">
   Cancel Order
   </ion-button>
  */