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

  constructor(private service: MecanicienService){}

  ngOnInit(){
    this.service.getAllMecaniciens().subscribe((mecaniciens) => {
      this.mecaniciens = mecaniciens;
      console.log("mecaniciens", this.mecaniciens);
    });
  }
}
