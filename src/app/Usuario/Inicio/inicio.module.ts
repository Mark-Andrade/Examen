import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InicioPage } from './inicio.page';

import { InicioPageRoutingModule } from './inicio-routing.module';
import { ComprasPage } from '../Compras/compras.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InicioPageRoutingModule,
  ],
  declarations: [InicioPage,ComprasPage]
})
export class Tab1PageModule {}
