import { errorCode } from './../../../../core/utils/auth';
import { UserLS } from './../../../../core/models/auth.models';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

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
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .then((data) => {
        this.loading = false;
        if (!data.user?.emailVerified) {
          Swal.fire(
            'Verificar correo',
            'Se le ha enviado un correo de verificación por favor revisar',
            'info'
          );
        } else {
          // TODO: redireccionar
          Swal.fire('Correcto', 'se logeo con exito', 'success');
          this.setLocalStorage(data.user);
        }
      })
      .catch((error) => {
        this.loading = false;
        Swal.fire('Error', errorCode(error.code), 'error');
      });
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

  setLocalStorage({ uid, email }: any) {
    const usuario: UserLS = { uid, email };
    localStorage.setItem('user', JSON.stringify(usuario));
  }
}
