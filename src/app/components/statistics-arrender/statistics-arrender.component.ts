import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartOptions, ChartType, ChartData } from 'chart.js';


@Component({
  selector: 'app-statistics-arrender',
  templateUrl: './statistics-arrender.component.html',
  styleUrls: ['./statistics-arrender.component.css']
})
export class StatisticsArrenderComponent implements OnInit {

  ingresos: number = 0;
  reservas: number = 0;

  public barChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Día de la Semana'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Reservas'
        },
        beginAtZero: true
      }
    }
  };

  public barChartLabels: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  public barChartType = 'bar'; 
  public barChartLegend = true;
  public barChartData = [
    { data: [10, 41, 35, 51, 49, 62, 69], label: 'Reservas' }
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
   
  }

}
