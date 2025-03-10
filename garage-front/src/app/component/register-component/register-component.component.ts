import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})

export class RegisterComponentComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService, // Inject RegisterService
    private router: Router // Inject Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      this.registerService.register(userData).subscribe(
        (response) => {
          // Handle successful registration
          console.log('Registration successful', response);
          // Redirect to login page after successful registration
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle registration error
          console.error('Registration failed', error);
          // You might want to display an error message to the user
        }
      );
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
