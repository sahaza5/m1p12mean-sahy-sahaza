import { Routes } from '@angular/router';
//import { LoginComponent } from './component/client/login/login.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ListeVehiculeComponent } from './pages/liste-vehicule/liste-vehicule.component';
import { ListeRendezVousComponent } from './pages/liste-rendez-vous/liste-rendez-vous.component';
import { ListeMecanicienComponent } from './pages/liste-mecanicien/liste-mecanicien.component';
import { ListeClientComponent } from './pages/liste-client/liste-client.component';
import { ListeTacheComponent } from './pages/liste-tache/liste-tache.component';
import { ViewProfilComponent } from './pages/view-profil/view-profil.component';
import { HeaderComponent } from './component/header/header.component';
import { AuthGuard } from './guards/auth.guard';
import { UserType } from './models/UserType';
import { RoleGuard } from './guards/role.guard';
export const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'profil', component: ProfilComponent,canActivate: [AuthGuard]},
  { path: 'liste-vehicule', component: ListeVehiculeComponent,canActivate: [AuthGuard, RoleGuard], data: {roles: [UserType.CLIENT]}},
  { path: 'liste-client', component: ListeClientComponent,canActivate: [AuthGuard, RoleGuard], data: {roles: [UserType.ADMIN]}},
  { path: 'liste-rendez-vous', component: ListeRendezVousComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: [UserType.CLIENT, UserType.ADMIN] } },
  { path: 'liste-mecanicien', component: ListeMecanicienComponent,canActivate: [AuthGuard, RoleGuard], data: {roles: [UserType.ADMIN]}},
  { path: 'liste-tache', component: ListeTacheComponent,canActivate: [AuthGuard, RoleGuard], data: {roles: [UserType.EMPLOYEE]}  },
  { path: 'voir-profile', component: ViewProfilComponent,canActivate: [AuthGuard]  },
  { path: 'header', component: HeaderComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
