import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomModel } from 'src/app/models/room.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var paypal: any;

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent  {
  rentalData: any = {};
  return=false;
  volver(): void {
    this.return = true;
  }
  pasarela=true;
  roomData: RoomModel [] = [];
  finalPriceRoom: number | undefined = undefined;
  photoImage:string|undefined=undefined;
  arrenderId:string|undefined=undefined;
  roomId: number | null = null;
  constructor(private route: ActivatedRoute, private roomsService: RoomsService, private rentalService:RentalService, private _snackBar:MatSnackBar ) {}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.roomId = +idParam;
    }
    console.log(this.roomId);
    this.getRoomByID(this.roomId);
    this.pasarela=false
  }
  getRoomByID(roomId: number|null) {
    this.roomsService.getRoomsList(roomId).subscribe({
      next: (response) => {
        this.roomData = response.data;
        console.log(this.roomData);
        this.roomData.forEach((room: RoomModel) => {
          this.finalPriceRoom = room.price;
          this.photoImage = room.imageUrl;
          this.arrenderId=room.arrenderId;
        });
        console.log(this.finalPriceRoom);
      }
    });
  }

  convertirHoraASegundos(hora: string): number {
    const [horaStr, minutoStr] = hora.split(':');
    const horaInt = parseInt(horaStr, 10);
    const minutoInt = parseInt(minutoStr, 10);
    const segundosHora = horaInt * 3600;
    const segundosMinuto = minutoInt * 60;
    const totalSegundos = segundosHora + segundosMinuto;
    return totalSegundos;
  }

  convertirSegundosAHorasDecimal(segundos: number): number {
    const horasDecimal = segundos / 3600;
    return horasDecimal;
  }

  updateRoomStatus(roomId: any, status: any,student:any) {
    this.roomsService.updateRoomStatus(roomId, status,student).subscribe(
      (response) => {
        console.log('Estado de la habitación actualizado con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar el estado de la habitación', error);
      }
    );
  }

  submitPrecio(rentalData: any) {
    debugger;
    const horaSeleccionada = this.rentalData.hourInit;
    const [hora, minuto] = horaSeleccionada.split(':');
    const horaSeleccionada2 = this.rentalData.hourFinal;
    const [hora2, minuto2] = horaSeleccionada.split(':');
    const date1=this.rentalData.date
    const date2=this.rentalData.date2
    const hourinit= this.convertirHoraASegundos(this.rentalData.hourInit)
    const hourFinal = this.convertirHoraASegundos(this.rentalData.hourFinal)
      // Convertir las fechas a objetos Date
      const date1WithTime = new Date(date1);
      const date2WithTime = new Date(date2);

      // Añadir las horas iniciales y finales a las fechas
      date1WithTime.setSeconds(hourinit);
      date2WithTime.setSeconds(hourFinal);

      // Calcular la diferencia en milisegundos
      const timeDifference = date2WithTime.getTime() - date1WithTime.getTime();

      // Convertir la diferencia a horas
      const totalHours = timeDifference / (1000 * 60 * 60);

      console.log(`Total time: ${totalHours} hours`);
    const resulthour = this.convertirSegundosAHorasDecimal(hourFinal-hourinit)
    if(minuto !== '00' || minuto2 !== '00')
    {
      this.pasarela=false;
      this.openSnackBar('Solo podras elegir entre rangos de hora','Ok')
    }else{
      const studentId = localStorage.getItem('userId');
      const longStudent = studentId ? parseInt(studentId, 10) : 0;
      this.rentalData.student=longStudent,
      this.rentalData.room=this.roomId,
      this.rentalData.totalPrice = (this.finalPriceRoom ?? 0) * totalHours;
      this.rentalData.imageUrl=this.photoImage;
      this.rentalData.arrender=this.arrenderId
      this.rentalData.arrenderId=this.arrenderId
      this.rentalData.moviment="false"
      this.pasarela=true;
      this.loadPaypalScript().then(() => {
        this.initPayPalButton(rentalData);
      });

    }
  }

  submitReservation(rentalData: any) {
    const horaSeleccionada = this.rentalData.hourInit;
    const [hora, minuto] = horaSeleccionada.split(':');
    const horaSeleccionada2 = this.rentalData.hourFinal;
    const [hora2, minuto2] = horaSeleccionada.split(':');

    const hourinit= this.convertirHoraASegundos(this.rentalData.hourInit)
    const hourFinal = this.convertirHoraASegundos(this.rentalData.hourFinal)
    const resulthour = this.convertirSegundosAHorasDecimal(hourFinal-hourinit)
    if(minuto !== '00' || minuto2 !== '00')
    {
      this.openSnackBar('Solo podras elegir entre rangos de hora','Ok')
    }else{
      const studentId = localStorage.getItem('userId');
      const longStudent = studentId ? parseInt(studentId, 10) : 0;
      this.rentalData.student=longStudent,
      this.rentalData.room=this.roomId,
      this.rentalData.totalPrice = (this.finalPriceRoom ?? 0) * resulthour;
      this.rentalData.imageUrl=this.photoImage;
      this.rentalData.arrender=this.arrenderId
      this.rentalData.arrenderId=this.arrenderId
      this.rentalData.moviment="false"
      this.rentalService.registerRental(rentalData).subscribe(
        (response) => {
          console.log('Alquiler registrado con éxito:', response);
          this.openSnackBar('Tu renta se registro correctamente', 'Ok')
          setTimeout(() => {
            // window.location.href = 'rental/student';
          }, 2000);
        },
        (error) => {
          console.error('Error al registrar el alquiler:', error);
        }
      );
    }
  }

  private loadPaypalScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypal.com/sdk/js?client-id=AURR1Bo6su6uaQLVRVwLRkxownm1PWnC1CaaLK9V3S2yz0-RiqLOqKS2LYDLzDezGqLvEutMQJMp2iHB';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

    continuar(rentalData: any){
      console.log(this.rentalData.fecha)
      this.getRoomByID(this.roomId);
      this.submitPrecio(rentalData);
    }


  initPayPalButton(rentalData:any) {
    paypal.Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: rentalData.totalPrice // Aquí pones el valor de la transacción
            }
          }]
        });
      },
      onApprove: (data:any, actions:any) => {
        return actions.order.capture().then((details:any) => {
          // alert('Transaction completed by ' + details.payer.name.given_name);

          this.rentalService.registerRental(rentalData).subscribe(
            (response) => {
              console.log('Alquiler registrado con éxito:', response);
              this.openSnackBar('Tu renta se registro correctamente', 'Ok')
              setTimeout(() => {
                window.location.href = 'rental/student';
              }, 2000);
            },
            (error) => {
              console.error('Error al registrar el alquiler:', error);
            }
          );
        });


      },
      onError: (err:any) => {
        console.error(err);
        // Aquí puedes manejar errores
      }
    }).render('#paypal-button-container');
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
