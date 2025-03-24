import { Component } from '@angular/core';
import { NavbarLeftComponent } from "../../component/navbar-left/navbar-left.component";
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-profil',
  imports: [NavbarLeftComponent],
  templateUrl: './view-profil.component.html',
  styleUrl: './view-profil.component.css'
})
export class ViewProfilComponent {


  userId: string = '';
  userData: any;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {
    // // Récupérer l'ID depuis les paramètres de l'URL
    // this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.userId = params['id'];
    //   } else {
    //     alert('ID utilisateur not found');
    //   }
    // });
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
      }
    );

  }

  redirect(userId: string) {
    this.router.navigate(['/profil', { id: userId }]);
  }
}
