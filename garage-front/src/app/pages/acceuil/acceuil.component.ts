import { Component } from '@angular/core';
import { HeaderComponent } from "../../component/header/header.component";
import { ServicePopulaireComponent } from "../../component/service-populaire/service-populaire.component";
import { TeamComponent } from "../../component/team/team.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { AboutComponent } from "../../component/about/about.component";

@Component({
  selector: 'app-acceuil',
  imports: [HeaderComponent, ServicePopulaireComponent, TeamComponent, FooterComponent, AboutComponent],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {

}
