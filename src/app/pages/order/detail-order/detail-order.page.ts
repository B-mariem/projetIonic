import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { AuthService } from 'src/app/services/auth.service';

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

})
}
back(){
this.router.navigate(["list-order",this.authService.getAuth().currentUser.uid])
}
}
