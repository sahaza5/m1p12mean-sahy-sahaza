import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AppointmentClientComponent } from './component/client/appointment-client/appointment-client.component';
import { ClientDashboardComponent } from './component/client/client-dashboard/client-dashboard.component';
//import { LoginComponent } from './component/client/login/login.component';
import { LoginComponent } from './pages/login/login.component';
import { PayementComponent } from './component/client/payement/payement.component';
import { RegisterComponent } from './pages/register/register.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ListeVehiculeComponent } from './pages/liste-vehicule/liste-vehicule.component';
import { ListeRendezVousComponent } from './pages/liste-rendez-vous/liste-rendez-vous.component';
import { ListeMecanicienComponent } from './pages/liste-mecanicien/liste-mecanicien.component';
import { ListeClientComponent } from './pages/liste-client/liste-client.component';
import { ListeTacheComponent } from './pages/liste-tache/liste-tache.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: AcceuilComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'liste-vehicule', component: ListeVehiculeComponent },
    { path: 'liste-client', component: ListeClientComponent},
    { path: 'liste-rendez-vous', component: ListeRendezVousComponent },
    { path: 'liste-mecanicien', component: ListeMecanicienComponent},
    { path: 'liste-tache', component: ListeTacheComponent},
    { path: 'client-dashboard', component: ClientDashboardComponent},
    { path: 'appointment', component: AppointmentClientComponent},
    { path: 'payement', component: PayementComponent},
    { path: 'admin-login', component: AdminLoginComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent}
];

