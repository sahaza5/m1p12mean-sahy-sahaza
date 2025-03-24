import { VehiculeService } from './../../services/vehicule.service';
import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  appointmentData = {
    date: '',
    description: ''
  }

  constructor(private vehiculeService: VehiculeService, private router: Router, private route: ActivatedRoute){
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

  // Sélectionner un véhicule pour modification et remplir le formulaire
  selectVehicule(vehicule: any): void {
    this.selectedVehicule = { ...vehicule }; // Copie pour éviter la modification directe
  }

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

}
