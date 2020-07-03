import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-detail-order-provider',
  templateUrl: './detail-order-provider.page.html',
  styleUrls: ['./detail-order-provider.page.scss'],
})
export class DetailOrderProviderPage implements OnInit {
  private idCommande :string;
  private commande:Commande={}
   constructor(  private activatedRoute: ActivatedRoute,
                 private cartService : CartService, 
                 private router:Router,
                 private authService:AuthService,    
                 private toastCtrl: ToastController) { 
        this.idCommande=this.activatedRoute.snapshot.params['id'];
        this.loadCommande()
      }
  
    ngOnInit() {
      
    }
  
  async loadCommande(){
  this.cartService.getCommande(this.idCommande).subscribe(data=>{
    this.commande=data
    console.log(this.commande);
    
  })
  }
 async back(){
  this.router.navigate(["order-provider",this.authService.getAuth().currentUser.uid])
  
  }

  async ConfirmOrder(){
 this.cartService.updateEtat(this.idCommande,"Confirmed").then(()=>{
  this.presentToast("the order is confirmed")
      this.back()
    })
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1000 });
    toast.present();
  }
  }