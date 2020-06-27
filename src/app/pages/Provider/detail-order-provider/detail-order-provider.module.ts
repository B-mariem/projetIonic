import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailOrderProviderPage } from './detail-order-provider.page';

const routes: Routes = [
  {
    path: '',
    component: DetailOrderProviderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailOrderProviderPage]
})
export class DetailOrderProviderPageModule {}
