import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AppointmentClientComponent } from './component/client/appointment-client/appointment-client.component';
import { ClientDashboardComponent } from './component/client/client-dashboard/client-dashboard.component';
//import { LoginComponent } from './component/client/login/login.component';
import { LoginComponent } from './component/login/login.component';
import { PayementComponent } from './component/client/payement/payement.component';
import { RegisterComponentComponent } from './component/client/register-component/register-component.component';
import { HeaderComponent } from './component/header/header.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponentComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: AcceuilComponent },
    { path: 'client-dashboard', component: ClientDashboardComponent},
    { path: 'appointment', component: AppointmentClientComponent},
    { path: 'payement', component: PayementComponent},
    { path: 'admin-login', component: AdminLoginComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent}
];

