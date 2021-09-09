import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductoModel } from 'src/app/model/producto';
import { UsuarioService } from 'src/app/services/db.service';
import { Generales } from 'src/app/utilerias/generales';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  formproducto:FormGroup;
  isSubmitted = false;
  producto:ProductoModel= new ProductoModel();

  constructor(public modalController: ModalController,
    private fb:FormBuilder,
    private servusu: UsuarioService,
    private general: Generales,) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario(){
    this.formproducto=this.fb.group({
      nombre :['',[Validators.required,Validators.minLength(4)]],
      descripcion    :['',[Validators.required,Validators.minLength(8)]],
      precio  :['',[Validators.required,Validators.minLength(1)]]
    });
  }
  async registrarproducto(){
    if (this.formproducto.valid) {
      this.producto = this.formproducto.value;
        this.servusu.AgregarProducto(this.producto).then((resp:any)=>{
          if (resp) {
            this.general.mensaje('primary','Registro Guardado Correctamene');
            this.servusu.dbState().subscribe((res) => {
              if(res){  
                this.servusu.getProductos().then(resp => {
                  this.modalController.dismiss(resp.value);
                });
              }
            });
          } else {
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
