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
  userRole: string | null = ''; // Stocke le rôle de l'utilisateur
  appointments: any[] = [];
  selectedAppointment: any = { _id: '', date: '', description: '' }; // Rendez-vous sélectionné pour modification

  constructor(private rendezVousService: RendezVousService, private route: Router, private authService: AuthService){}

  ngOnInit(): void {

    this.getUserId();

    this.getUserRole();

    this.getAppointments()

    if (this.userId) {
      this.getAppointments();
    }
  }

  // Méthode pour récupérer l'ID de l'utilisateur connecté
  getUserId(): void {
    this.userId = this.authService.getUserId();  // Récupère l'ID de l'utilisateur à partir du service AuthService
    console.log("User ID récupéré : ", this.userId);  // Affiche l'ID dans la console pour vérification
  }

  // Récupérer le rôle de l'utilisateur connecté
  getUserRole(): void {
    this.userRole = this.authService.getUserRole(); // Implémente cette méthode dans `AuthService`
    console.log("User Role récupéré : ", this.userRole);
  }

  // Récupérer les rendez-vous du client connecté
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

  // Sélectionner un rendez-vous pour modification
  selectAppointmentForEdit(appointment: any): void {
    this.selectedAppointment = { ...appointment }; // Copie des données pour éviter la modification directe
  }

  // mise à jour rdv
  updateAppointment(): void {
    if (!this.selectedAppointment._id) {
      alert('Aucun rendez-vous sélectionné !');
      return;
    }

    this.rendezVousService.updateAppointment(this.selectedAppointment._id, this.selectedAppointment).subscribe(
      (response) => {
        console.log('Rendez-vous mis à jour avec succès:', response);
        alert('Rendez-vous mis à jour avec succès !');
        this.getAppointments(); // Recharger la liste après mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rendez-vous :', error);
      }
    );
  }

  // annuler rdv
  cancelAppointment(appointment: any): void {
    if (confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) {
      // Mettre à jour immédiatement l'UI
      appointment.status = "ANNULER";


      // Envoyer la requête au backend pour enregistrer l'annulation
      this.rendezVousService.cancelAppointment(appointment._id).subscribe(
        (response) => {
          console.log("Rendez-vous annulé avec succès :", response);
          alert("Votre rendez-vous a été annulé !");
        },
        (error) => {
          console.error("Erreur lors de l'annulation du rendez-vous :", error);
          alert("Une erreur s'est produite lors de l'annulation.");
        }
      );
    }
  }
}
