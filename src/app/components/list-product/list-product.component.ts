import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit{

  listProducts: Product[] = [
    {
      id: 1,
      EAN: 8437020827591,
      titulo: "Pelusas",
      fechaPublicacion: 2022,
      descripcion: "A las pelusas les encanta ir acumulándose, pero cualquier corriente de aire puede hacer que desaparezcan en un momento...<br>Acumula pelusas para conseguir puntos, pero no cojas demasiadas o ¡puedes perder todas tus ganancias! <br> Roba cartas para conseguir puntos y decide si parar... o seguir robando otra carta. Pero, ¡cuidado!, te arriesgas a tener que descartar todas las cartas acumuladas...",
      editorial: "Mercurio",
      autoria: ["Reiner Knizia"],
      ilustracion: ["Miguel Angel Galán"],
      participantesMin: 2,
      participantesMax: 6,
      duracionMinutos: 20,
      edadMin: 8,
      categoria: ["juegos de cartas"],
      url: "https://mercurio.com.es/pelusas.html",
    },
    {
      id: 2,
      EAN: 9788460659662,
      titulo: "Virus!",
      fechaPublicacion: 2015,
      descripcion: "Virus! es un juego de corte familiar en el que nuestro objetivo es conseguir aislar un cuerpo sano y erradicar el virus antes de que cualquier otra persona lo consiga. Este juego no entiende de ética y todo es válido para conseguir la victoria.",
      editorial: "Tranjis",
      autoria: ["Carlos López", "Domingo Cabrero", "Santi Santisteban"],
      ilustracion: ["	David GJ", "Domingo Cabrero", "Santi Santisteban"],
      participantesMin: 2,
      participantesMax: 6,
      duracionMinutos: 20,
      edadMin: 8,
      categoria: ["juegos de cartas"],
      url: "https://tranjisgames.com/tienda/juego-de-mesa-virus/",
    }
  ]

  constructor(){}

  ngOnInit(): void {
    
  }

}
