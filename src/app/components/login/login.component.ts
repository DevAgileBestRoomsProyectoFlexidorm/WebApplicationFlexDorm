import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    authService.logout();
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(['/profile']);
        } else {
          // Mostrar mensaje de error
          this.openSnackBar('El usuario o contraseña es incorrecto', 'OK');
        }
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);
        this.openSnackBar(`Se produjo un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde. (error: ${err})`);
      },
    });
  }

  /**
   * Abre la alerta de snackbar
   * @param message Mensaje a mostrar
   * @param action Acción
   */
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 5_000 });
  }
}
