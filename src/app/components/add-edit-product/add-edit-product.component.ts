import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
  get title(){
    return this.addForm.get('titulo') as FormControl;
  }

  get year(){
    return this.addForm.get('fechaPublicacion') as FormControl;
  }

get editorial(){
    return this.addForm.get('editorial') as FormControl;
}

get author(){
  return this.addForm.get('autoria') as FormControl;
}

get illustration(){
  return this.addForm.get('ilustracion') as FormControl;
}

get minPlayers(){
  return this.addForm.get('participantesMin') as FormControl;
}

get maxPlayers(){
  return this.addForm.get('participantesMax') as FormControl;
}

get time(){
  return this.addForm.get('duracionMinutos') as FormControl;
}

get age(){
  return this.addForm.get('edadMin') as FormControl;
}

addForm: FormGroup;

constructor(private fb : FormBuilder, private router: Router) { 
  this.addForm = this.fb.group({
    titulo : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]),
    fechaPublicacion : new FormControl('', [Validators.required, Validators.pattern(/^[1-2][0-9]{3}$/)]),
    editorial: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{3,}$/)]),
    autoria : new FormControl('', [Validators.required, Validators.pattern(/^[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+(\s*,\s*[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+)*$/)]),
    ilustracion : new FormControl('', [Validators.required, Validators.pattern(/^[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+(\s*,\s*[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+)*$/)]),
    participantesMin : new FormControl('', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]),
    participantesMax : new FormControl('', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]),
    duracionMinutos : new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|1\d{2}|2\d{2}|300)$/)]),
    edadMin : new FormControl('', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]),
    
  })
}

  ngOnInit(): void {}

  addProduct(){
    const product : Product = {
      // EAN: number,
      titulo: this.addForm.value.titulo,
      fecha_publicacion: this.addForm.value.fechaPublicacion,
      // descripcion: string,
      editorial: this.addForm.value.editorial,
      autoria: this.addForm.value.autoria,
      ilustracion: this.addForm.value.ilustracion,
      participantes_min: this.addForm.value.participantesMin,
      participantes_max: this.addForm.value.participantesMax,
      duracion_minutos: this.addForm.value.duracionMinutos,
      edad_min:  this.addForm.value.edadMin,
    }
    console.table(product);
    this.router.navigate(['/home']);
}
}
