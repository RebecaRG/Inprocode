import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { CategoriesService } from '../../services/categories.service';
import { ProductService } from '../../services/product.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit, AfterViewInit {

  constructor(private _categoriaService: CategoriesService, private _productService: ProductService) { }

  ngOnInit(): void {
    this.renderCategoryChart();
  }

  ngAfterViewInit(): void {
    this.renderPieChartForAge();
    this.renderPieChartForPlaytime();
  }

  renderCategoryChart() {
    forkJoin({
      tiendas: this._categoriaService.getListTiendas(),
      bares: this._categoriaService.getListBares(),
      bibliotecas: this._categoriaService.getListBibliotecas(),
      asociaciones: this._categoriaService.getListAsociaciones()
    }).pipe(
      map(({ tiendas, bares, bibliotecas, asociaciones }) => ({
        labels: ['Tiendas', 'Bares', 'Bibliotecas', 'Asociaciones'],
        datasets: [{
          label: 'Número de lugares por categoría',
          data: [tiendas.length, bares.length, bibliotecas.length, asociaciones.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      }))
    ).subscribe(data => {
      const config: ChartConfiguration<ChartType, number[], string> = {
        type: 'bar',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
      
      new Chart(document.getElementById('categoryChart') as HTMLCanvasElement, config);
    });
  }

  renderPieChartForAge() {
    this._productService.getListProducts().subscribe(products => {
    
      const ageRanges = { '0-3': 0, '4-6': 0, '7-12': 0, '13-16': 0, '17-18': 0, '18+': 0 };
      products.forEach(product => {
        const age = product.edad_min;
        if (age <= 3) ageRanges['0-3']++;
        else if (age >= 4 && age <= 6) ageRanges['4-6']++;
        else if (age >= 7 && age <= 12) ageRanges['7-12']++;
        else if (age >= 13 && age <= 16) ageRanges['13-16']++;
        else if (age >= 17 && age <= 18) ageRanges['17-18']++;
        else ageRanges['18+']++;
      });
      
      const totalProducts = products.length;
      const percentages = Object.values(ageRanges).map(count => (count / totalProducts) * 100);
  

      const data = {
        labels: Object.keys(ageRanges),
        datasets: [{
          label: 'Distribución de edad mínima',
          data: percentages,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      };
  
      const config: ChartConfiguration<ChartType, number[], string> = {
        type: 'pie',
        data, 
        options: {
      
          plugins: {
            legend: {
              position: 'top', 
            },
        
          }
        }
      };
      
      new Chart(document.getElementById('pieChartAge') as HTMLCanvasElement, config);
      
    });
  }

  renderPieChartForPlaytime() {
    this._productService.getListProducts().subscribe(products => {
      const playtimeRanges = {
        '15': 0, 
        '30': 0, 
        '45': 0, 
        '60': 0, 
        '90': 0, 
        '240': 0, 
        '+240': 0
      };
  
      products.forEach(product => {
        const time = product.duracion_minutos;
        if (time <= 15) playtimeRanges['15']++;
        else if (time > 15 && time <= 30) playtimeRanges['30']++;
        else if (time > 30 && time <= 45) playtimeRanges['45']++;
        else if (time > 45 && time <= 60) playtimeRanges['60']++;
        else if (time > 60 && time <= 90) playtimeRanges['90']++;
        else if (time > 90 && time <= 240) playtimeRanges['240']++;
        else playtimeRanges['+240']++;
      });
  
      const totalProducts = products.length;
      const percentages = Object.values(playtimeRanges).map(count => (count / totalProducts) * 100);
  
      const data = {
        labels: Object.keys(playtimeRanges),
        datasets: [{
          label: 'Distribución del Tiempo Mínimo de Juego',
          data: percentages,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1
        }]
      };
  
      const config: ChartConfiguration<ChartType, number[], string> = {
        type: 'pie',
        data,
        options: {
          plugins: {
            legend: {
              position: 'top',
            },
          }
        }
      };
  
      new Chart(document.getElementById('pieChartPlaytime') as HTMLCanvasElement, config);
    });
  }
  
}


