import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { UsuarioService } from 'src/app/services/db.service';
import { Generales } from 'src/app/utilerias/generales';
import { ComprasPage } from '../Compras/compras.page';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage {
  productos=[];
  id_usuario:string;
  cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  constructor(private servusuario:UsuarioService,
    private servicecarrito:UsuarioService,
    private modalCtrl:ModalController,
    private general:Generales) {
    this.id_usuario=localStorage.getItem('id_usuario');
    this.servusuario.dbState().subscribe((res) => {
      if(res){
        this.servusuario.getProductos().then(resp => {
          this.productos= resp.value;
        });
        this.obteneritemscarrito(this.id_usuario);
      }
    });
  }
  obteneritemscarrito(id_usuario){
    this.servicecarrito.ObtenitemsCarrito(id_usuario).then(resp=>{
      this.cartItemCount=resp;
    });
  }
  AgregaProducto(id_producto){
    this.servicecarrito.AgregarProductocarrito(id_producto,this.id_usuario).then(resp =>{
      if (resp) {
        this.obteneritemscarrito(this.id_usuario);
      } else {
        console.log('error');
      }
    });
  }
  async openCart() {
    let modal = await this.modalCtrl.create({
      component: ComprasPage,
      cssClass: 'cart-modal'
    });
    modal.onDidDismiss().then(resp=>{
      this.obteneritemscarrito(this.id_usuario);
    })
    modal.present();
  }
  CerrarSesion(){
    this.general.Logout();
  }

}
