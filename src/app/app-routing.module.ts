import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ValidaAdminGuard } from './Guards/valida-admin.guard';
import { ValidaClienteGuard } from './Guards/valida-cliente.guard';

const routes: Routes = [
  {
    path: 'Login',
    loadChildren: () => import('./Login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'Registro',
    loadChildren: () => import('./Registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'Administrador',
    loadChildren: () => import('./Administrador/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[ValidaAdminGuard]
  },
  {
    path: 'Cliente',
    loadChildren: () => import('./Usuario/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [ValidaClienteGuard]
  },
  {
    path: '',
    pathMatch:'full',redirectTo:'Login'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
