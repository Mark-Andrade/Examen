import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { ProductoPage } from '../modals/producto/producto.page';
import { EditarProductoPage } from '../modals/editar-producto/editar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InicioPage,ProductoPage,EditarProductoPage]
})
export class InicioPageModule {}
