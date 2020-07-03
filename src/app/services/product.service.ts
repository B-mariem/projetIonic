import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage,) {
    this.productsCollection = this.afs.collection<Product>('Products');
  }

  getProducts() {
    return this.productsCollection.snapshotChanges().pipe(
      map(products => {
        return products.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  /*addProduct(product: Product) {
    return this.productsCollection.add(product);
  }*/
  addProduct(product: Product,url){
    this.productsCollection.add(product)
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, url)

      this.productsCollection.doc(resp.id).update({
      
        picture: imageUrl || null
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file) {
    if(file && file.length) {
    
        const task = await this.storage.ref('images').child(id).put(file[0])
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      
    }
  }

  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

 getProductUser(id: string){  
 return this.afs.collection("/Products",ref=>ref.where("userId","==",id)).snapshotChanges().pipe(
  map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;

      return { id, ...data };
    });
  })
);

}



  updateProduct(id: string, product: Product) {
    return this.productsCollection.doc<Product>(id).update(product);
  }
  updateAmount(id:string,amount:number){
    return this.productsCollection.doc<Product>(id).update({ totalamount: amount});
  }

  

  deleteProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  }
}