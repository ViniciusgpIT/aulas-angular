import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario-model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/funcionarios';

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  getFuncionario(id: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  criarFuncionario(funcionario: Omit<Funcionario, 'id'>): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  atualizarFuncionario(id: string, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario);
  }

  deletarFuncionario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFuncionariosPorDepartamento(departamentoId: string): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}?departamentoId=${departamentoId}`);
  }
}