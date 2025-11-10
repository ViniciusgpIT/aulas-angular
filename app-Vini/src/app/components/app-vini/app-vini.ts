import { Component, OnInit, signal, WritableSignal } from '@angular/core';

import { VagasService } from '../../services/vagas-service';
import { GestorService } from '../../services/gestor-service';

import { errorContext } from 'rxjs/internal/util/errorContext';

import { PedidoVaga } from '../../models/pedido-vaga';
import { GestorModelo } from '../../models/gestor-modelo';

@Component({
  selector: 'app-lista-vagas',
  imports: [],
  templateUrl: './app-vini.html',
  styleUrl: './app-vini.scss',
})
export class AppVini implements OnInit {

  contador: WritableSignal<number> = signal(0);

  nomes: string[] = []

  pedidosVagas: WritableSignal<PedidoVaga[]> = signal([])
  gestorModelo: WritableSignal<GestorModelo[]> = signal([])

  constructor(private vagasService: VagasService, private gestorService: GestorService) { }


  ngOnInit(): void {
    this.carregarPedidos()
    this.carregarGestor()
  }

  add(): void {
    this.contador.update(valorAntigo => valorAntigo + 1)
  }
  carregarPedidos(): void {
    this.vagasService.getPedidosVagas().subscribe({
      next: data => {
        this.pedidosVagas.set(data)
      }, error: error => {
        console.log(error)
      }

    })
  }
  carregarGestor(): void {
    this.gestorService.getGestor().subscribe({
      next: data2 => {
        this.gestorModelo.set(data2)
      }, error: error => {
        console.log(error)
      }

    })
  }

  converteData(iso: string): string {
    let d = new Date(iso)
    return d.toLocaleDateString('pt-BR')
  }

  voltaClasseStatus(status: string): string {
    switch (status) {
      case 'Aprovado':
        return 'verde'
      case 'Pendente':
        return 'amarelo'
      case 'Reprovado':
        return 'vermelho'
      default:
        return ''
    }
  }
}