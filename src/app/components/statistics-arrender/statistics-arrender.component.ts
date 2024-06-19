import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics-arrender',
  templateUrl: './statistics-arrender.component.html',
  styleUrls: ['./statistics-arrender.component.css']
})
export class StatisticsArrenderComponent implements OnInit {

  ingresos: number = 0;
  reservas: number = 0;
  public chart: any ;

  constructor() {
  
  }

  ngOnInit(): void {
   this.createChart();
  }

  createChart(){
        this.chart = new Chart("MyChart", {
        type: 'bar', // Tipo de gráfico
  
        data: {
          labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'], // Etiquetas en el eje X
          datasets: [
            {
              label: "Reservas",
              data: [10, 41, 35, 51, 49, 62, 69], // Datos
              backgroundColor: 'blue'
            }
          ]
        },
        options: {
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
          },
          responsive: true,
          aspectRatio: 2.5
        }
      });
    }
  
  }
