import { UserAuth } from './../../../core/models/auth.models';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _auth: AngularFireAuth) {}

  login({ correo, password }: UserAuth) {
    return this._auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this._auth.signOut();
  }

  registerUser({ correo, password }: UserAuth) {
    return this._auth.createUserWithEmailAndPassword(correo, password);
  }

  recoverPassword(correo: string) {
    return this._auth.sendPasswordResetEmail(correo);
  }

  isAuth() {
    return this._auth.authState.pipe(map((user) => user != null));
  }
}
