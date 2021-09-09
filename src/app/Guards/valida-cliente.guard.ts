import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class ValidaClienteGuard implements CanActivate {
  constructor(private authService: UsuarioService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLogged() == true && localStorage.getItem('Tipo') == 'C') {
        return true; 
      }else{
        this.router.navigateByUrl('/Login');
        return false;
      }
    }
}
