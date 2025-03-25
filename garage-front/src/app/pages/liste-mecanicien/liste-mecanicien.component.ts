import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { MecanicienService } from '../../services/mecanicien.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-liste-mecanicien',
  imports: [NavbarLeftComponent, CommonModule, FormsModule],
  templateUrl: './liste-mecanicien.component.html',
  styleUrl: './liste-mecanicien.component.css'
})
export class ListeMecanicienComponent {

  mecaniciens: any;

  constructor(private mecanicienService: MecanicienService){}

  ngOnInit(){
    this.loadMecaniciens()
  }

  // Charger la liste des mécaniciens
  loadMecaniciens(): void {
    this.mecanicienService.getAllMecaniciens().subscribe((mecaniciens) => {
      this.mecaniciens = mecaniciens;
      console.log("mecaniciens", this.mecaniciens);
    });
  }

  // Désactiver un mécanicien
  desactiverMecanicien(mecanicien: any): void {
    if (confirm(`Voulez-vous vraiment désactiver le compte de ${mecanicien.name} ?`)) {
      this.mecanicienService.desactiverMecanicien(mecanicien._id).subscribe(
        (response) => {
          alert('Compte désactivé avec succès.');
          mecanicien.status = 'Désactivé'; // Mise à jour immédiate de l'UI
        },
        (error) => {
          console.error('Erreur lors de la désactivation du compte :', error);
          alert('Erreur lors de la désactivation.');
        }
      );
    }
  }
}
