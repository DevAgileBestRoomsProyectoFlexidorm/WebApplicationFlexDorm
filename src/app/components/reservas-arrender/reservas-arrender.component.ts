import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { RentalData } from 'src/app/models/rental.models';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservas-arrender',
  templateUrl: './reservas-arrender.component.html',
  styleUrls: ['./reservas-arrender.component.css']
})
export class ReservasArrenderComponent{

  rentCards: RentalData[] = [];

  constructor(private rentalService:RentalService,private _snackBar:MatSnackBar){

  }

  ngOnInit(): void {
this.getListOfRooms();
  }

  formatDate(dateString: string): string {
    // Crear un objeto Date a partir de la cadena de fecha recibida
    const dateObject = new Date(dateString);

    // Obtener las partes de la fecha
    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Añadir cero al principio si es necesario
    const day = ('0' + dateObject.getDate()).slice(-2); // Añadir cero al principio si es necesario

    // Formatear la fecha en el formato deseado
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  getListOfRooms() {
    const arrender = localStorage.getItem('userId') || '';
    this.rentalService.getRentByArrender(arrender).subscribe({
      next: (response) => {
      this.rentCards = response.data;
      // Verificar si rentCards es un array y tiene al menos un elemento
      if (Array.isArray(this.rentCards) && this.rentCards.length > 0) {
        // Iterar sobre todas las tarjetas de alquiler
        this.rentCards.forEach(rentCard => {
          // Obtener la fecha original de la tarjeta de alquiler
          const originalDate = rentCard.date;
          // Formatear la fecha
          const formattedDate = this.formatDate(originalDate);
          // Asignar el valor formateado a la propiedad date de la tarjeta de alquiler
          rentCard.date = formattedDate;
        });
        console.log(this.rentCards); // Esto mostrará el array actualizado
      }
      },
      error: (error) => {

      },
    });
  }

  onToggleEndRent(reservationId: string): void {
    this.rentalService.toggleEndRent(reservationId)
      .pipe(
        tap((response) => {
          this.openSnackBar('Tu renta se finalizo correctamente', 'Ok')
          setTimeout(() => {
            location.reload();
          }, 2000);
          console.log(`Se ha finalizado la renta para reservationId: ${reservationId}`);
        })
      )
      .subscribe();
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
