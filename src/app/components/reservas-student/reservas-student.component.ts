import { Component } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { RentalData } from 'src/app/models/rental.models';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-reservas-student',
  templateUrl: './reservas-student.component.html',
  styleUrls: ['./reservas-student.component.css']
})
export class ReservasStudentComponent {
  rentCards: RentalData[] = [];

  constructor(private rentalService:RentalService){

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
    const student = localStorage.getItem('userId') || '';
    this.rentalService.getRentByStudent(student).subscribe({
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

  onToggleFavorite(reservationId: string): void {
    this.rentalService.toggleFavorite(reservationId)
      .pipe(
        tap((response) => {
          console.log(`Se ha cambiado el estado de favorito para reservationId: ${reservationId}`);
        })
      )
      .subscribe();
  }
}
