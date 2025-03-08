
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})

export class RegisterComponentComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    console.log('RegisterComponentComponent ngOnInit');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form data:', this.registerForm.value);
      // Here you would typically send the data to your backend API


    } else {
      console.log('Form is invalid.');
    }
  }

  passwordMatchValidator(formGroup: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }
}
