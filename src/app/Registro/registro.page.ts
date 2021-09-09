import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RegistroModel } from '../model/registro';
import { UsuarioService } from '../services/db.service';
import { Generales } from '../utilerias/generales';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formregistro:FormGroup;
  isSubmitted = false;
  registro:RegistroModel= new RegistroModel();

  constructor(private fb:FormBuilder,
    public loadingController: LoadingController,
    private servusu: UsuarioService,
    private general:Generales,
    private router:Router) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario(){
    this.formregistro=this.fb.group({
      nombrecom :['',[Validators.required,Validators.minLength(10)]],
      correo    :['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contrasena:['',[Validators.required,Validators.minLength(4)]],
      tipo  :['C']
    });
  }
  async registrar(){
    if (this.formregistro.valid) {
      this.registro = this.formregistro.value;
      this.servusu.guardarUsuario(this.registro).then((resp:any)=>{
        if(resp){
          this.general.mensaje('dark','Registro guardado correctamente');
          this.router.navigateByUrl('/Login');
        }else{
          this.general.mensaje('danger','Ocurrio un error');
        }
      });
    } else {
      this.isSubmitted = true;
    }
  }
  get errorControl() {
    return this.formregistro.controls;
  }

}
