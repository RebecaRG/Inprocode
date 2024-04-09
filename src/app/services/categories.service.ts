import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private myAppUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getListCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.myAppUrl}api/categorias/`);
  }

  getListTiendas(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.myAppUrl}api/tiendas/`);
  }

  getListBares(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.myAppUrl}api/bares/`);
  }

  getListBibliotecas(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.myAppUrl}api/bibliotecas/`);
  }

  getListAsociaciones(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.myAppUrl}api/asociaciones/`);
  }

}

