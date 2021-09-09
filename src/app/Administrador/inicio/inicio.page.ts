import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/db.service';
import { Generales } from 'src/app/utilerias/generales';
import { EditarProductoPage } from '../modals/editar-producto/editar-producto.page';
import { ProductoPage } from '../modals/producto/producto.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  productos:any;
  constructor(public modalController: ModalController,
    private servusuario:UsuarioService,
    public alertController: AlertController,
    private general:Generales,) {
    this.servusuario.dbState().subscribe((res) => {
      if(res){
        this.servusuario.getProductos().then(resp => {
          this.productos= resp.value;
        });
      }
    });
  }

  ngOnInit() {
  }
  async Modal(variable,informacion) {
    var page;
    switch (variable) {
      case 'CrearProd':
        page=ProductoPage;
      break;
      case 'EditarProd':
        page=EditarProductoPage;
    }
    const modal = await this.modalController.create({
      component: page,
      swipeToClose: true,
      componentProps:informacion,
      presentingElement: await this.modalController.getTop()
    });
    modal.onDidDismiss()
    .then((data) => {
      if(data.data != undefined){
        this.productos = data.data;
      }
  });
    return await modal.present();
  }
  async EliminarProducto(id_producto){
    const alert = await this.alertController.create({
      message: '¿Estas seguro que quieres eliminar el producto?',
      cssClass: 'buttonCss',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          }, {
          text: 'Eliminar',
          handler: () => {
            this.servusuario.EliminarProducto(id_producto).then((resp:any)=>{
              if (resp) {
                this.general.mensaje('primary','Producto eliminado correctamente'); 
                this.servusuario.dbState().subscribe((res) => {
                  if(res){  
                    this.servusuario.getProductos().then(resp => {
                      this.productos=resp.value;
                    });
                  }
                });
              }else{
                this.general.mensaje('danger','Ocurrio un error');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
  CerrarSesion(){
    this.general.Logout();
  }

}
