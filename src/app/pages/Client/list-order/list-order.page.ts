import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.page.html',
  styleUrls: ['./list-order.page.scss'],
})
export class ListOrderPage implements OnInit {
  private commandes:any
  private userId:any
  private loading: any;



  constructor(private cartService:CartService,
     private activatedRoute: ActivatedRoute,
     private authService: AuthService,
      public actionSheetController: ActionSheetController,
      private router:Router,
      private loadingCtrl: LoadingController) {    
        
        this.userId = this.activatedRoute.snapshot.params['id'];
       
        this.loadOrdersUser(this.userId) 
     
      

  }

  ngOnInit() {
    
    
  
  
  
  }
 async loadOrdersUser(id:string){
    this.cartService.getCommandeUser(id).subscribe(data=>{
      this.commandes=data 
      console.log(this.commandes);
        
    })
  }
 

  async presentActionSheet() {
   
    const actionSheet = await this.actionSheetController.create({
      header: 'Option',
      buttons: [
      {
        text: 'Home ',
        role: 'destructive',
        icon: 'home',
        handler: () => {
              this.router.navigate(["home"])
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
  async logout() {
    await this.presentLoading();
    this.router.navigate(["/login"])

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

  

}
