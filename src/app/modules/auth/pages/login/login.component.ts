import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadLoginForm();
  }

  loadLoginForm() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.loginForm.invalid) {
      return;
    }
  }

  get inputCorreo() {
    return this.loginForm.get('correo');
  }

  get inputPassword() {
    return this.loginForm.get('correo');
  }

  get errorsCorreo() {
    let mensaje = '';
    if (
      this.inputCorreo?.hasError('email') &&
      !this.inputCorreo?.hasError('required')
    ) {
      mensaje = 'Formato de email no valido';
    }
    if (this.inputCorreo?.hasError('required')) {
      mensaje = 'El email es requerido';
    }
    return mensaje;
  }

  get errorsPassword() {
    let mensaje = '';
    if (
      this.inputPassword?.hasError('email') &&
      !this.inputPassword?.hasError('required')
    ) {
      mensaje = 'Formato de email no valido';
    }
    if (this.inputPassword?.hasError('required')) {
      mensaje = 'El password es requerido';
    }
    return mensaje;
  }
}
