import { Component } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomModel } from 'src/app/models/room.model';
import { MatDialog } from '@angular/material/dialog';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent {
  roomsCards: RoomModel[] = [];

  constructor(
    private roomsService: RoomsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    //se inicializa una suscripción para el observable roomCreated$ (para detectar la creación de habitaciones)
    this.roomsService.roomCreated$.subscribe(() => {

      this.getListOfRooms(); //actualiza la lista de habitaciones cuando se crea una nueva habitación
    });
  }

  /**
   * Este método se ejecuta al iniciar el componente
   */
  ngOnInit(): void {
    this.getListOfRooms();
  }

  /**
   * Abre el dialogo para crear una pelicula
   */
  openDialog(): void {
    this.dialog.open(RoomDialogComponent);
  }

  /**
   * Abre la alerta de snackbar
   * @param message Mensaje a mostrar
   * @param action Acción
   */
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, { duration: 5_000 });
  }

  /**
   * Obtiene la lista de habitaciones
   */
  getListOfRooms() {
    const arrender = localStorage.getItem('userId') || '';
    this.roomsService.getRoomsByArrender(arrender).subscribe({
      next: (response) => {
        this.roomsCards = response.data;
        // Crear una nueva propiedad para almacenar la versión transformada de nearUniversities
        this.roomsCards.forEach((room: RoomModel) => {
          room.nearUniversitiesArray = room.nearUniversities.split(',').map(university => university.trim());
        });
      },
      error: (error) => {
        this.openSnackBar(`Error al cargar datos -> ${error.message}`);
      },
    });
  }

}
