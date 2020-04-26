import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afa: AngularFireAuth,private db: AngularFirestore) {
    this.userCollection = this.db.collection<User>('Users');

   }
   /*getUser(userId: string) {
    return this.userCollection.doc<User>(userId).valueChanges()
    }*/
    login(email:string, password:string){

      return new Promise((resolve, rejected) =>{
        this.afa.auth.signInWithEmailAndPassword(email, password).then(user => {
          resolve(user.user);
        }).catch(err => rejected(err));
      });
  
     
    }

  register(user: User) {
  
    return new Promise ((resolve, reject) => {
      this.afa.auth.createUserWithEmailAndPassword(user.email, user.password).then( res =>{
        
        this.userCollection.add(user);
        
        resolve(res)
      }).catch( err => reject(err))
    })
    
  }
 

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
}