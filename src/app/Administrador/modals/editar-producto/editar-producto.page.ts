import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ProductoModel } from 'src/app/model/producto';
import { UsuarioService } from 'src/app/services/db.service';
import { Generales } from 'src/app/utilerias/generales';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  formproducto:FormGroup;
  isSubmitted = false;
  producto:ProductoModel= new ProductoModel();
  constructor(public modalController: ModalController,
    private fb:FormBuilder,
    private servusu: UsuarioService,navParams: NavParams,private general: Generales,) {
      this.crearFormulario(navParams);
    }

  ngOnInit() {
  }
  crearFormulario(navParams){
    this.formproducto=this.fb.group({
      id_producto:[navParams.get('id_producto')],
      nombre :[navParams.get('nombre'),[Validators.required,Validators.minLength(5)]],
      descripcion:[navParams.get('descripcion'),[Validators.required,Validators.minLength(8)]],
      precio  :[navParams.get('precio'),[Validators.required,Validators.minLength(1)]]
    });
  }
  async Actualizarproducto(){
    if (this.formproducto.valid) {
      this.producto = this.formproducto.value;
      this.servusu.EditarProducto(this.producto).then((resp:any)=>{
        if (resp) {
          this.general.mensaje('primary','Registro actualizado correctamente'); 
          this.servusu.dbState().subscribe((res) => {
            if(res){  
              this.servusu.getProductos().then(resp => {
                this.modalController.dismiss(resp.value);
              });
            }
          });
        }else{
          this.general.mensaje('danger','Ocurrio un error');
        }
      });
    } else {
      this.isSubmitted = true;
    }
  }
  get errorControl() {
    return this.formproducto.controls;
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
