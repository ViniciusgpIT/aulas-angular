import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoVaga } from '../models/pedido-vaga';

@Injectable({
  providedIn: 'root',
})
export class VagasService {
  private http = inject(HttpClient)
  private readonly urlBAse: string = 'http://localhost:3000/vagas/'

  getPedidosVagas(): Observable<PedidoVaga[]> {
    return this.http.get<PedidoVaga[]>(this.urlBAse)
  }

  getPedidoVagaPorId(id: string): Observable<PedidoVaga> {
    return this.http.get<PedidoVaga>(this.urlBAse + id)
  }

  postCriarVaga(novoItem: PedidoVaga): Observable<PedidoVaga> {
    return this.http.post<PedidoVaga>(this.urlBAse, novoItem, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  deleteVaga(id: string): Observable<PedidoVaga> {
    return this.http.delete<PedidoVaga>(`${this.urlBAse}${id}`);
  }

  // MÉTODO EDITAR VAGA CORRIGIDO
  editaVaga(id: string, vagaAtualizada: PedidoVaga): Observable<PedidoVaga> {
    return this.http.put<PedidoVaga>(`${this.urlBAse}${id}`, vagaAtualizada, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}