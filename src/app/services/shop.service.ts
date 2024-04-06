import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Shop } from '../interfaces/shop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private myAppUrl: string;
  private myApiUrl : string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/tiendas/';
  }

  getListTiendas(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getTienda(id: number): Observable<Shop> {
    return this.http.get<Shop>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

}
