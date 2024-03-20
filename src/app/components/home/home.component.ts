import { Component } from '@angular/core';
import { ListProductComponent } from '../list-product/list-product.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
