import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RegisterComponentComponent } from './app/component/register-component/register-component.component';
import { provideRouter, Routes} from '@angular/router';
import { HomeComponent } from './app/component/home/home.component';
import { LoginComponent } from './app/component/login/login.component';
import { ClientDashboardComponent } from './app/component/client-dashboard/client-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

const routes: Routes = [
  { path: 'register', component: RegisterComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }, // Add the home route
  { path: 'client-dashboard', component: ClientDashboardComponent}

];

console.log('Defined routes:', routes); // Log the entire routes array

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
})
.catch((err) => console.error(err));
