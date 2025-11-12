import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Departamento } from '../../models/departamento-model';
import { DepartamentoService } from '../../services/departamento-service';

@Component({
  selector: 'app-lista-departamento',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-departamento.html',
  styleUrl: './lista-departamento.scss'
})
export class ListaDepartamento implements OnInit {
  departamentos: WritableSignal<Departamento[]> = signal([]);
  carregando = signal(true);

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDepartamentos();
  }

  carregarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos.set(data);
        this.carregando.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos:', error);
        this.carregando.set(false);
        alert('Erro ao carregar departamentos');
      }
    });
  }

  // Corrigido: Aceita string | undefined
  editarDepartamento(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/departamentos/editar', id]);
    }
  }

  // Corrigido: Aceita string | undefined
  deletarDepartamento(id: string | undefined): void {
    if (id && confirm('Tem certeza que deseja excluir este departamento?')) {
      this.departamentoService.deletarDepartamento(id).subscribe({
        next: () => {
          alert('Departamento excluído com sucesso!');
          this.carregarDepartamentos();
        },
        error: (error) => {
          console.error('Erro ao excluir departamento:', error);
          alert('Erro ao excluir departamento.');
        }
      });
    }
  }

  novoDepartamento(): void {
    this.router.navigate(['/departamentos/novo']);
  }

  // CORREÇÃO: Agora aceita string | undefined
  verFuncionarios(departamentoId: string | undefined): void {
    if (departamentoId) {
      this.router.navigate(['/funcionarios'], { 
        queryParams: { departamento: departamentoId } 
      });
    }
  }
}