import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { VagasService } from '../../services/vagas-service';
import { GestorService } from '../../services/gestor-service';

import { FormsModule } from '@angular/forms';

import { errorContext } from 'rxjs/internal/util/errorContext';

import { PedidoVaga } from '../../models/pedido-vaga';
import { GestorModelo } from '../../models/gestor-modelo';

@Component({
  selector: 'app-lista-vagas',
  imports: [RouterLink, FormsModule, CommonModule],
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

  salvarComponente(id: string | undefined): void {
    if (id) {
      localStorage.setItem('id', id)
    }
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
    return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
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

  deletarVaga(id: string | undefined): void {
    if (id) {
      this.vagasService.deleteVaga(id).subscribe({
        next: () => {
          alert('Vaga deletada com sucesso');
          this.carregarPedidos()
        },
        error: error => {
          console.log('Erro ao deletar vaga:', error);
          alert('Erro ao deletar vaga');
        },
      })
    }
  }

  limparStorage(): void {
    localStorage.clear()
  }

  // MÉTODOS CORRIGIDOS PARA ALTERAR STATUS
  aprovarVaga(id: string | undefined): void {
    if (id) {
      // Usando a lista local para maior eficiência
      const vaga = this.pedidosVagas().find(p => p.id === id);
      if (vaga) {
        const vagaAtualizada: PedidoVaga = {
          ...vaga,
          aprovacao: "Aprovado" // Usando o valor literal correto
        };

        this.vagasService.editaVaga(id, vagaAtualizada).subscribe({
          next: () => {
            alert('Vaga aprovada com sucesso!');
            this.carregarPedidos();
          },
          error: error => {
            console.log('Erro ao aprovar vaga:', error);
            alert('Erro ao aprovar vaga');
          }
        });
      }
    }
  }

  reprovarVaga(id: string | undefined): void {
    if (id) {
      const vaga = this.pedidosVagas().find(p => p.id === id);
      if (vaga) {
        const vagaAtualizada: PedidoVaga = {
          ...vaga,
          aprovacao: "Reprovado" // Usando o valor literal correto
        };

        this.vagasService.editaVaga(id, vagaAtualizada).subscribe({
          next: () => {
            alert('Vaga reprovada com sucesso!');
            this.carregarPedidos();
          },
          error: error => {
            console.log('Erro ao reprovar vaga:', error);
            alert('Erro ao reprovar vaga');
          }
        });
      }
    }
  }

  // MÉTODO ALTERNATIVO MAIS SEGURO
  alterarStatusVaga(id: string | undefined, novoStatus: "Aprovado" | "Pendente" | "Reprovado"): void {
    if (id) {
      const vaga = this.pedidosVagas().find(p => p.id === id);
      if (vaga) {
        const vagaAtualizada: PedidoVaga = {
          ...vaga,
          aprovacao: novoStatus
        };

        this.vagasService.editaVaga(id, vagaAtualizada).subscribe({
          next: () => {
            alert(`Status da vaga alterado para ${novoStatus}`);
            this.carregarPedidos();
          },
          error: error => {
            console.log(`Erro ao alterar status para ${novoStatus}:`, error);
            alert(`Erro ao alterar status da vaga`);
          }
        });
      }
    }
  }

  // MÉTODO PARA REABRIR VAGA (status Pendente)
  reabrirVaga(id: string | undefined): void {
    if (id) {
      const vaga = this.pedidosVagas().find(p => p.id === id);
      if (vaga) {
        const vagaAtualizada: PedidoVaga = {
          ...vaga,
          aprovacao: "Pendente"
        };

        this.vagasService.editaVaga(id, vagaAtualizada).subscribe({
          next: () => {
            alert('Vaga reaberta com sucesso!');
            this.carregarPedidos();
          },
          error: error => {
            console.log('Erro ao reabrir vaga:', error);
            alert('Erro ao reabrir vaga');
          }
        });
      }
    }
  }
}