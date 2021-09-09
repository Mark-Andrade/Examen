import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable({
    providedIn: 'root',
})
export class Generales {
    constructor(
        public toastController: ToastController,
        private router: Router
    ) { }

    async mensaje(color, message,) {
        const mensajeconf = await this.toastController.create({
            animated: true,
            color: color,
            header: 'Información',
            message: message,
            position: 'top',
            duration: 2500
        });
        await mensajeconf.present();
    }
    Logout(){
        localStorage.clear();
        this.router.navigateByUrl('/Login');
    }
}
