import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartamentoModelo } from '../models/departamento-modelo';


@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {

  private http = inject(HttpClient)
  private readonly urlBAse: string = 'http://localhost:3000/departamento/'

  getDepartamento(): Observable<DepartamentoModelo[]> {

    return this.http.get<DepartamentoModelo[]>(this.urlBAse)
  }

  getDepartamentoPorId(id: string): Observable<DepartamentoModelo> {

    return this.http.get<DepartamentoModelo>(this.urlBAse + id)
  }

  postDepartamento(novoItem: DepartamentoModelo): Observable<DepartamentoModelo> {
    return this.http.post<DepartamentoModelo>(this.urlBAse, novoItem, {
      headers: {
        'Content-Type': 'json-application'
      }
    })
  }
}