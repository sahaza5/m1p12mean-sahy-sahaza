import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { RendezVousService } from '../../services/rendez-vous.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-liste-rendez-vous',
  imports: [NavbarLeftComponent, FormsModule, CommonModule],
  templateUrl: './liste-rendez-vous.component.html',
  styleUrl: './liste-rendez-vous.component.css',
})
export class ListeRendezVousComponent {
  userId: string | null = '';
  userRole: string | null = ''; // Stocke le rôle de l'utilisateur
  appointments: any[] = [];
  slicedAppointments: any[] = [];
  pages: any[] = [];
  currentPage = 1;
  totalPages: number = 0;
  selectedAppointment: any = { _id: '', date: '', description: '' }; // Rendez-vous sélectionné pour modification
  mechanics: any[] = []; // Stocke les mécaniciens récupérés

  // update
  selectedMechanicId: string = ''; // Stocke l'ID du mécanicien sélectionné
  selectedAppointmentId: string = ''; // Stocke l'ID du rendez-vous sélectionné

  constructor(
    private rendezVousService: RendezVousService,
    private route: Router,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.getUserId();

    this.getUserRole();

    if (this.userRole === 'CLIENT') {
      this.getAppointments();
    }

    if (this.userId) {
      this.getAppointments();
    }

    if (this.userRole === 'ADMIN') {
      this.getAllAppointments();
    }

    this.loadMechanics(); // Charger les mécaniciens au démarrage
  }

  // Méthode pour récupérer l'ID de l'utilisateur connecté
  getUserId(): void {
    this.userId = this.authService.getUserId(); // Récupère l'ID de l'utilisateur à partir du service AuthService
    console.log('User ID récupéré : ', this.userId); // Affiche l'ID dans la console pour vérification
  }

  // Récupérer le rôle de l'utilisateur connecté
  getUserRole(): void {
    this.userRole = this.authService.getUserRole(); // Implémente cette méthode dans `AuthService`
    console.log('User Role récupéré : ', this.userRole);
  }

  //When we click to the page or next or previous button
  goToPage(page: any) {
    if (page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.slicedAppointments = this.appointments.slice(
        (page - 1) * 2,
        2 * page,
      );
    }
  }

  // Récupérer les rendez-vous du client connecté
  getAppointments(): void {
    this.rendezVousService
      .getAppointmentClient(this.userId!, this.authService)
      .subscribe(
        (response) => {
          this.appointments = response;
          console.log('Rendez-vous récupérés :', this.appointments);

          this.route.navigate(['/liste-rendez-vous']);
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des rendez-vous :',
            error,
          );
        },
      );
  }

  // récuperer tout les rdv du clients pour l'admin
  getAllAppointments() {
    this.rendezVousService.getAllAppointmentClient(this.authService).subscribe(
      (response) => {
        this.appointments = response;
        this.totalPages = Math.ceil(this.appointments.length / 2);
        console.log('Page number is:', this.totalPages);
        this.pages = [];

        //INITIALIZE THE NUMBER OF PAGES
        for (let i = 1; i <= this.totalPages; i++) {
          this.pages.push(i);
        }

        //SLICE IT TO THE DEMANDED NUMBER OF ITEMS FOR EACH PAGE(WE DEFINED IT TO 2 ITEMS EACH PAGE)
        this.slicedAppointments = this.appointments.slice(
          (this.currentPage - 1) * 2,
          2 * this.currentPage,
        );
        // this.slicedAppointments = this.appointments;
        console.log('Pages', this.pages);
        console.log('Slices apt:', this.slicedAppointments);
        console.log('Liste des rendez-vous des clients :', this.appointments);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des rendez-vous :',
          error,
        );
      },
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

    this.rendezVousService
      .updateAppointment(
        this.selectedAppointment._id,
        this.selectedAppointment,
        this.authService,
      )
      .subscribe(
        (response) => {
          console.log('Rendez-vous mis à jour avec succès:', response);
          alert('Rendez-vous mis à jour avec succès !');
          this.getAppointments(); // Recharger la liste après mise à jour
        },
        (error) => {
          console.error(
            'Erreur lors de la mise à jour du rendez-vous :',
            error,
          );
        },
      );
  }

  // annuler rdv
  cancelAppointment(appointment: any): void {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) {
      // Mettre à jour immédiatement l'UI
      appointment.status = 'ANNULER';

      // Envoyer la requête au backend pour enregistrer l'annulation
      this.rendezVousService.cancelAppointment(appointment._id).subscribe(
        (response) => {
          console.log('Rendez-vous annulé avec succès :', response);
          alert('Votre rendez-vous a été annulé !');
        },
        (error) => {
          console.error("Erreur lors de l'annulation du rendez-vous :", error);
          alert("Une erreur s'est produite lors de l'annulation.");
        },
      );
    }
  }

  // fonction load all mechanic in select modal
  loadMechanics() {
    this.usersService.getAllMechanics(this.authService).subscribe(
      (response) => {
        this.mechanics = response;
        console.log('Mécaniciens récupérés :', this.mechanics);

        // Filtrer uniquement les mécaniciens avec le statut "ENABLE"
        this.mechanics = response.filter(
          (mechanic: any) => mechanic.status === 'ENABLE',
        );

        if (this.mechanics.length > 0) {
          this.selectedMechanicId = this.mechanics[0]._id; // ✅ Sélection du premier mécanicien par défaut
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des mécaniciens :', error);
      },
    );
  }

  // Fonction pour ouvrir la modal et définir l'ID du rendez-vous sélectionné
  openMechanicModal(appointmentId: string) {
    console.log('appointmentId', appointmentId);
    this.selectedAppointmentId = appointmentId;
    console.log('selectedAppointmentId', this.selectedAppointmentId);
  }

  // Fonction pour assigner un mécanicien à un rendez-vous
  assignMechanic() {
    if (!this.selectedMechanicId || !this.selectedAppointmentId) {
      alert('Veuillez sélectionner un mécanicien.');
      return;
    }

    // const payload = {
    //     mechanicId: this.selectedMechanicId,
    // };

    this.rendezVousService
      .assignMechanicToAppointment(
        this.selectedAppointmentId,
        this.selectedMechanicId,
        this.authService,
      )
      .subscribe(
        (response) => {
          console.log('Mécanicien assigné avec succès :', response);
          alert('Mécanicien assigné !');
        },
        (error) => {
          console.error("Erreur lors de l'assignation :", error);
          alert("Erreur lors de l'assignation du mécanicien.");
        },
      );
  }
}
