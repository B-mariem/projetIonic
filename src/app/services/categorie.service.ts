import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Categorie } from '../interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categoriesCollection: AngularFirestoreCollection<Categorie>;

  constructor(private afs: AngularFirestore) {
    this.categoriesCollection = this.afs.collection<Categorie>('Categories');
  }

  getCategies() {
    return this.categoriesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
}
