import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/db.service';

@Component({
  selector: 'app-compras',
  templateUrl: 'compras.page.html',
  styleUrls: ['compras.page.scss']
})
export class ComprasPage {

  cart= [];
  id_usuario:string;
  constructor(private cartService: UsuarioService, 
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController) { 
      this.id_usuario=localStorage.getItem('id_usuario');
    }
 
  ngOnInit() {
    this.obtenProductos(this.id_usuario);
  }
  obtenProductos(id_usuario){
    this.cartService.obtenProductoscarrito(id_usuario).then((resp) => {
        this.cart= resp.value;
    })
  }
 
  Elimiaritem(id_item) {
    this.cartService.EliminaritemsCarrito(id_item,this.id_usuario).then(resp=>{
      if (resp) {
        this.obtenProductos(this.id_usuario);
      } else {
        console.log('error');
      }
    });
  }
 
  getTotal() {
    return this.cart.reduce((i, j) =>i + parseInt(j.precio) * 1, 0);
  }
 
  closeModal() {
    this.modalCtrl.dismiss();
  }
 
  async checkout() {
    let total= this.getTotal();
    if (total > 0) {
      this.cartService.SimulaCompra(this.id_usuario);
      let alert = await this.alertCtrl.create({
        header: 'Gracias por tu orden!',
        message: 'Te entregaremos tu comida lo antes posible',
        buttons: ['OK']
      });
      alert.present().then(() => {
        this.modalCtrl.dismiss();
      });
    } else {
      let alert = await this.alertCtrl.create({
        header: 'Upss!',
        message: 'No cuentas con pedidos',
        buttons: ['OK']
      });
      alert.present().then(() => {
      });
    }
    
  }

}
