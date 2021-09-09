import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { UsuarioService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private lastBack = Date.now();
  constructor(private authService: UsuarioService,
    private router: Router,
    private platform: Platform,
    private toastController: ToastController) {
      if (this.authService.isLogged) {
        let tipo =localStorage.getItem('Tipo');
        if ( tipo == 'C') {
          this.router.navigate(['/Cliente/Inicio']);
        } else if(tipo == 'A'){
          this.router.navigate(['/Administrador']);
        }
      } else {
        this.router.navigate(['/Login']);
      }
      this.salirApp();
    }
  salirApp() {
    this.platform.backButton.subscribeWithPriority(999999, () =>  {
      
      if (Date.now() - this.lastBack < 2000) { // logic for double tap: delay of 500ms between two clicks of back button
        navigator['app'].exitApp();
      }else{
        this.mensaje();
        this.lastBack= Date.now();
      }
    });
  }
  async mensaje() {
    const mensajeconf = await this.toastController.create({
      animated: true,
      color: 'dark',
      message: 'Pulsa de nuevo para salir',
      position: 'middle',
      duration: 1000
    });
    await mensajeconf.present();
  }
}
