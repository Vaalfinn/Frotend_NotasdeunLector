import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { MicuentaComponent } from './pages/micuenta/micuenta.component';
import { MibibliotecaComponent } from './pages/mibiblioteca/mibiblioteca.component';
import { MislibrosComponent } from './pages/mislibros/mislibros.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'novedades',
    component: NovedadesComponent,
    // Example: only ADMIN can access
  },
  {
    path: 'libros',
    component: MislibrosComponent,
  },
  {
    path: 'micuenta',
    component: MicuentaComponent
  },
  {
    path: 'mibiblioteca',
    component: MibibliotecaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
