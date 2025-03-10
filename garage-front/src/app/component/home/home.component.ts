import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {

  }

  title = 'Your Trusted Partner for Car Care';
  mission = 'We provide expert auto repair and maintenance services to keep your vehicle running smoothly. Our experienced mechanics are dedicated to delivering quality workmanship and exceptional customer service.';
  teamSize = 'Our experienced mechanics are dedicated to delivering quality workmanship and exceptional customer service.';
  popularServices = [
    {
      name: 'Oil Change',
      description: 'Quick and efficient oil change services.',
      image: 'assets/images/oil-change.jpg'
    },
    {
      name: 'Tire Rotation',
      description: 'Extend the life of your tires with our rotation service.',
      image: 'assets/images/tire-rotation.jpg'
    },
    {
      name: 'Brake Repair',
      description: 'Ensure your safety with our brake repair services.',
      image: 'assets/images/brake-repair.jpg'
    },

  ];

}


