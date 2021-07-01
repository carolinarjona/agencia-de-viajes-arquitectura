import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/views/login/login.component';
import { HomeComponent } from './core/views/home/home.component';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'viajes', loadChildren: () => import('./viajes/viajes.module').then(m => m.ViajesModule), canActivate: [AuthGuard] },
  { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
