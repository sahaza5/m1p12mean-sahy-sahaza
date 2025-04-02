import { VehiculeService } from './../../services/vehicule.service';
import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from '../../services/rendez-vous.service';
import { useAnimation } from '@angular/animations';
import * as bootstrap from 'bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-liste-vehicule',
  imports: [NavbarLeftComponent, CommonModule, FormsModule],
  templateUrl: './liste-vehicule.component.html',
  styleUrl: './liste-vehicule.component.css',
})
export class ListeVehiculeComponent {
  userId = '';
  formData = new FormData();
  // formDataUpdate = new FormData();

  userData = {
    name: '',
    description: '',
    image: '',
  };
  vehiculeData: any = [];

  selectedVehicule: any = { _id: '', name: '', description: '', image: '' }; // Véhicule sélectionné

  // Données pour le rendez-vous
  appointmentData = {
    date: '',
    description: '',
  };

  constructor(
    private vehiculeService: VehiculeService,
    private router: Router,
    private route: ActivatedRoute,
    private rendezvousService: RendezVousService,
    private authService: AuthService,
  ) {
    this.userId = this.authService.getUserId();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Supprime les caractères spéciaux
      // const fileExtension = file.name.split('.').pop(); // Récupère l'extension du fichier
      // const newFileName = `file_${timestamp}.${fileExtension}`; // Nouveau nom avec datetime

      this.formData.append('name', this.userData.name);
      this.formData.append('description', this.userData.description);
      this.formData.append('image', file);

      // const renamedFile = new File([file], newFileName, { type: file.type });
      // console.log("zasasa",renamedFile);
      this.userData.image = file;
    }
    // console.log("zasasa",this.userData)
  }

  onFileChangeUpdate(event: any) {
    const file = event.target.files[0];

    if (file) {
      // const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Supprime les caractères spéciaux
      // const fileExtension = file.name.split('.').pop(); // Récupère l'extension du fichier
      // const newFileName = `file_${timestamp}.${fileExtension}`; // Nouveau nom avec datetime

      this.formData.append('image', file);

      // const renamedFile = new File([file], newFileName, { type: file.type });
      // console.log("zasasa",renamedFile);
      // this.userData.image = file;
    }

    // console.log("zasasa",this.userData)
  }

  onSubmit() {
    console.log('===========>', this.formData);
    this.vehiculeService.addVehicule(this.userId, this.formData).subscribe(
      (response: any) => {
        console.log('ajout réussi', response);
        this.vehiculeData.push({ ...response });
        this.formData = new FormData();

        // Fermer le modal après ajout
        const modalElement = document.getElementById('ajouterVehicule');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) {
            modalInstance.hide();
          }
        }

        // Supprimer l'ombre du modal et réactiver le scroll
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.style.overflow = ''; // Réactive le scroll si besoin

      },
      (error) => {
        this.formData = new FormData();
        console.error('Erreur lors de la mise à jour du véhicule :', error);
      },
    );
  }

  ngOnInit() {
    this.getVehicules(); // Charger les véhicules au démarrage
  }

  getVehicules(): void {
    console.log('=================Données utilisateur récupérées :');
    this.vehiculeService.getVehicule(this.userId, this.userData).subscribe(
      (data) => {
        this.vehiculeData = data;
        console.log('=================vehicule data :', this.vehiculeData);
        console.log('=================name :', this.vehiculeData[0]?.name);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      },
    );
  }

  // Sélectionner un véhicule pour modification
  selectVehicule(vehicule: any): void {
    console.log('here', vehicule);
    this.selectedVehicule = { ...vehicule };
  }

  // Mettre à jour le véhicule sélectionné
  updateVehicule() {
    console.log('select new vehicle:', this.selectedVehicule);

    if (this.selectedVehicule.name && this.selectedVehicule.description) {
      this.formData.append('name', this.selectedVehicule.name);
      this.formData.append('description', this.selectedVehicule.description);
    }
    console.log('Form entries');
    for (let pair of this.formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    // this.formDataUpdate.append('name', this.selectedVehicule?.name);
    console.log('Selected car befor:', this.selectedVehicule, this.formData);
    if (!this.selectedVehicule._id) {
      alert('aucun vehicule selectionné !');
      return;
    }

    console.log('Updated vehicule', this.selectedVehicule);

    this.vehiculeService
      .updateVehicule(this.selectedVehicule._id, this.formData)
      .subscribe(
        (response) => {
          console.log(' Véhicule mis à jour avec succès:', response);
          alert('Véhicule mis à jour avec succès');
          this.formData = new FormData();
          this.getVehicules(); // Rafraîchir la liste après mise à jour

          // FERMER LE MODAL APRÈS LA MISE À JOUR
          const modalElement = document.getElementById('modifierVehicule');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
              modalInstance.hide();
            }
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
          this.formData = new FormData();

          console.error('Erreur lors de la mise à jour du véhicule :', error);
        },
      );
  }

  // Sélectionner un véhicule pour réparation
  selectVehiculeForRepair(vehicule: any) {
    console.log('ici');
    this.selectedVehicule = vehicule;
    console.log('Véhicule sélectionné pour réparation:', this.selectedVehicule);
  }

  // Prendre un rendez-vous pour réparation
  addAppointment() {
    console.log('here');

    console.log('_id: ', this.selectedVehicule._id);
    if (!this.selectedVehicule._id) {
      alert('Aucun véhicule sélectionné pour la réparation !');
      return;
    }
    console.log('date:', this.appointmentData.date);

    if (!this.appointmentData.date || !this.appointmentData.description) {
      alert('Veuillez remplir tous les champs du rendez-vous.');
      return;
    }

    this.rendezvousService
      .addAppointment(
        this.userId,
        this.selectedVehicule._id,
        this.appointmentData,
        this.authService,
      )
      .subscribe(
        (response) => {
          console.log('Données envoyées :', {
            userId: this.userId,
            vehiculeId: this.selectedVehicule._id,
            appointmentData: this.appointmentData,
          });
          console.log('Rendez-vous pris avec succès:', response);
          alert('Rendez-vous pris avec succès !');
          this.router.navigate(['/liste-rendez-vous', { id: this.userId }]);

          // const Modal = document.getElementById('loginModal');
          // if (Modal) {
          //   const modal = bootstrap.Modal.getInstance(Modal);
          //   if (modal) {
          //     modal.hide();

          //     Modal.classList.remove('show');
          //     document.body.style.cssText = '';
          //     document.body.classList.replace('modal-open', 'modal-close');

          //     const backdrop = document.querySelector('.modal-backdrop');
          //     if (backdrop) {
          //       backdrop.remove();
          //     }
          //   }
          // }
        },
        (error) => {
          console.error('Erreur lors de la prise de rendez-vous :', error);
        },
      );
  }
}
