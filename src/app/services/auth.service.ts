import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Account } from '../models/account.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { environment } from 'src/environments/environment';
import { ApiResponseStatus } from '../models/api-response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;


  constructor(private http: HttpClient,private _snackBar: MatSnackBar) {}

  /**
   * Realiza la solicitud HTTP para iniciar sesión en la aplicación
   */
  login(email: string, password: string) {
    return this.http
      .post<ApiResponse<Account>>(`${environment.baseURL}/auth/signIn`, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          var mensaje=response.data.message;
          // Verifica si la respuesta es exitosa
          if (response.status === ApiResponseStatus.Success) {
            // Si las credenciales son correctas, guarda la información del usuario en el localStorage
            const user = response.data;
            localStorage.setItem('userData', JSON.stringify(user));
            localStorage.setItem('userId',JSON.stringify(user.userId))
            localStorage.setItem('type',user.dtype)
            localStorage.setItem('token', user.token)
            this.loggedIn = true;
            return true;
          } else {
            console.error('Error en la solicitud HTTP:', response);
            this.loggedIn = false;

            this.openSnackBar(response.data.message.toString(), 'OK');

            return false;
          }
        }),
      );
  }


  register2(account: Account, type: "student" | "arrender") {
    // Verificar si el correo electrónico ya existe
    return this.http
      .post<ApiResponse<Account>>(`${environment.baseURL}/auth/signUp/${type}`, account)
      .pipe(
        map((response) => {
          // Verifica si la respuesta es exitosa
          if (response.status === ApiResponseStatus.Success) {
            // Si las credenciales son correctas, guarda la información del usuario en el localStorage
            const user = response.data;
            localStorage.setItem('userData', JSON.stringify(user));
            this.loggedIn = true;
            return response;
          } else {
            console.log('Error en la solicitud HTTP:', response);
            this.loggedIn = false;
            return response;
          }
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('type');
    localStorage.removeItem('userId ');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLocalStorage() {}

    /**
   * Abre la alerta de snackbar
   * @param message Mensaje a mostrar
   * @param action Acción
   */
    openSnackBar(message: string, action?: string) {
      this._snackBar.open(message, action, { duration: 5_000 });
    }
}
