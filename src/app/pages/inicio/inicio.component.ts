import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ProductoService } from '../../Services/producto.service';
import { Producto } from '../../interfaces/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  private ProductoService = inject(ProductoService);
  public listaProducto: Producto[] = [];
  public displayedColumns: string[] = ['nombre', 'marca', 'precio'];

  constructor() {
    this.ProductoService.lista().subscribe({
      next: (data) => {
        if (data?.value?.length > 0) {
          this.listaProducto = data.value;
        } else {
          this.listaProducto = [];
        }
      },
      error: (error) => {
        console.error("Error al cargar los productos:", error);
      }
    });
  }
}
