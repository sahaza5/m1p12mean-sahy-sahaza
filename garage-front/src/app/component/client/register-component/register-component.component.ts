
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { RegisterService } from '../../../services/service register/register.service';


@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})

export class RegisterComponentComponent implements OnInit {

  registerForm: FormGroup; // declared property registerForm of type FormGroup

  constructor(
    private fb: FormBuilder,  // Injects the FormBuilde
    private registerService: RegisterService, // Inject RegisterService
    private router: Router // Inject Router
  ) {
    // initialize registerForm
    this.registerForm = this.fb.group(   // Use the FormBuilder to create a new FormGroup
      {
        username: ['', Validators.required],   // Creates a form control, initial value: empty string, the field must have a value
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }  // to the entire form group. This validator will check if the password and confirm password fields match
    );
  }

  ngOnInit(): void {}   // called after Angular has initialized

  onSubmit(): void {    // method called when the form is submitted

    if (this.registerForm.valid) {    // Checks if the form is valid
      const userData = this.registerForm.value;   // get form data
      console.log(userData);

      // call register method of RegisterService to send the registration data to the backend
      this.registerService.register({username:userData.username,password:userData.password}).subscribe(
        (response) => {
          localStorage.setItem('token', `Bearer ${response.token}`); // Assuming backend sends a token

          console.log('Registration successful', response);
          // Redirect to login page after successful registration
          this.router.navigate(['/client-dashboard']);
        },
        (error) => {
          // Handle registration error
          console.error('Registration failed', error);
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }

  // custom validator function
  passwordMatchValidator(formGroup: FormGroup<{  // FormGroup as an argument
    password: FormControl<string>;               // FormGroup is expected to have 'password' and 'confirmPassword' controls of type FormControl<string>.
    confirmPassword: FormControl<string>;
  }>) {
    const password = formGroup.get('password')?.value;  // Gets the value of the password // .?  is used to prevent errors if the control is not found
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) { // Checks if the password and confirm password values are equal
      return null;
    } else {
      return { passwordMismatch: true };  // it returns an object { passwordMismatch: true }. This object is an error object that indicates the validation has failed
    }
  }


}
