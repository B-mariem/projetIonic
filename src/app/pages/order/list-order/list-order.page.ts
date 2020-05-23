import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { CartService } from 'src/app/services/cart/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.page.html',
  styleUrls: ['./list-order.page.scss'],
})
export class ListOrderPage implements OnInit {

  private userId:string
  private Usercommandes= new Array<Commande>()


  constructor(private cartService:CartService,
     private toastCtrl: ToastController,  
     private activatedRoute: ActivatedRoute,

    ) {    
        this.userId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getUserCommandes()
   
  }
getUserCommandes(){
  let allCommandes;
    this.cartService.getCommandes().subscribe(data=>{
    allCommandes=data
    for (var val in allCommandes){
      if(allCommandes[val].idClient==this.userId){
        this.Usercommandes.push(allCommandes[val])
       }
    }
  })

}
  
async deleteCommande(id: string) {
  try {
    await this.cartService.deleteCommande(id).then(()=>{
      this.presentToast('this order was deleted ')
    

    })
  } catch (error) {
    this.presentToast('this order was deleted ');
  }
}
async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 3000 });
  toast.present();
  location.reload()
}
}
