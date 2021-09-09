import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UsuarioModel } from '../model/usuario';
import { UsuarioService } from '../services/db.service';
import { Generales } from '../utilerias/generales';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formlogin:FormGroup;
  isSubmitted = false;
  login:UsuarioModel= new UsuarioModel();
  constructor(private fb:FormBuilder,
    public loadingController: LoadingController,
    private servusu: UsuarioService,
    private router: Router,
    private general:Generales) { }

  ngOnInit() {
    this.crearFormulario();
  }
  crearFormulario(){
    this.formlogin=this.fb.group({
      correo    :['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contrasena:['',[Validators.required,Validators.minLength(4)]]
    });
  }
  async loginvalidate(){
    if (this.formlogin.valid) {
      this.login = this.formlogin.value;
      const loading = await this.loadingController.create({
        message: 'Espera por favor...',
      });
      await loading.present();
      this.servusu.login(this.login).then((resp:any)=>{
        loading.dismiss();
        if (!resp.mensaje) {
          localStorage.setItem('Tipo',resp.tipo);
          localStorage.setItem('id_usuario',resp.id_usuario);
          if (resp.tipo == 'A') {
            this.router.navigateByUrl('/Administrador');
          } else if(resp.tipo == 'C'){
            this.router.navigateByUrl('/Cliente/Inicio');
          }
        }else{
          this.general.mensaje('dark',resp.mensaje);
        }
      });
    } else {
      this.isSubmitted = true;
    }
  }
  get errorControl() {
    return this.formlogin.controls;
  }

}
