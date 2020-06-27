import { Injectable } from '@angular/core';
import {BehaviorSubject} from'rxjs';
import {Router} from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart = [];
private cartItemCount=new BehaviorSubject(0) 

private commandeCollection: AngularFirestoreCollection<Commande>

  constructor(private router:Router,private afs: AngularFirestore) {
    this.commandeCollection = this.afs.collection<Commande>('Commandes');
   }

   // Commande
   addCommande(commande: Commande) {
    return this.commandeCollection.add(commande);
  }
  getCommandes() {
    return this.commandeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getCommande(id: string) {
    return this.commandeCollection.doc<Commande>(id).valueChanges();
  }

  getCommandeUser(id: string) {  
    return this.afs.collection("/Commandes",ref=>ref.where("idClient","==",id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
    
          return { id,...data };
        });
      })
    );
   }
   getCommandeProvider(id: string) {  
    return this.afs.collection("/Commandes",ref=>ref.where("idProvider","==",id)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
    
          return { id, ...data };
        });
      })
    );
   }

updateEtat(id:string){
  return this.commandeCollection.doc<Commande>(id).update({ etat:"confirmed" });
}




  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addToCart(product) {
        product.amount=1
        this.cart.push(product);
        this.cartItemCount.next(this.cartItemCount.value + 1);
  }
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
       
          p.amount += 1;
          added = true; 
          break;
          }
          if(p.totalamount==0){
            break;
          }
        
       
          
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }

    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
