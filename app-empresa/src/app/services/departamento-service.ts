import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento-model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/departamentos';

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  getDepartamento(id: string): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }

  criarDepartamento(departamento: Omit<Departamento, 'id'>): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  atualizarDepartamento(id: string, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${id}`, departamento);
  }

  deletarDepartamento(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}