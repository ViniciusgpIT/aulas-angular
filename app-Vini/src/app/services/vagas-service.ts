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

}
