import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../interfaces/event';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private myAppUrl: string;
  private myApiUrl: string;

  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/eventos/';
    this.loadAndEmitEvents();
  }

  loadInitialEvents() {
    this.getEvents().subscribe(events => this.eventsSubject.next(events));
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.myAppUrl}${this.myApiUrl}`, event);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.myAppUrl}${this.myApiUrl}${id}`, event).pipe(tap(() => {
      this.loadInitialEvents();
    }));
  }

  private loadAndEmitEvents() {
    this.getEvents().subscribe(events => {
      this.eventsSubject.next(events);
    });
  }
}
