import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Shop } from '../../interfaces/shop';
import { ShopService } from '../../services/shop.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements  AfterViewInit {
  map!: mapboxgl.Map;

  constructor(private _shopService: ShopService) { }


  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap() {

    const map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [2.15899, 41.38879], 
      zoom: 12, 
      accessToken: environment.mapboxToken 
    });

    this.map = map;

    this.map.on('load', () => {
      this.loadShops();
    });
  }

  private loadShops(): void {
    this._shopService.getListTiendas().subscribe({
      next: (shops) => {
        shops.forEach(shop => {
          this.addMarker(shop);
        });
      },
      error: (error) => {
        console.error('Error al cargar las tiendas:', error);
      }
    });
  }

  private addMarker(shop: Shop): void {
    const popupContent = `
      <div>
        <div class="h5 text-dark"><strong>${shop.nombre}</strong></div>
        <div class="text-body">${shop.direccion}</div>
      </div>
    `;

    const marker = new mapboxgl.Marker()
      .setLngLat([shop.longitud, shop.latitud])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent))
      .addTo(this.map);
}

}
