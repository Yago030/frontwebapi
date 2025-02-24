import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseProducto } from '../interfaces/ResponseProducto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  public  lista(): Observable<ResponseProducto>{
    return this.http.get<ResponseProducto>(`${this.baseUrl}Producto/Lista`);
  }

}
