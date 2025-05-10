import { Component, OnInit } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { RendezVousService } from '../../services/rendez-vous.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-liste-rendez-vous',
  standalone: true,
  imports: [NavbarLeftComponent, FormsModule, CommonModule],
  templateUrl: './liste-rendez-vous.component.html',
  styleUrl: './liste-rendez-vous.component.css',
})
export class ListeRendezVousComponent implements OnInit {
  userId: string | null = null;
  userRole: string | null = null;
  appointments: any[] = [];

  filteredAppointments: any[] = [];
  placeholderText = '';
  searchItem = '';
  slicedAppointments: any[] = [];
  pages: number[] = [];
  currentPage = 1;
  totalPages: number = 0;
  selectedAppointment: any = { _id: '', date: '', description: '' };
  mechanics: any[] = [];
  loading = false;
  selectedMechanicId: string = '';
  selectedAppointmentId: string = '';

  constructor(
    private rendezVousService: RendezVousService,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUserData();
    this.loadAppointments();
    this.setPlaceholder();
    if (this.userRole === 'ADMIN') this.loadMechanics();
  }

  async getUserData(): Promise<void> {
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getUserRole();
    console.log('User ID :', this.userId);
    console.log('User Role :', this.userRole);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  loadAppointments(): void {
    if (this.userRole === 'CLIENT') {
      this.getAppointments();
    } else if (this.userRole === 'ADMIN') {
      this.getAllAppointments();
      this.loadMechanics(); // Charger les mécaniciens au démarrage *****************
    }
  }

  getAppointments(): void {
    if (!this.userId) return;

    this.rendezVousService
      .getAppointmentClient(this.userId, this.authService)
      .subscribe(
        (response) => {
          this.appointments = response;
          this.updatePagination();
          console.log('Rendez-vous récupérés :', this.appointments);
        },
        (error) =>
          console.error(
            'Erreur lors de la récupération des rendez-vous :',
            error,
          ),
      );
  }

  getAllAppointments(): void {
    this.rendezVousService.getAllAppointmentClient(this.authService).subscribe(
      (response) => {
        this.appointments = response;
        this.updatePagination();
        console.log('Liste des rendez-vous des clients :', this.appointments);
      },
      (error) =>
        console.error(
          'Erreur lors de la récupération des rendez-vous :',
          error,
        ),
    );
  }

  filterAppointments() {
    console.log('Search:', this.searchItem);
    this.filteredAppointments = this.appointments.filter((appointment) => {
      return (
        appointment.belongsTo?.name
          ?.toLowerCase()
          .includes(this.searchItem.toLowerCase()) ||
        appointment.belongsTo?.txt
          ?.toLowerCase()
          .includes(this.searchItem.toLowerCase()) ||
        appointment.car?.name
          ?.toLowerCase()
          .includes(this.searchItem.toLowerCase())
      );
    });
    console.log('filter:', this.filteredAppointments);

    this.totalPages = Math.ceil(this.filteredAppointments.length / 2);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
    this.slicedAppointments = this.filteredAppointments.slice(
      (this.currentPage - 1) * 2,
      2 * this.currentPage,
    );
  }

  // Set the placeholder text based on the user role
  setPlaceholder(): void {
    if (this.userRole === 'CLIENT') {
      this.placeholderText = 'Rechercher vehicule name...';
    } else if (this.userRole === 'ADMIN') {
      this.placeholderText = 'Rechercher nom du client/vehicle...';
    } else {
      this.placeholderText = 'Rechercher...';
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.appointments.length / 2);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.slicedAppointments = this.appointments.slice(
      (this.currentPage - 1) * 2,
      this.currentPage * 2,
    );
  }

  selectAppointmentForEdit(appointment: any): void {
    this.selectedAppointment = { ...appointment };
  }

  updateAppointment(): void {
    if (!this.selectedAppointment._id) {
      alert('Aucun rendez-vous sélectionné !');
      return;
    }
    this.loading = true;

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
          this.loadAppointments();
          this.loading = false;

          let modal = document.getElementById('modifierRendezVous');
          if (modal) {
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance?.hide();
          }
          // SUPPRIMER L'OMBRE TRANSPARENTE ET RÉACTIVER LE SCROLL
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          document.body.classList.remove('modal-open');
          document.body.style.overflow = ''; // Réactive le scroll si besoin
        },
        (error) => {
          this.loading = false;

          console.error(
            'Erreur lors de la mise à jour du rendez-vous :',
            error,
          );
        },
      );
  }

  cancelAppointment(appointment: any): void {
    if (confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) {
      appointment.status = 'ANNULÉ';
      this.loading = true;
      this.rendezVousService.cancelAppointment(appointment._id).subscribe(
        (response) => {
          console.log('Rendez-vous annulé avec succès :', response);
          alert('Votre rendez-vous a été annulé !');
          this.loadAppointments();
          this.loading = false;
        },
        (error) => {
          this.loading = false;

          console.error("Erreur lors de l'annulation du rendez-vous :", error);
          alert("Une erreur s'est produite lors de l'annulation.");
        },
      );
    }
  }

  loadMechanics(): void {
    this.usersService.getAllMechanics(this.authService).subscribe(
      (response) => {
        this.mechanics = response.filter(
          (mechanic: any) => mechanic.status === 'ENABLE',
        );
        if (this.mechanics.length > 0) {
          this.selectedMechanicId = this.mechanics[0]._id;
        }
        console.log('Mécaniciens récupérés :', this.mechanics);
      },
      (error) =>
        console.error('Erreur lors du chargement des mécaniciens :', error),
    );
  }

  openMechanicModal(appointmentId: string): void {
    this.selectedAppointmentId = appointmentId;
    console.log('selectedAppointmentId:', this.selectedAppointmentId);
  }

  assignMechanic(): void {
    if (!this.selectedMechanicId || !this.selectedAppointmentId) {
      alert('Veuillez sélectionner un mécanicien.');
      return;
    }

    this.loading = true;

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
          this.loadAppointments();
          this.loading = false;

          // Fermer le modal après assignation
          let modal = document.getElementById('ajoutMecanicien');
          if (modal) {
            let modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance?.hide();
          }

          // Supprimer l'ombre transparente et réactiver le scroll
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          document.body.classList.remove('modal-open');
          document.body.style.overflow = ''; // Réactive le scroll si besoin
        },
        (error) => {
          this.loading = false;

          console.error("Erreur lors de l'assignation :", error);
          alert("Erreur lors de l'assignation du mécanicien.");
        },
      );
  }
}
