import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraphicsComponent } from './components/graphics/graphics.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'mapa', component: MapComponent },
    { path: 'calendario', component: CalendarComponent },
    { path: 'graficos', component: GraphicsComponent },
    { path: 'incluir', component: AddEditProductComponent },
    { path: 'editar/:id', component: AddEditProductComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
