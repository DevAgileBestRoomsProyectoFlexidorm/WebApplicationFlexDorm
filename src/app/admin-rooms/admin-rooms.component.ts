import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { RoomData } from 'src/typings';
import { RoomModel } from '../models/room.model';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.css']
})
export class AdminRoomsComponent {
  rooms: RoomModel[] = [];

  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
    this.accountService.getRooms().subscribe(
      (response) => {
        if (response && response.data) {
          this.rooms = response.data;

        }
      },
      (error) => {
        console.error('Error fetching accounts', error);
      }
    );

  }

  toggleAccountStatus(rooms: RoomModel): void {
    const newStatus = rooms.active;
    this.accountService.switchActivateRooms(rooms.roomId, newStatus).subscribe(
      (response) => {
        if (response && response.data) {
        }
      },
      (error) => {
        console.error('Error updating account status', error);
      }
    );
  }
}
