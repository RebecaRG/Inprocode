import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-calendar',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss']
})
export class ModalCalendarComponent implements OnInit {
  @Input() event: any; 
  @Input() modalRef!: NgbModalRef;

  eventForm: FormGroup;

  loading = false;

  get title(){
    return this.eventForm.get('titulo') as FormControl;
  }

  get place (){
    return this.eventForm.get('lugar') as FormControl;
  }

  get description(){
    return this.eventForm.get('descripcion') as FormControl;
  }

  constructor(private fb: FormBuilder, private eventService: EventService, private toastr: ToastrService,) {
    this.eventForm = this.fb.group({
      titulo : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.'-/áéíóúÁÉÍÓÚñÑ]{3,}$/)]),
      lugar: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.'-/áéíóúÁÉÍÓÚñÑ]{3,}$/)]),
      descripcion: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.'-/áéíóúÁÉÍÓÚñÑ]{3,}$/)])
    });
  }

  ngOnInit() {

    if (this.event && this.event.id) {
      this.loadEventDetails(this.event.id);
    }
  }

  loadEventDetails(eventId: number) {
    this.eventService.getEvent(eventId).subscribe(event => {
      this.eventForm.patchValue({
        titulo: event.titulo,
        lugar: event.lugar,
        descripcion: event.descripcion
      });
    });
  }

  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent = { ...this.event, ...this.eventForm.value };
      this.eventService.updateEvent(this.event.id, updatedEvent).subscribe({
        next: () => {
          this.toastr.success('El evento ha sido actualizado con éxito', 'Evento Actualizado');
          this.modalRef.close();
        },
        error: (error) => {
          this.toastr.error('Hubo un problema actualizando el evento', 'Error');
          console.error('Error al actualizar el evento:', error);
        }
      });
    }
}
}
