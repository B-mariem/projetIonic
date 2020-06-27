import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.page.html',
  styleUrls: ['./detail-order.page.scss'],
})
export class DetailOrderPage implements OnInit {
private idCommande :string;
private commande:Commande={}



  constructor(  private activatedRoute: ActivatedRoute,
    private cartService : CartService, 
    private router:Router,
    private authService:AuthService) { 
      this.idCommande=this.activatedRoute.snapshot.params['id'];
      this.loadCommande()
     
      

      
      
  
    }

  ngOnInit() {
    
  }

loadCommande(){
this.cartService.getCommande(this.idCommande).subscribe(data=>{
  this.commande=data
  console.log(this.commande);
  
})
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