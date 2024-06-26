import { Component } from '@angular/core';
import { RentalData } from '../models/rental.models';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-rentas',
  templateUrl: './admin-rentas.component.html',
  styleUrls: ['./admin-rentas.component.css']
})
export class AdminRentasComponent {
  rental: RentalData[] = [];

  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
    this.accountService.getRentas().subscribe(
      (response) => {
        if (response && response.data) {
          this.rental = response.data;

        }
      },
      (error) => {
        console.error('Error fetching rentas', error);
      }
    );

  }

}
