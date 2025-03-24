import { VehiculeService } from './../../services/vehicule.service';
import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezVousService } from '../../services/rendez-vous.service';

@Component({
  selector: 'app-liste-vehicule',
  imports: [NavbarLeftComponent, CommonModule, FormsModule],
  templateUrl: './liste-vehicule.component.html',
  styleUrl: './liste-vehicule.component.css'
})
export class ListeVehiculeComponent {
  userId: string = '';
  formData = new FormData();
  userData={
    name:'',
    description:'',
    image: ''
  }
  vehiculeData: any = [];

  selectedVehicule: any = { _id: '', name: '', description: '', image: '' }; // Véhicule sélectionné

  // Données pour le rendez-vous
  appointmentData = {
    date: '',
    description: '',
  };


  constructor(
    private vehiculeService: VehiculeService, private router: Router, private route: ActivatedRoute, private rendezvousService: RendezVousService){
    // Récupérer l'ID depuis les paramètres de l'URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = params['id'];
      } else {
        alert('ID utilisateur not found');
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Supprime les caractères spéciaux
      // const fileExtension = file.name.split('.').pop(); // Récupère l'extension du fichier
      // const newFileName = `file_${timestamp}.${fileExtension}`; // Nouveau nom avec datetime


      this.formData.append('name',"file");
      this.formData.append('description',"file");
      this.formData.append('image',file);

      // const renamedFile = new File([file], newFileName, { type: file.type });
      // console.log("zasasa",renamedFile);
      this.userData.image = file;
    }
    // console.log("zasasa",this.userData)
  }

  onSubmit(){
    console.log("===========>",this.formData)
    this.vehiculeService.addVehicule(this.userId,this.formData).subscribe(
      (response:any)=>{
        console.log("ajout réussi", response)

      }
    )
  }

  ngOnInit(){
    this.getVehicules(); // Charger les véhicules au démarrage
  }

  getVehicules(): void{
    console.log('=================Données utilisateur récupérées :');
    this.vehiculeService.getVehicule(this.userId, this.userData).subscribe(
      (data) => {
        this.vehiculeData = data;
        console.log('=================vehicule data :', this.vehiculeData);
        console.log('=================name :', this.vehiculeData[0].name);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

   // Sélectionner un véhicule pour modification
  selectVehicule(vehicule: any): void {
    //console.log("here")
    this.selectedVehicule = { ...vehicule };
  }

  // Mettre à jour le véhicule sélectionné
  updateVehicule(){
    if(!this.selectedVehicule._id){
      alert("aucun vehicule selectionné !")
      return;
    }

    this.vehiculeService.updateVehicule(this.selectedVehicule._id, this.selectedVehicule).subscribe(
      (response) =>{
        console.log(' Véhicule mis à jour avec succès:', response)
        alert('Véhicule mis à jour avec succès');
        this.getVehicules(); // Rafraîchir la liste après mise à jour
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du véhicule :", error);
      }
    )
  }

   // Sélectionner un véhicule pour réparation
   selectVehiculeForRepair(vehicule: any) {
    console.log("ici")
    this.selectedVehicule = vehicule;
    console.log('Véhicule sélectionné pour réparation:', this.selectedVehicule);
  }

  // Prendre un rendez-vous pour réparation
  addAppointment(){
    console.log("here")

    console.log("_id: ",this.selectedVehicule._id)
    if (!this.selectedVehicule._id) {
      alert('Aucun véhicule sélectionné pour la réparation !');
      return;
    }
    console.log("date:", this.appointmentData.date)

    if (!this.appointmentData.date || !this.appointmentData.description) {
      alert('Veuillez remplir tous les champs du rendez-vous.');
      return;
    }

    this.rendezvousService.addAppointment(this.userId, this.selectedVehicule._id, this.appointmentData).subscribe(
      (response) => {
        console.log("Données envoyées :", {
          userId: this.userId,
          vehiculeId: this.selectedVehicule._id,
          appointmentData: this.appointmentData
        });
        console.log('Rendez-vous pris avec succès:', response);
        alert('Rendez-vous pris avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la prise de rendez-vous :', error);
      }
    )
  }


}
