import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CategoriesService } from '../../services/categories.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map!: mapboxgl.Map;
  selectedCategory: string = 'SELECCIONA CATEGORÍA';
  categorias: string[] = [];

  constructor(private _categoriaService: CategoriesService, private toastr: ToastrService) { }

  showError() {
    this.toastr.error('Mensaje de error', 'Título', {
      timeOut: 3000,
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.fetchCategorias();
  }

  private fetchCategorias(): void {
    this._categoriaService.getListCategorias().subscribe({
      next: (categories) => {
        this.categorias = categories;
      },
      error: (error) => {
        this.toastr.error('Error al cargar las categorías:', error);
      }
    });
  }

  private initializeMap(): void {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.1741251043945327, 41.41247674904886],
      zoom: 12,
      accessToken: environment.mapboxToken
    });

    this.map = map;

    this.map.on('load', () => {
      this.loadAllCategories();
    });
  }

  private loadCategoryData(category: string): void {
    this.clearMarkers();

    let observable$;
    switch (category) {
      case 'tiendas':
        observable$ = this._categoriaService.getListTiendas();
        break;
      case 'bares':
        observable$ = this._categoriaService.getListBares();
        break;
      case 'bibliotecas':
        observable$ = this._categoriaService.getListBibliotecas();
        break;
      case 'asociaciones':
        observable$ = this._categoriaService.getListAsociaciones();
        break;
      default:
        this.loadAllCategories();
        return;
    }

    if (observable$) {
      observable$.subscribe({
        next: (locations) => {
          locations.forEach(location => {
            this.addMarker(location, category);
          });
        },
        error: (error) => this.toastr.error(`Error al cargar ${category}:`, error)
      });
    }
  }

  private loadAllCategories(): void {
    const categoriesWithServices = [
      { category: 'tiendas', service: this._categoriaService.getListTiendas() },
      { category: 'bares', service: this._categoriaService.getListBares() },
      { category: 'bibliotecas', service: this._categoriaService.getListBibliotecas() },
      { category: 'asociaciones', service: this._categoriaService.getListAsociaciones() }
    ];

    categoriesWithServices.forEach(entry => {
      entry.service.subscribe({
        next: (locations) => {
          locations.forEach(location => {
            this.addMarker(location, entry.category);
          });
        },
        error: (error) => this.toastr.error(`Error al cargar ${entry.category}:`, error)
      });
    });
  }

  private categoryIcons: { [key: string]: string } = {
    tiendas: "assets/shopping.png",
    bares: "assets/mug.svg",
    bibliotecas: "assets/book.svg",
    asociaciones: "assets/users.svg"
  };

  private addMarker(location: any, category: string): void {
    const popupContent = `
    <div>
      <div class="h5 text-dark"><strong>${location.nombre}</strong></div>
      <div class="text-body">${location.direccion}</div>
    </div>
    `;


    const categoryStyles: { [key: string]: { color: string, icon: string } } = {
      tiendas: { color: "#FF8A65", icon: "<i class='fas fa-shopping-cart'></i>" },
      bares: { color: "#64B5F6", icon: "<i class='fas fa-beer'></i>" },
      bibliotecas: { color: "#81C784", icon: "<i class='fas fa-book'></i>" },
      asociaciones: { color: "#BA68C8", icon: "<i class='fas fa-users'></i>" }
    };

    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = categoryStyles[category] ? categoryStyles[category].icon : "<i class='fas fa-map-marker-alt'></i>";
    el.style.backgroundColor = categoryStyles[category] ? categoryStyles[category].color : '#FFC107';
    el.style.color = "white";
    el.style.fontSize = "20px";
    el.style.textAlign = "center";
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.lineHeight = '40px';
    el.style.borderRadius = '50%';

    const marker = new mapboxgl.Marker(el)
      .setLngLat([location.longitud, location.latitud])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent))
      .addTo(this.map);
    this.markers.push(marker);
  }

  markers: mapboxgl.Marker[] = [];

  clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  filterMarkers(): void {
    if (this.selectedCategory !== 'SELECCIONA CATEGORÍA') {
      this.loadCategoryData(this.selectedCategory);
    }
  }
}
