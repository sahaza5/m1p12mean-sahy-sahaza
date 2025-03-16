import { Component } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-team',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {

  Mecaniciens = [
    {
      image: '../../../assets/images/mecanicien2.jpeg',
      name: 'John Doe',
      description: 'garagiste'
    },
    {
      image: '../../../assets/images/mecanicien1.jpeg',
      name: 'Jane Doe',
      description: 'garagiste'
    },
    {
      image: '../../../assets/images/mecanicien3.jpg',
      name: 'John Doe',
      description: 'garagiste'
    }
  ]


}
