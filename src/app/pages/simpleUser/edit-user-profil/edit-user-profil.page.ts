import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-profil',
  templateUrl: './edit-user-profil.page.html',
  styleUrls: ['./edit-user-profil.page.scss'],
})
export class EditUserProfilPage implements OnInit {
  private userEmail:string;
  private user:User={};
  private loading: any;
  private userSubscription: Subscription;

  constructor(   
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router:Router,) {
      this.userEmail = this.activatedRoute.snapshot.params['email'];
      this.loadUser()

     }

  ngOnInit() {
  }
  loadUser() {
    this.userSubscription = this.authService.getUserInformation(this.userEmail)
    .subscribe(data => {
      this.user = data[0];
      console.log(this.user);
      
    });
  }

  async updateUser() {
    await this.presentLoading();
      try {
        console.log(this.user);
        
        await this.authService.updateUser(this.user.id, this.user);
        this.presentToast("updated successfully")
        await this.loading.dismiss();
        this.router.navigate(["/home"])

      } catch (error) {
        this.presentToast('erreur');
        this.loading.dismiss();
      }
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'wait...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 200 });
    toast.present();
  }

}
