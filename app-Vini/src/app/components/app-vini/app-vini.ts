import { Component, signal, WritableSignal } from '@angular/core';
import { VagasService } from '../../services/vagas-service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { PedidoVaga } from '../../models/pedido-vaga';

@Component({
  selector: 'app-lista-vagas',
  imports: [],
  templateUrl: './app-vini.html',
  styleUrl: './app-vini.scss',
})
export class AppVini {

  contador: WritableSignal<number> = signal(0);

  nomes: string[] = []

  pedidosVagas: WritableSignal<PedidoVaga[]> = signal([])

  constructor(private vagasService: VagasService) { }

  add(): void {
    this.contador.update(valorAntigo => valorAntigo + 1)
  }
  carregarPedidos(): void {
    this.vagasService.getPedidosVagas().subscribe({
      next: data => {
        console.log(data)
        this.pedidosVagas.set(data)
      }, error: error => {
        console.log(error)
      }

    })
  }
}