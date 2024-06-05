import { Component, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponseStatus } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  usuarioExit = false;
  usuarioEmail = false;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      password: ['', Validators.required],
      profilePicture: ['', Validators.required],
      username: ['', Validators.required],
    });

    authService.logout();

  }
  student = true;
  arrendar = false;
  ngOnInit(): void {
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', '#670abe');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'color', 'black');
  }

  studentfalse() {
    this.student = true;
    this.arrendar = false;
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', '#670abe');
    this.renderer.setStyle(miBoton, 'color', 'white');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'background-color', 'white'); // Cambié 'withe' a 'white'
    this.renderer.setStyle(miBoton2, 'color', 'black');
  }

  arrendarfalse() {
    this.arrendar = true;
    this.student = false;
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', 'white');
    this.renderer.setStyle(miBoton, 'color', 'black');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'background-color', '#670abe');
    this.renderer.setStyle(miBoton2, 'color', 'white');
  }

  selectedDate: Date | undefined; // Variable para almacenar la fecha seleccionada

  onDateSelected(event: any) {
    this.selectedDate = event.value; // Captura la fecha seleccionada
    console.log('Fecha seleccionada:', this.selectedDate);
    // Aquí puedes realizar acciones adicionales con la fecha seleccionada
  }

  onSubmit() {
    console.log('Formulario válido:', this.registrationForm.valid);
    console.log('Valores del formulario:', this.registrationForm.value);
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      switch (this.student) {
        case true:
          userData.dtype = 'student';
          break;
        case false:
          userData.dtype = 'arrender';
          break;
      }
      this.authService.register2(userData, userData.dtype).subscribe({
        next: (response) => {
          if (response.status === ApiResponseStatus.Success) {
            this.openSnackBar('Usuario registrado Correctamente', 'Ok');
            setTimeout(() => {
              window.location.href = 'login';
            }, 3000);
          }

          if (response.status === ApiResponseStatus.Error) {
            this.openSnackBar(`${response.data.message}`, 'Ok');
          }
        },
      });
    } else {
      this.openSnackBar('Debes llenar todos los campos del formulario', 'Ok');
      console.log('invalido');
    }
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
