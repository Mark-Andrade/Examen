import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComprasPage } from './compras.page';

import { ComprasPageRoutingModule } from './compras-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComprasPageRoutingModule
  ],
  declarations: [ComprasPage]
})
export class Tab2PageModule {}
