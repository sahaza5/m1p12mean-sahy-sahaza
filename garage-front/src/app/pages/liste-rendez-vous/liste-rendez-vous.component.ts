import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { RendezVousService } from '../../services/rendez-vous.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-liste-rendez-vous',
  imports: [NavbarLeftComponent, FormsModule, CommonModule],
  templateUrl: './liste-rendez-vous.component.html',
  styleUrl: './liste-rendez-vous.component.css'
})
export class ListeRendezVousComponent {

  userId: string | null = '';
  appointments: any[] = [];

  constructor(private rendezVousService: RendezVousService, private route: Router, private authService: AuthService){}

  ngOnInit(): void {

    this.getUserId();

    if (this.userId) {
      this.getAppointments();
    }
  }

  // Méthode pour récupérer l'ID de l'utilisateur connecté
  getUserId(): void {
    this.userId = this.authService.getUserId();  // Récupère l'ID de l'utilisateur à partir du service AuthService
    console.log("User ID récupéré : ", this.userId);  // Affiche l'ID dans la console pour vérification
  }

  getAppointments(): void {
    this.rendezVousService.getAppointmentClient(this.userId!).subscribe(
      (response) => {
        this.appointments = response;
        console.log("Rendez-vous récupérés :", this.appointments);

        this.route.navigate(['/liste-rendez-vous', { id: this.userId }]);
      },
      (error) => {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
      }
    );
  }
}
