import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsService } from 'src/app/services/rooms.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css'],
})
export class RoomDialogComponent {
  form!: FormGroup;
  userData: Account = {} as Account;
  universities: string[] = [
    'UPC',
    'PUCP',
    'UTP',
    'UPN',
    'ULIMA',
    'USIL',
    'UNMSM',
  ];

  constructor(
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private roomsService: RoomsService,
    private profileService:ProfileService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAccountData();
    //inicializa el formulario
    this.form = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        nearUniversities: ['', Validators.required],
        address: ['', Validators.required],
        imageUrl: ['', Validators.required],
        // startDate: ['', Validators.required],
        // endDate: ['', Validators.required],
      }
      // { validator: validateDateRange }
    );
  }

  getAccountData() {
    let userData = this.profileService.getAccountDataFromLocalStorage();
    if (userData) {
      this.userData = userData;
    } else {
      this.userData = {} as Account;
      console.error('Error al obtener los datos del perfil:');
    }

  }
  /**
   * Registra una nueva habitación
   */
  registerRoom() {
    const arrenderStorage=localStorage.getItem('userId')
    const selectUniversities=this.form.value.nearUniversities;
    const convertionUni= selectUniversities.join(', ');
    this.roomsService
      .registerRoom({
        arrenderId:arrenderStorage,
        imageUrl:this.form.value.imageUrl,
        nearUniversities:convertionUni,
        price:this.form.value.price,
        address:this.form.value.address,
        description:this.form.value.description,
        title:this.form.value.title,
      })
      .subscribe({
        next: (response) => {
          this.dialogRef.close();
          this.openSnackBar('Habitación registrada', 'Ok');
        },
        error: (error) => {
          this.openSnackBar('Error al registrar habitación', 'Ok');
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
