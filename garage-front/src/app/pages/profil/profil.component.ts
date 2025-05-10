import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-profil',
  imports: [NavbarLeftComponent, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent {
  userId: string = '';
  // userData: any;
  userData = {
    name: '',
    surname: '',
    userType: '',
    txt: '',
    email: '',
    pswd: '',
    phone: '',
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // Initialiser les données utilisateur
    this.usersService.getUserProfile().subscribe(
      (userData) => {
        console.log('Données utilisateur récupérées:', userData);
        this.userData = userData;
        console.log('userData', this.userData);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors de la récupération des données utilisateur');
      },
    );
  }

  updateUserProfile() {
    console.log('userData', this.userData);
    this.usersService.updateUserProfile(this.userId, this.userData).subscribe(
      (response) => {
        console.log('Profil mis à jour avec succès:', response);
        alert('Profil mis à jour avec succès');
        this.router.navigate(['/voir-profile']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Erreur lors de la mise à jour du profil');
      },
    );
  }
}
