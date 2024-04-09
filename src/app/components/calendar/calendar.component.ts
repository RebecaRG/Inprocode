import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCalendarComponent } from '../modal-calendar/modal-calendar.component';
import { Subscription } from 'rxjs';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarOptions: any;
  private eventsSubscription!: Subscription;

  constructor(private eventService: EventService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.eventsSubscription = this.eventService.events$.subscribe(events => {
      this.updateCalendarEvents(events);
    });

    this.eventService.loadInitialEvents();
    this.initializeCalendarOptions();
  }

  initializeCalendarOptions() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: esLocale,
      events: [],
      displayEventTime: false,
      eventClick: (info: any) => {
        this.openModal(info.event);
      },
      eventMouseEnter: (mouseEnterInfo: any) => {
        tippy(mouseEnterInfo.el, {
          content: `
          <br>
          <strong>🧭</strong> ${mouseEnterInfo.event.extendedProps.lugar}<br>
          <hr>
          <strong>ℹ</strong> ${mouseEnterInfo.event.extendedProps.descripcion}
          <br> <br>`,
          allowHTML: true,
          placement: 'top',
        });
      }
    };
  }

  updateCalendarEvents(events: Event[]) {
    this.calendarOptions.events = events.map(event => ({
      id: event.id,
      title: event.titulo,
      start: event.inicio,
      end: event.fin,
      extendedProps: {
        descripcion: event.descripcion,
        lugar: event.lugar,
      }
    }));
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  openModal(info: any) {
    const modalRef = this.modalService.open(ModalCalendarComponent);

    const eventForModal = {
      id: info.id,
      ...info.extendedProps
    };

    modalRef.componentInstance.event = eventForModal;
    modalRef.componentInstance.modalRef = modalRef;
  }
}
