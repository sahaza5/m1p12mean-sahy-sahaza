import { Component } from '@angular/core';
import { NavbarLeftComponent } from '../../component/navbar-left/navbar-left.component';
import { ClientService } from '../../services/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-client',
  imports: [NavbarLeftComponent, FormsModule, CommonModule],
  templateUrl: './liste-client.component.html',
  styleUrl: './liste-client.component.css'
})
export class ListeClientComponent {
  clients: any;
  userData: any;

  constructor(private service: ClientService,private usersService: UsersService,private router: Router){
    this.usersService.getUserProfile().subscribe(
      (userData) => {
        console.log('Données utilisateur récupérées:', userData);
        this.userData = userData;
        if(this.userData?.userType === 'ADMIN'){
          this.service.getAllClients().subscribe((clients) => {
            this.clients = clients;
            console.log("clients", this.clients);
          });
        }else{
          this.router.navigate(['/']);
        }
        console.log('userData', this.userData);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Erreur lors de la récupération des données utilisateur');
      }
    );
  }

  ngOnInit(){
  }
}
