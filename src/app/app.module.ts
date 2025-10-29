import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { ModalVisitanteComponent } from './auth/modal-visitante/modal-visitante.component';
import { MicuentaComponent } from './pages/micuenta/micuenta.component';
import { MibibliotecaComponent } from './pages/mibiblioteca/mibiblioteca.component';
import { MislibrosComponent } from './pages/mislibros/mislibros.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilComponent,
    NovedadesComponent,
    ModalVisitanteComponent,
    MicuentaComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginComponent,    // Import instead of declare if standalone
    RegisterComponent,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MislibrosComponent,
    MibibliotecaComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
