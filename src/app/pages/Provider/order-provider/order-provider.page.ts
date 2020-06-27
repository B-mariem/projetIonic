import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-order-provider',
  templateUrl: './order-provider.page.html',
  styleUrls: ['./order-provider.page.scss'],
})
export class OrderProviderPage implements OnInit {
  private commandes:any
  private userId:any
  private loading: any;
  constructor(private cartService:CartService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
     public actionSheetController: ActionSheetController,
     private router:Router,
     private loadingCtrl: LoadingController,private screenOrientation: ScreenOrientation) {    
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);


       this.userId = this.activatedRoute.snapshot.params['id']; 
       this.loadOrdersProvider(this.userId) 
    }

  ngOnInit() {

  }
  back(){
    this.router.navigate(["myproducts",this.authService.getAuth().currentUser.uid])
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }
  async loadOrdersProvider(id:string){
    this.cartService.getCommandeProvider(id).subscribe(data=>{
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
