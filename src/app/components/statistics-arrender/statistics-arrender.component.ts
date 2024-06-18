import { Component, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-statistics-arrender',
  templateUrl: './statistics-arrender.component.html',
  styleUrls: ['./statistics-arrender.component.css']
})
export class StatisticsArrenderComponent implements OnInit, AfterViewInit{

  ingresos: number = 0;
  reservas: number = 0;

  constructor() { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart():void{
    const options = {
      series: [{
      name: 'Reservas',
      data: [10,20,30,40,50,60,70,80,90,100]
    }],
      chart: {
      height: 350,
      type: 'bar',
    },
    title: {
      text: 'Reservas por Dia de la  Semana'
    },
    xaxis: {
      categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
  }
  };
  
      const chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }
}
