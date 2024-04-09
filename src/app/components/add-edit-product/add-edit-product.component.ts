import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl  } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {
  loading: boolean = false;
  id: number;
  operacion: string = "AÑADIR "
  bgColor: string = "bg-secondary";

  get title() {
    return this.addForm.get('titulo') as FormControl;
  }

  get year() {
    return this.addForm.get('fechaPublicacion') as FormControl;
  }

  get editorial() {
    return this.addForm.get('editorial') as FormControl;
  }

  get author() {
    return this.addForm.get('autoria') as FormControl;
  }

  get illustration() {
    return this.addForm.get('ilustracion') as FormControl;
  }

  get minPlayers() {
    return this.addForm.get('participantesMin') as FormControl;
  }

  get maxPlayers() {
    return this.addForm.get('participantesMax') as FormControl;
  }

  get time() {
    return this.addForm.get('duracionMinutos') as FormControl;
  }

  get age() {
    return this.addForm.get('edadMin') as FormControl;
  }

  addForm: FormGroup;

  validateMinMax(control: AbstractControl): ValidationErrors | null {
    const min = control.get('participantesMin');
    const max = control.get('participantesMax');
  
    if (min && max && min.value && max.value) {
      return min.value < max.value ? null : { minMaxInvalid: true };
    }
  
    return null;
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private _productService: ProductService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.addForm = this.fb.group({
      titulo: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]),
      fechaPublicacion: new FormControl('', [Validators.required, Validators.pattern(/^[1-2][0-9]{3}$/)]),
      editorial: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]{3,}$/)]),
      autoria: new FormControl('', [Validators.required, Validators.pattern(/^[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+(\s*,\s*[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+)*$/)]),
      ilustracion: new FormControl('', [Validators.required, Validators.pattern(/^[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+(\s*,\s*[\wáéíóúÁÉÍÓÚñÑ]+( [\wáéíóúÁÉÍÓÚñÑ]+)+)*$/)]),
      participantesMin: new FormControl('', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]),
      participantesMax: new FormControl('', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]),
      duracionMinutos: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[1-9][0-9]|1\d{2}|2\d{2}|300)$/)]),
      edadMin: new FormControl('', [Validators.required, Validators.pattern(/^(100|[1-9]?[0-9])$/)]),
    }, { validators: this.validateMinMax });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {

    if (this.id != 0) {
      this.operacion = "EDITAR ";
      this.bgColor = "bg-danger";
      this.getProduct(this.id);
    }
  }

  addProduct() {
    const product: Product = {
      titulo: this.addForm.value.titulo,
      fecha_publicacion: this.addForm.value.fechaPublicacion,
      editorial: this.addForm.value.editorial,
      autoria: this.addForm.value.autoria,
      ilustracion: this.addForm.value.ilustracion,
      participantes_min: this.addForm.value.participantesMin,
      participantes_max: this.addForm.value.participantesMax,
      duracion_minutos: this.addForm.value.duracionMinutos,
      edad_min: this.addForm.value.edadMin,
    }
    this.loading = true;
    if (this.id != 0) {
      product.id_juego = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.success(`El producto ${product.titulo} se ha actualizado con éxito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })

    } else {
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success(`El producto ${product.titulo} se añadido con éxito`, 'Producto añadido');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.addForm.patchValue({
        titulo: data.titulo,
        fechaPublicacion: data.fecha_publicacion,
        editorial: data.editorial,
        autoria: data.autoria,
        ilustracion: data.ilustracion,
        participantesMin: data.participantes_min,
        participantesMax: data.participantes_max,
        duracionMinutos: data.duracion_minutos,
        edadMin: data.edad_min
      })
    })
  }

}
