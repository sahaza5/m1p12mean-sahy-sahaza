import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RegisterComponentComponent } from './app/component/client/register-component/register-component.component';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/component/home-page/home.component';
import { LoginComponent } from './app/component/client/login/login.component';
import { ClientDashboardComponent } from './app/component/client/client-dashboard/client-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppointmentClientComponent } from './app/component/client/appointment-client/appointment-client.component';
import { PayementComponent } from './app/component/client/payement/payement.component';
import { AuthService } from './app/services/auth.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }, // Add the home route
  {
    path: 'client-dashboard',
    component: ClientDashboardComponent,
    canActivate: [AuthService], //It should be AuthGuard but let it be
  },
  {
    path: 'appointment',
    component: AppointmentClientComponent,
    canActivate: [AuthService], //It should be AuthGuard but let it be
  },
  {
    path: 'payement',
    component: PayementComponent,
    canActivate: [AuthService], //It should be AuthGuard but let it be
  },
];

console.log('Defined routes:', routes); // Log the entire routes array

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err));
