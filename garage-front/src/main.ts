import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RegisterComponentComponent } from './app/register-component/register-component.component';
import { provideRouter, Routes} from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { ClientDashboardComponent } from './app/client-dashboard/client-dashboard.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }, // Add the home route
  { path: 'client-dashboard', component: ClientDashboardComponent}

];

console.log('Defined routes:', routes); // Log the entire routes array

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
})
.catch((err) => console.error(err));
