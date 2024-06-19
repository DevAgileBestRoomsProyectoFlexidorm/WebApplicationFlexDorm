import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RentalService } from 'src/app/services/rental.service';
import { RentalData } from 'src/app/models/rental.models';

@Component({
  selector: 'app-statistics-arrender',
  templateUrl: './statistics-arrender.component.html',
  styleUrls: ['./statistics-arrender.component.css']
})
export class StatisticsArrenderComponent implements OnInit {

  public reservationsChart: any;
  public incomesChart: any;

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements() {
    const arrenderId = localStorage.getItem('userId') || '';
    this.rentalService.getMovimentByArrender(arrenderId).subscribe(response => {
      const data = response.data;
      this.createCharts(data);
    }, error => {
      console.error(error);
    });
  }

  createCharts(data: RentalData[]) {
    const reservationsByMonth = new Array(12).fill(0);
    const incomeByMonth = new Array(12).fill(0);

    data.forEach((item: RentalData) => {
      const date = new Date(item.date);
      const month = date.getMonth(); // getMonth() returns 0-11 for Jan-Dec
      reservationsByMonth[month] += 1;
      incomeByMonth[month] += item.totalPrice;
    });

    this.createReservationsChart(reservationsByMonth);
    this.createIncomeChart(incomeByMonth);
  }

  createReservationsChart(reservationsByMonth: number[]) {
    this.reservationsChart = new Chart("MyChartReservations", {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: "Reservas",
            data: reservationsByMonth,
            backgroundColor: 'rgba(110, 41, 175, 0.2)',
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cantidad de Reservas'
            },
            beginAtZero: true
          }
        },
        responsive: true,
        aspectRatio: 2.5
      }
    });
  }

  createIncomeChart(incomeByMonth: number[]) {
    this.incomesChart = new Chart("MyChartIncomes", {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          {
            label: "Ingresos",
            data: incomeByMonth,
            backgroundColor: 'rgba(110, 41, 175, 0.2)',
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cantidad de Ingresos'
            },
            beginAtZero: true
          }
        },
        responsive: true,
        aspectRatio: 2.5
      }
    });
  }
}
