import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestorModelo } from '../models/gestor-modelo';


@Injectable({
  providedIn: 'root',
})
export class GestorService {

  private http = inject(HttpClient)
  private readonly urlBAse: string = 'http://localhost:3000/gestor/'

  getGestor(): Observable<GestorModelo[]> {

    return this.http.get<GestorModelo[]>(this.urlBAse)
  }

  getGestorPorId(id: string): Observable<GestorModelo> {

    return this.http.get<GestorModelo>(this.urlBAse + id)
  }

}