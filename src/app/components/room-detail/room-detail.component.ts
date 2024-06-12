import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomModel } from 'src/app/models/room.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  rentalData: any = {};
  return = false;
  roomData: RoomModel[] = [];
  finalPriceRoom: number | undefined = undefined;
  photoImage: string | undefined = undefined;
  arrenderId: string | undefined = undefined;
  roomId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private rentalService: RentalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.roomId = +idParam;
    }
    this.getRoomByID(this.roomId);
  }

  getRoomByID(roomId: number | null) {
    this.roomsService.getRoomsList(roomId).subscribe({
      next: (response) => {
        this.roomData = response.data;
        this.roomData.forEach((room: RoomModel) => {
          this.finalPriceRoom = room.price;
          this.photoImage = room.imageUrl;
          this.arrenderId = room.arrenderId;
        });
      }
    });
  }

  convertirHoraASegundos(hora: string): number {
    const [horaStr, minutoStr] = hora.split(':');
    const horaInt = parseInt(horaStr, 10);
    const minutoInt = parseInt(minutoStr, 10);
    const segundosHora = horaInt * 3600;
    const segundosMinuto = minutoInt * 60;
    return segundosHora + segundosMinuto;
  }

  convertirSegundosAHorasDecimal(segundos: number): number {
    return segundos / 3600;
  }

  calcularDiferenciaDias(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end.getTime() - start.getTime();
    return difference / (1000 * 3600 * 24);
  }

  updateRoomStatus(roomId: any, status: any, student: any) {
    this.roomsService.updateRoomStatus(roomId, status, student).subscribe(
      (response) => {
        console.log('Estado de la habitación actualizado con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar el estado de la habitación', error);
      }
    );
  }

  submitReservation(rentalData: any) {
    const horaSeleccionada = this.rentalData.hourInit;
    const [hora, minuto] = horaSeleccionada.split(':');
    const horaSeleccionada2 = this.rentalData.hourFinal;
    const [hora2, minuto2] = horaSeleccionada.split(':');

    const hourInit = this.convertirHoraASegundos(this.rentalData.hourInit);
    const hourFinal = this.convertirHoraASegundos(this.rentalData.hourFinal);
    const resultHour = this.convertirSegundosAHorasDecimal(hourFinal - hourInit);

    const differenceDays = this.calcularDiferenciaDias(this.rentalData.startDate, this.rentalData.endDate);
    const totalHours = (differenceDays * 24) + resultHour;

    if (minuto !== '00' || minuto2 !== '00') {
      this.openSnackBar('Solo podras elegir entre rangos de hora', 'Ok');
    } else if (hourInit > hourFinal) {
      this.openSnackBar('La fecha final debe ser mayor a la inicial', 'Ok');
    } else {
      const studentId = localStorage.getItem('userId');
      const longStudent = studentId ? parseInt(studentId, 10) : 0;
      this.rentalData.student = longStudent;
      this.rentalData.room = this.roomId;
      this.rentalData.totalPrice = (this.finalPriceRoom ?? 0) * totalHours;
      this.rentalData.imageUrl = this.photoImage;
      this.rentalData.arrender = this.arrenderId;
      this.rentalData.arrenderId = this.arrenderId;
      this.rentalData.moviment = "false";
      this.rentalService.registerRental(rentalData).subscribe(
        (response) => {
          console.log('Alquiler registrado con éxito:', response);
          this.openSnackBar('Tu renta se registro correctamente', 'Ok');
          setTimeout(() => {
            window.location.href = 'rental/student';
          }, 2000);
        },
        (error) => {
          console.error('Error al registrar el alquiler:', error);
        }
      );
    }
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }
}
