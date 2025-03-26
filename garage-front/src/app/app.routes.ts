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
export const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'liste-vehicule', component: ListeVehiculeComponent },
  { path: 'liste-client', component: ListeClientComponent },
  { path: 'liste-rendez-vous', component: ListeRendezVousComponent },
  { path: 'liste-mecanicien', component: ListeMecanicienComponent },
  { path: 'liste-tache', component: ListeTacheComponent },
  { path: 'voir-profile', component: ViewProfilComponent },
  { path: 'header', component: HeaderComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
